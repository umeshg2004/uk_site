from datetime import datetime
from pydantic import BaseModel, EmailStr, Field

from app.models.user import UserRole


class Token(BaseModel):
    """JWT access token response."""

    access_token: str
    token_type: str = "bearer"


class TokenPayload(BaseModel):
    """Payload stored in JWT token."""

    sub: str
    exp: int


class UserBase(BaseModel):
    """Shared attributes for user objects."""

    email: EmailStr
    full_name: str


class UserCreate(UserBase):
    """Payload for registering a new player (role is fixed to player)."""

    password: str = Field(min_length=8)


class CoachAccountCreate(UserBase):
    """Payload for admins to create coach accounts."""

    password: str = Field(min_length=8)


class UserRead(UserBase):
    """User data exposed to API clients."""

    id: int
    role: UserRole
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    """Login credentials."""

    email: EmailStr
    password: str

