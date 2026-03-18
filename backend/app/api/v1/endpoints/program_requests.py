from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_role
from app.database.session import get_db
from app.core.email import send_email
from app.models.program_request import ProgramRequest, ProgramRequestStatus
from app.models.user import User, UserRole
from app.schemas.program_request import (
    ProgramRequestCreate,
    ProgramRequestRead,
    ProgramRequestStatusUpdate,
)

router = APIRouter(prefix="/program-requests", tags=["program-requests"])


@router.post("/", response_model=ProgramRequestRead, status_code=status.HTTP_201_CREATED)
def create_program_request(
    request_in: ProgramRequestCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> ProgramRequestRead:
    """Player submits a join program request (always pending)."""

    program_request = ProgramRequest(
        player_id=current_user.id,
        player_name=current_user.full_name,
        program_name=request_in.program_name,
        status=ProgramRequestStatus.PENDING,
    )
    db.add(program_request)
    db.commit()
    db.refresh(program_request)

    # Notify player
    send_email(
        to_email=current_user.email,
        subject="Program request received",
        body=(
            f"Hi {current_user.full_name},\n\n"
            f"We received your request to join: {request_in.program_name}.\n"
            "Current status: pending. You'll be notified once reviewed by admin.\n\n"
            "Sports Academy"
        ),
    )
    return ProgramRequestRead.model_validate(program_request)


@router.get(
    "/",
    response_model=list[ProgramRequestRead],
    dependencies=[Depends(require_role(UserRole.ADMIN))],
)
def list_program_requests(db: Session = Depends(get_db)) -> list[ProgramRequestRead]:
    """Admin: list all program requests."""

    requests = (
        db.query(ProgramRequest)
        .order_by(ProgramRequest.created_at.desc())
        .all()
    )
    return [ProgramRequestRead.model_validate(r) for r in requests]


@router.patch(
    "/{request_id}/status",
    response_model=ProgramRequestRead,
    dependencies=[Depends(require_role(UserRole.ADMIN))],
)
def update_program_request_status(
    request_id: int,
    status_in: ProgramRequestStatusUpdate,
    db: Session = Depends(get_db),
) -> ProgramRequestRead:
    """Admin: approve or reject program requests."""

    req = db.query(ProgramRequest).filter(ProgramRequest.id == request_id).first()
    if not req:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Request not found")
    req.status = status_in.status
    db.commit()
    db.refresh(req)

    # Notify player on status change
    player = db.query(User).filter(User.id == req.player_id).first()
    if player:
        send_email(
            to_email=player.email,
            subject=f"Program request {status_in.status}",
            body=(
                f"Hi {player.full_name},\n\n"
                f"Your request to join {req.program_name} has been {status_in.status}.\n"
                "If approved, please check your dashboard for next steps.\n\n"
                "Sports Academy"
            ),
        )
    return ProgramRequestRead.model_validate(req)


@router.get("/my", response_model=list[ProgramRequestRead])
def my_program_requests(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
) -> list[ProgramRequestRead]:
    """Player: view own requests."""

    requests = (
        db.query(ProgramRequest)
        .filter(ProgramRequest.player_id == current_user.id)
        .order_by(ProgramRequest.created_at.desc())
        .all()
    )
    return [ProgramRequestRead.model_validate(r) for r in requests]
