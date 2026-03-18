from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.api.v1.api import api_router
from app.schemas.contact import ContactMessageCreate
from app.schemas.program_enrollment import ProgramEnrollmentCreate
from app.schemas.program_request import ProgramRequestCreate
from app.database.session import SessionLocal, get_db
from app.core.config import get_settings
from app.core.security import get_password_hash
from app.models.user import User, UserRole
from app.api.v1.endpoints.program_enrollments import create_program_enrollment
from app.api.v1.endpoints.program_requests import create_program_request
from app.api.deps import get_current_user


settings = get_settings()

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)


@app.on_event("startup")
def ensure_default_admin() -> None:
    """Create a default admin account if none exists."""

    db = SessionLocal()
    try:
        existing_admin = db.query(User).filter(User.role == UserRole.ADMIN).first()
        if existing_admin:
            return

        admin_user = User(
            email=settings.DEFAULT_ADMIN_EMAIL,
            full_name=settings.DEFAULT_ADMIN_FULL_NAME,
            hashed_password=get_password_hash(settings.DEFAULT_ADMIN_PASSWORD),
            role=UserRole.ADMIN,
        )
        db.add(admin_user)
        db.commit()
        print(
            f"Default admin created with email: {settings.DEFAULT_ADMIN_EMAIL}. "
            "Update the password via environment variables in production."
        )
    except Exception as e:
        db.rollback()
        print(f"Failed to create default admin: {e}")
    finally:
        db.close()


# Add contact endpoint without v1 prefix for frontend compatibility
@app.post("/api/v1/contact")
def contact_endpoint(message: ContactMessageCreate, db: Session = Depends(get_db)):
    """Contact form submission endpoint (public)."""
    # Call the existing endpoint logic
    from app.api.v1.endpoints.contact import submit_contact_message
    return submit_contact_message(message, db)


@app.post("/api/program-enrollment")
def public_program_enrollment(
    enrollment: ProgramEnrollmentCreate, db: Session = Depends(get_db)
):
    """Public path without version prefix for program enrollment."""

    return create_program_enrollment(enrollment, db)


@app.post("/api/program-request")
def public_program_request(
    program: ProgramRequestCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Authenticated player join program request without version prefix."""

    return create_program_request(program, current_user=current_user, db=db)


@app.get("/healthz")
def health_check() -> dict[str, str]:
    """Simple health check endpoint."""

    return {"status": "ok"}

