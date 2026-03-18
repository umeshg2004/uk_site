from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.api.deps import (
    authenticate_user,
    get_current_user,
    get_user_by_email,
    require_role,
)
from app.core.config import get_settings
from app.core.security import create_access_token, get_password_hash
from app.database.session import get_db
from app.models.user import User, UserRole
from app.schemas.auth import (
    CoachAccountCreate,
    Token,
    UserCreate,
    UserRead,
)


router = APIRouter(prefix="/auth", tags=["auth"])

settings = get_settings()


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register_user(user_in: UserCreate, db: Session = Depends(get_db)) -> UserRead:
    """Register a new user as a player (role is enforced server-side)."""

    try:
        existing = get_user_by_email(db, email=user_in.email)
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )

        user = User(
            email=user_in.email,
            full_name=user_in.full_name,
            hashed_password=get_password_hash(user_in.password),
            role=UserRole.PLAYER,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return UserRead.model_validate(user)
    except Exception as e:
        db.rollback()
        print(f"Registration error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Registration failed: {str(e)}",
        )


@router.post(
    "/coach",
    response_model=UserRead,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_role(UserRole.ADMIN))],
)
def create_coach_account(
    coach_in: CoachAccountCreate, db: Session = Depends(get_db)
) -> UserRead:
    """Allow admins to create coach accounts."""

    try:
        existing = get_user_by_email(db, email=coach_in.email)
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )

        user = User(
            email=coach_in.email,
            full_name=coach_in.full_name,
            hashed_password=get_password_hash(coach_in.password),
            role=UserRole.COACH,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return UserRead.model_validate(user)
    except Exception as e:
        db.rollback()
        print(f"Coach creation error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Coach creation failed: {str(e)}",
        )


@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)) -> Token:
    """
    OAuth2 compatible login endpoint returning a JWT.

    Note: expects `username` and `password` fields from form data.
    """

    user = authenticate_user(db, email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        subject=user.id,
        expires_delta=access_token_expires,
    )
    return Token(access_token=access_token)


@router.get("/me", response_model=UserRead)
def get_current_user_info(current_user: User = Depends(get_current_user)) -> UserRead:
    """Get current authenticated user information."""
    return UserRead.model_validate(current_user)

