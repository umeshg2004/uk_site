from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel


class ProgramBase(BaseModel):
    name: str
    skill_level: str
    duration_weeks: int
    description: str
    weekly_schedule: str
    fee: float
    max_capacity: int


class ProgramCreate(ProgramBase):
    pass


class ProgramUpdate(BaseModel):
    name: Optional[str] = None
    skill_level: Optional[str] = None
    duration_weeks: Optional[int] = None
    description: Optional[str] = None
    weekly_schedule: Optional[str] = None
    fee: Optional[float] = None
    max_capacity: Optional[int] = None
    is_active: Optional[bool] = None


class ProgramRead(ProgramBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True


class CoachBase(BaseModel):
    name: str
    experience_years: int
    specialization: str


class CoachCreate(CoachBase):
    user_id: int


class CoachRead(CoachBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class PlayerBase(BaseModel):
    name: str
    age: int
    skill_level: str


class PlayerCreate(PlayerBase):
    user_id: int


class PlayerRead(PlayerBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class BatchBase(BaseModel):
    name: str
    program_id: int
    coach_id: int
    schedule: str
    max_players: int


class BatchCreate(BatchBase):
    pass


class BatchRead(BatchBase):
    id: int

    class Config:
        from_attributes = True


class EnrollmentBase(BaseModel):
    player_id: int
    batch_id: int
    program_id: int


class EnrollmentCreate(EnrollmentBase):
    pass


class EnrollmentRead(EnrollmentBase):
    id: int
    enrolled_at: datetime
    is_active: bool

    class Config:
        from_attributes = True


class AttendanceBase(BaseModel):
    player_id: int
    batch_id: int
    date: date
    status: str


class AttendanceCreate(AttendanceBase):
    pass


class AttendanceRead(AttendanceBase):
    id: int

    class Config:
        from_attributes = True


class PerformanceBase(BaseModel):
    player_id: int
    recorded_at: date
    match_results: Optional[str] = None
    fitness_score: Optional[float] = None
    skill_rating: Optional[float] = None


class PerformanceCreate(PerformanceBase):
    pass


class PerformanceRead(PerformanceBase):
    id: int

    class Config:
        from_attributes = True


class PaymentBase(BaseModel):
    player_id: int
    amount: float
    payment_date: date
    status: str
    notes: Optional[str] = None


class PaymentCreate(PaymentBase):
    pass


class PaymentRead(PaymentBase):
    id: int

    class Config:
        from_attributes = True

