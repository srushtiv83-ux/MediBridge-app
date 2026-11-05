"""Public request and response shapes for account authentication."""

from datetime import date, datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field, StringConstraints
from typing import Annotated

Password = Annotated[str, StringConstraints(min_length=12, max_length=128)]


class RegisterRequest(BaseModel):
    full_name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    phone_number: str = Field(min_length=1, max_length=32)
    password: Password
    role: str = Field(pattern="^(PATIENT|CARETAKER)$")
    date_of_birth: date | None = None
    gender: str | None = Field(default=None, max_length=40)
    relationship: str | None = Field(default=None, max_length=80)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


class UserSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    full_name: str
    email: EmailStr
    phone_number: str
    role: str
    is_verified: bool


class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
    user: UserSummary


class MessageResponse(BaseModel):
    message: str


class MeResponse(UserSummary):
    created_at: datetime
