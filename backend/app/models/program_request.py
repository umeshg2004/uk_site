from datetime import datetime

from sqlalchemy import Column, DateTime, Enum, ForeignKey, Integer, String

from app.database.base import Base
import enum


class ProgramRequestStatus(str, enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"


class ProgramRequest(Base):
    """Join Program request raised by a player for an existing program card."""

    id = Column(Integer, primary_key=True, index=True)
    player_id = Column(Integer, ForeignKey("user.id"), nullable=False, index=True)
    player_name = Column(String(255), nullable=False)
    program_name = Column(String(255), nullable=False)
    status = Column(Enum(ProgramRequestStatus), default=ProgramRequestStatus.PENDING, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
