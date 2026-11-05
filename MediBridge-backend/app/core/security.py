"""Password hashing and signed access-token helpers."""

from datetime import UTC, datetime, timedelta
from uuid import UUID

import jwt
from argon2 import PasswordHasher
from argon2.exceptions import InvalidHashError, VerificationError, VerifyMismatchError

from app.core.config import get_settings

_password_hasher = PasswordHasher()
_ALGORITHM = "HS256"


def hash_password(password: str) -> str:
    return _password_hasher.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    try:
        return _password_hasher.verify(password_hash, password)
    except (InvalidHashError, VerificationError, VerifyMismatchError):
        return False


def create_access_token(user_id: UUID, role: str) -> str:
    now = datetime.now(UTC)
    expires = now + timedelta(minutes=get_settings().access_token_expire_minutes)
    return jwt.encode(
        {"sub": str(user_id), "role": role, "type": "access", "iat": now, "exp": expires},
        get_settings().secret_key.get_secret_value(),
        algorithm=_ALGORITHM,
    )


def decode_access_token(token: str) -> UUID:
    payload = jwt.decode(
        token,
        get_settings().secret_key.get_secret_value(),
        algorithms=[_ALGORITHM],
        options={"require": ["sub", "exp", "iat", "type"]},
    )
    if payload.get("type") != "access":
        raise jwt.InvalidTokenError("Wrong token type")
    return UUID(payload["sub"])
