from datetime import datetime

from pydantic import BaseModel

from app.models.program_request import ProgramRequestStatus


class ProgramRequestCreate(BaseModel):
    program_name: str


class ProgramRequestRead(BaseModel):
    id: int
    player_id: int
    player_name: str
    program_name: str
    status: ProgramRequestStatus
    created_at: datetime

    class Config:
        from_attributes = True


class ProgramRequestStatusUpdate(BaseModel):
    status: ProgramRequestStatus
