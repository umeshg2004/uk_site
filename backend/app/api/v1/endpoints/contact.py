"""Contact message endpoints."""

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import require_role
from app.database.session import get_db
from app.models.contact import ContactMessage
from app.models.user import UserRole
from app.schemas.contact import ContactMessageCreate, ContactMessageRead


router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("/messages", response_model=ContactMessageRead, status_code=status.HTTP_201_CREATED)
def submit_contact_message(
    message_in: ContactMessageCreate,
    db: Session = Depends(get_db),
) -> ContactMessageRead:
    """Submit a contact message from the website (public endpoint)."""

    message = ContactMessage(**message_in.model_dump())
    db.add(message)
    db.commit()
    db.refresh(message)
    return ContactMessageRead.model_validate(message)


@router.get("/messages", response_model=list[ContactMessageRead])
def get_contact_messages(
    db: Session = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    unread_only: bool = Query(False),
) -> list[ContactMessageRead]:
    """Retrieve contact messages (admin can access all)."""

    query = db.query(ContactMessage)
    if unread_only:
        query = query.filter(ContactMessage.is_read == False)
    
    messages = query.order_by(ContactMessage.created_at.desc()).offset(skip).limit(limit).all()
    return [ContactMessageRead.model_validate(m) for m in messages]


@router.get("/messages/{message_id}", response_model=ContactMessageRead)
def get_contact_message(
    message_id: int,
    db: Session = Depends(get_db),
) -> ContactMessageRead:
    """Retrieve a single contact message."""

    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found")
    
    # Mark as read
    if not message.is_read:
        message.is_read = True
        db.commit()
        db.refresh(message)
    
    return ContactMessageRead.model_validate(message)


@router.delete("/messages/{message_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_contact_message(
    message_id: int,
    db: Session = Depends(get_db),
) -> None:
    """Delete a contact message."""

    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found")
    
    db.delete(message)
    db.commit()
    return None
