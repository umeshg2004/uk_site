from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field

from app.models.program_enrollment import EnrollmentStatus


class ProgramEnrollmentBase(BaseModel):
    name: str
    email: EmailStr
    phone: str = Field(min_length=8, max_length=20)
    age: int = Field(gt=0)
    skill_level: str
    program_name: str
    duration: Optional[str] = None
    price: Optional[str] = None
    batch: str
    message: Optional[str] = None


class ProgramEnrollmentCreate(ProgramEnrollmentBase):
    """Payload from public registration form."""

    pass


class ProgramEnrollmentRead(ProgramEnrollmentBase):
    id: int
    status: EnrollmentStatus
    created_at: datetime

    class Config:
        from_attributes = True


class ProgramEnrollmentStatusUpdate(BaseModel):
    status: EnrollmentStatus
