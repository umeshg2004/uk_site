"""Schemas for contact messages."""

from datetime import datetime
from pydantic import BaseModel, EmailStr


class ContactMessageCreate(BaseModel):
    """Schema for creating a contact message."""

    first_name: str
    last_name: str
    email: EmailStr
    phone: str | None = None
    message: str


class ContactMessageRead(BaseModel):
    """Schema for reading contact message."""

    id: int
    first_name: str
    last_name: str
    email: str
    phone: str | None
    message: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True
