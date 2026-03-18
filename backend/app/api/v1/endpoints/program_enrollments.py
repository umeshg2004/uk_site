from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, require_role
from app.database.session import get_db
from app.core.email import send_email
from app.models.program_enrollment import EnrollmentStatus, ProgramEnrollment
from app.models.user import User, UserRole
from app.schemas.program_enrollment import (
    ProgramEnrollmentCreate,
    ProgramEnrollmentRead,
    ProgramEnrollmentStatusUpdate,
)


router = APIRouter(prefix="", tags=["program-enrollment"])


@router.post(
    "/program-enrollment",
    response_model=ProgramEnrollmentRead,
    status_code=status.HTTP_201_CREATED,
)
def create_program_enrollment(
    enrollment_in: ProgramEnrollmentCreate, db: Session = Depends(get_db)
) -> ProgramEnrollmentRead:
    """Public endpoint to submit a program enrollment request."""

    enrollment = ProgramEnrollment(
        **enrollment_in.model_dump(), status=EnrollmentStatus.PENDING
    )
    db.add(enrollment)
    db.commit()
    db.refresh(enrollment)

    # Notify player of receipt
    send_email(
        to_email=enrollment.email,
        subject="Program enrollment received",
        body=(
            f"Hi {enrollment.name},\n\n"
            f"We received your request for {enrollment.program_name}.\n"
            "Current status: pending. You'll be notified after review.\n\n"
            "Sports Academy"
        ),
    )
    return ProgramEnrollmentRead.model_validate(enrollment)


@router.get(
    "/program-enrollments",
    response_model=list[ProgramEnrollmentRead],
    dependencies=[Depends(require_role(UserRole.ADMIN))],
)
def list_program_enrollments(db: Session = Depends(get_db)) -> list[ProgramEnrollmentRead]:
    """Admin: list all program enrollments."""

    enrollments = (
        db.query(ProgramEnrollment)
        .order_by(ProgramEnrollment.created_at.desc())
        .all()
    )
    return [ProgramEnrollmentRead.model_validate(e) for e in enrollments]


@router.get(
    "/program-enrollments/summary",
    dependencies=[Depends(require_role(UserRole.ADMIN))],
)
def program_enrollment_summary(db: Session = Depends(get_db)) -> dict[str, int]:
    """Admin: aggregated counts for dashboard."""

    total = db.query(ProgramEnrollment).count()
    pending = (
        db.query(ProgramEnrollment)
        .filter(ProgramEnrollment.status == EnrollmentStatus.PENDING)
        .count()
    )
    approved = (
        db.query(ProgramEnrollment)
        .filter(ProgramEnrollment.status == EnrollmentStatus.APPROVED)
        .count()
    )
    return {"total": total, "pending": pending, "approved": approved}


@router.patch(
    "/program-enrollments/{enrollment_id}/status",
    response_model=ProgramEnrollmentRead,
    dependencies=[Depends(require_role(UserRole.ADMIN))],
)
def update_enrollment_status(
    enrollment_id: int,
    status_in: ProgramEnrollmentStatusUpdate,
    db: Session = Depends(get_db),
) -> ProgramEnrollmentRead:
    """Admin: approve or reject an enrollment."""

    enrollment = (
        db.query(ProgramEnrollment).filter(ProgramEnrollment.id == enrollment_id).first()
    )
    if not enrollment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enrollment not found")

    enrollment.status = status_in.status
    db.commit()
    db.refresh(enrollment)

    # Notify player of status change
    send_email(
        to_email=enrollment.email,
        subject=f"Program enrollment {status_in.status}",
        body=(
            f"Hi {enrollment.name},\n\n"
            f"Your request for {enrollment.program_name} has been {status_in.status}.\n"
            "Check your dashboard for details.\n\n"
            "Sports Academy"
        ),
    )
    return ProgramEnrollmentRead.model_validate(enrollment)


@router.delete(
    "/program-enrollments/{enrollment_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(require_role(UserRole.ADMIN))],
)
def delete_enrollment(enrollment_id: int, db: Session = Depends(get_db)) -> None:
    """Admin: delete an enrollment."""

    enrollment = (
        db.query(ProgramEnrollment).filter(ProgramEnrollment.id == enrollment_id).first()
    )
    if not enrollment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Enrollment not found")
    db.delete(enrollment)
    db.commit()
    return None


@router.get(
    "/program-enrollments/my",
    response_model=list[ProgramEnrollmentRead],
)
def my_program_enrollments(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
) -> list[ProgramEnrollmentRead]:
    """Authenticated user: view their own program enrollments (matched by email)."""

    enrollments = (
        db.query(ProgramEnrollment)
        .filter(ProgramEnrollment.email == current_user.email)
        .order_by(ProgramEnrollment.created_at.desc())
        .all()
    )
    return [ProgramEnrollmentRead.model_validate(e) for e in enrollments]
