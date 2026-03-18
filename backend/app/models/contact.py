"""Contact message models."""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean

from app.database.base import Base


class ContactMessage(Base):
    """Contact form submissions from website visitors."""

    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(20), nullable=True)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<ContactMessage {self.id} - {self.email}>"
