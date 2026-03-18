from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import List


class Settings(BaseSettings):
    """Application configuration loaded from environment variables."""

    PROJECT_NAME: str = "Sports Academy Management System"
    API_V1_STR: str = "/api/v1"

    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:3004",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3002",
        "http://127.0.0.1:3003",
        "http://127.0.0.1:3004",
    ]

    # Security
    SECRET_KEY: str = "CHANGE_ME_IN_PRODUCTION"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day
    ALGORITHM: str = "HS256"

    # Default admin bootstrap
    DEFAULT_ADMIN_EMAIL: str = "admin@sportsacademy.com"
    DEFAULT_ADMIN_PASSWORD: str = "Admin@123!"
    DEFAULT_ADMIN_FULL_NAME: str = "Academy Admin"

    # SMTP (for notifications)
    SMTP_HOST: str = "localhost"
    SMTP_PORT: int = 1025
    SMTP_USER: str | None = None
    SMTP_PASSWORD: str | None = None
    SMTP_FROM: str = "noreply@sportsacademy.com"

    # Database
    SQLALCHEMY_DATABASE_URI: str = (
        "postgresql+psycopg2://postgres:postgres@db:5432/sports_academy"
    )

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache
def get_settings() -> Settings:
    """Return cached settings instance."""

    return Settings()

