#!/usr/bin/env python3
"""
Database initialization script for Sports Academy Management System.
Creates tables and seeds a default admin user.
"""

import os
import sys

# Ensure backend package is importable when running directly
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.core.config import get_settings
from app.core.security import get_password_hash
from app.database.base import Base
from app.database.session import SessionLocal, engine
from app.models.contact import ContactMessage
from app.models.core_entities import (
    Attendance,
    Batch,
    Coach,
    Enrollment,
    Payment,
    Performance,
    Player,
    Program,
)
from app.models.user import User, UserRole
from app.models.program_enrollment import ProgramEnrollment
from app.models.program_request import ProgramRequest

settings = get_settings()


def create_tables() -> None:
    """Create all database tables."""

    print("Creating database tables...")
    try:
        Base.metadata.create_all(bind=engine)
        print("✓ All tables created successfully.")

        print("\nTables created:")
        for table_name in Base.metadata.tables.keys():
            print(f"  - {table_name}")
    except Exception as exc:  # pragma: no cover - script usage
        print(f"Error creating tables: {exc}")
        sys.exit(1)


def ensure_default_admin() -> None:
    """Seed a default admin account if none exists."""

    db = SessionLocal()
    try:
        existing_admin = db.query(User).filter(User.role == UserRole.ADMIN).first()
        if existing_admin:
            print("→ Admin user already present; skipping seed.")
            return

        admin_user = User(
            email=settings.DEFAULT_ADMIN_EMAIL,
            full_name=settings.DEFAULT_ADMIN_FULL_NAME,
            hashed_password=get_password_hash(settings.DEFAULT_ADMIN_PASSWORD),
            role=UserRole.ADMIN,
        )
        db.add(admin_user)
        db.commit()
        print(f"✓ Default admin created: {settings.DEFAULT_ADMIN_EMAIL}")
    except Exception as exc:  # pragma: no cover - script usage
        db.rollback()
        print(f"Error creating default admin: {exc}")
        sys.exit(1)
    finally:
        db.close()


def drop_tables() -> None:
    """Drop all database tables (use with caution!)."""

    print("Dropping all database tables...")
    try:
        Base.metadata.drop_all(bind=engine)
        print("✓ All tables dropped successfully.")
    except Exception as exc:  # pragma: no cover - script usage
        print(f"Error dropping tables: {exc}")
        sys.exit(1)


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--drop":
        drop_tables()
    else:
        create_tables()
        ensure_default_admin()
