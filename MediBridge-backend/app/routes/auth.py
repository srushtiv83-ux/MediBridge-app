"""Registration, login, refresh rotation, logout, and account identity."""

from typing import NoReturn

from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.core.dependencies import get_current_user, get_db
from app.core.security import create_access_token
from app.models.user import User
from app.schemas.auth import AuthResponse, LoginRequest, MeResponse, MessageResponse, RegisterRequest, UserSummary
from app.services.auth import AuthError, login, logout, register, rotate_refresh_token

router = APIRouter(prefix="/auth", tags=["authentication"])
_REFRESH_COOKIE = "medibridge_refresh"


def _set_refresh_cookie(response: Response, token: str) -> None:
    settings = get_settings()
    response.set_cookie(
        key=_REFRESH_COOKIE,
        value=token,
        max_age=settings.refresh_token_expire_days * 24 * 60 * 60,
        httponly=True,
        secure=settings.environment.lower() not in {"development", "dev", "test"},
        samesite="lax",
        path=f"{settings.api_prefix.rstrip('/')}/auth",
    )


def _auth_response(user: User) -> AuthResponse:
    settings = get_settings()
    return AuthResponse(
        access_token=create_access_token(user.id, user.role.value),
        expires_in=settings.access_token_expire_minutes * 60,
        user=UserSummary.model_validate(user),
    )


def _raise_auth_error(exc: AuthError) -> NoReturn:
    raise HTTPException(status_code=exc.status_code, detail=exc.message) from exc


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def register_account(data: RegisterRequest, response: Response, db: Session = Depends(get_db)) -> AuthResponse:
    try:
        user, refresh_token = register(db, data)
    except AuthError as exc:
        _raise_auth_error(exc)
    _set_refresh_cookie(response, refresh_token)
    return _auth_response(user)


@router.post("/login", response_model=AuthResponse)
def login_account(data: LoginRequest, response: Response, db: Session = Depends(get_db)) -> AuthResponse:
    try:
        user, refresh_token = login(db, str(data.email), data.password)
    except AuthError as exc:
        _raise_auth_error(exc)
    _set_refresh_cookie(response, refresh_token)
    return _auth_response(user)


@router.post("/refresh", response_model=AuthResponse)
def refresh_session(request: Request, response: Response, db: Session = Depends(get_db)) -> AuthResponse:
    token = request.cookies.get(_REFRESH_COOKIE)
    if not token:
        raise HTTPException(status_code=401, detail="Refresh session is invalid or expired")
    try:
        user, new_token = rotate_refresh_token(db, token)
    except AuthError as exc:
        _raise_auth_error(exc)
    _set_refresh_cookie(response, new_token)
    return _auth_response(user)


@router.post("/logout", response_model=MessageResponse)
def logout_session(request: Request, response: Response, db: Session = Depends(get_db)) -> MessageResponse:
    logout(db, request.cookies.get(_REFRESH_COOKIE))
    settings = get_settings()
    response.delete_cookie(
        key=_REFRESH_COOKIE,
        httponly=True,
        secure=settings.environment.lower() not in {"development", "dev", "test"},
        samesite="lax",
        path=f"{settings.api_prefix.rstrip('/')}/auth",
    )
    return MessageResponse(message="Logged out")


@router.get("/me", response_model=MeResponse)
def current_account(user: User = Depends(get_current_user)) -> MeResponse:
    return MeResponse.model_validate(user)
