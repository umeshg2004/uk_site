from datetime import datetime, date

from sqlalchemy import (
    Column,
    Date,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
    Boolean,
)
from sqlalchemy.orm import relationship

from app.database.base import Base
from app.models.user import User


class SkillLevelEnum(str, Enum):
    BEGINNER = "Beginner"
    INTERMEDIATE = "Intermediate"
    ADVANCED = "Advanced"
    HIGH_PERFORMANCE = "High Performance"
    ADULT = "Adult"
    KIDS = "Kids"


class Program(Base):
    """Training program offered by the academy."""

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, unique=True)
    skill_level = Column(String(100), nullable=False)
    duration_weeks = Column(Integer, nullable=False)
    description = Column(Text, nullable=False)
    weekly_schedule = Column(String(255), nullable=False)
    fee = Column(Float, nullable=False)
    max_capacity = Column(Integer, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)

    batches = relationship("Batch", back_populates="program")


class Coach(Base):
    """Coach representing a trainer at the academy."""

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False, unique=True)
    name = Column(String(255), nullable=False)
    experience_years = Column(Integer, nullable=False)
    specialization = Column(String(255), nullable=False)

    user = relationship("User")
    batches = relationship("Batch", back_populates="coach")


class Player(Base):
    """Player profile containing training-related information."""

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False, unique=True)
    name = Column(String(255), nullable=False)
    age = Column(Integer, nullable=False)
    skill_level = Column(String(100), nullable=False)

    user = relationship("User")
    enrollments = relationship("Enrollment", back_populates="player")
    attendance_records = relationship("Attendance", back_populates="player")
    performances = relationship("Performance", back_populates="player")
    payments = relationship("Payment", back_populates="player")


class Batch(Base):
    """Batch groups players for a specific program and schedule."""

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    program_id = Column(Integer, ForeignKey("program.id"), nullable=False)
    coach_id = Column(Integer, ForeignKey("coach.id"), nullable=False)
    schedule = Column(String(255), nullable=False)
    max_players = Column(Integer, nullable=False)

    program = relationship("Program", back_populates="batches")
    coach = relationship("Coach", back_populates="batches")
    enrollments = relationship("Enrollment", back_populates="batch")
    attendance_records = relationship("Attendance", back_populates="batch")


class Enrollment(Base):
    """Enrollment mapping between players and batches/programs."""

    id = Column(Integer, primary_key=True, index=True)
    player_id = Column(Integer, ForeignKey("player.id"), nullable=False)
    batch_id = Column(Integer, ForeignKey("batch.id"), nullable=False)
    program_id = Column(Integer, ForeignKey("program.id"), nullable=False)
    enrolled_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)

    player = relationship("Player", back_populates="enrollments")
    batch = relationship("Batch", back_populates="enrollments")
    program = relationship("Program")


class AttendanceStatusEnum(str, Enum):
    PRESENT = "present"
    ABSENT = "absent"
    LATE = "late"


class Attendance(Base):
    """Daily attendance per player and batch."""

    id = Column(Integer, primary_key=True, index=True)
    player_id = Column(Integer, ForeignKey("player.id"), nullable=False)
    batch_id = Column(Integer, ForeignKey("batch.id"), nullable=False)
    date = Column(Date, nullable=False)
    status = Column(String(50), nullable=False)

    player = relationship("Player", back_populates="attendance_records")
    batch = relationship("Batch", back_populates="attendance_records")


class Performance(Base):
    """Performance metrics for a player."""

    id = Column(Integer, primary_key=True, index=True)
    player_id = Column(Integer, ForeignKey("player.id"), nullable=False)
    recorded_at = Column(Date, nullable=False)
    match_results = Column(String(255), nullable=True)
    fitness_score = Column(Float, nullable=True)
    skill_rating = Column(Float, nullable=True)

    player = relationship("Player", back_populates="performances")


class PaymentStatusEnum(str, Enum):
    PAID = "paid"
    PENDING = "pending"
    OVERDUE = "overdue"


class Payment(Base):
    """Payment records for players' fees."""

    id = Column(Integer, primary_key=True, index=True)
    player_id = Column(Integer, ForeignKey("player.id"), nullable=False)
    amount = Column(Float, nullable=False)
    payment_date = Column(Date, nullable=False)
    status = Column(String(50), nullable=False)
    notes = Column(String(255), nullable=True)

    player = relationship("Player", back_populates="payments")

