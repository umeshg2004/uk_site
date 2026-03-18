from datetime import datetime

from sqlalchemy import Column, DateTime, Enum, Integer, String, Text

from app.database.base import Base
import enum


class EnrollmentStatus(str, enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"


class ProgramEnrollment(Base):
    """Public program enrollment request submitted from marketing site."""

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(50), nullable=False)
    age = Column(Integer, nullable=False)
    skill_level = Column(String(100), nullable=False)
    program_name = Column(String(255), nullable=False, index=True)
    duration = Column(String(100), nullable=True)
    price = Column(String(100), nullable=True)
    batch = Column(String(50), nullable=False)
    message = Column(Text, nullable=True)
    status = Column(Enum(EnrollmentStatus), default=EnrollmentStatus.PENDING, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
