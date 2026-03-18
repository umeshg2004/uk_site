from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.deps import require_role
from app.database.session import get_db
from app.models.core_entities import Player
from app.models.user import User, UserRole
from app.schemas.entities import PlayerCreate, PlayerRead


router = APIRouter(prefix="/players", tags=["players"])


@router.post("/", response_model=PlayerRead, status_code=status.HTTP_201_CREATED)
def create_player(
    player_in: PlayerCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(UserRole.ADMIN)),
) -> PlayerRead:
    """Create a new player profile (admin only)."""

    player = Player(**player_in.model_dump())
    db.add(player)
    db.commit()
    db.refresh(player)
    return PlayerRead.model_validate(player)


@router.get("/", response_model=list[PlayerRead])
def list_players(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(UserRole.ADMIN)),
    skip: int = 0,
    limit: int = Query(default=50, le=100),
    search: str | None = None,
) -> list[PlayerRead]:
    """List players with optional search and pagination."""

    query = db.query(Player)
    if search:
        like = f"%{search}%"
        query = query.filter(Player.name.ilike(like))
    players = query.offset(skip).limit(limit).all()
    return [PlayerRead.model_validate(p) for p in players]


@router.get("/{player_id}", response_model=PlayerRead)
def get_player(
    player_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(UserRole.ADMIN)),
) -> PlayerRead:
    """Retrieve a single player."""

    player = db.query(Player).filter(Player.id == player_id).first()
    if not player:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Player not found")
    return PlayerRead.model_validate(player)


@router.put("/{player_id}", response_model=PlayerRead)
def update_player(
    player_id: int,
    player_in: PlayerCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(UserRole.ADMIN)),
) -> PlayerRead:
    """Update player details."""

    player = db.query(Player).filter(Player.id == player_id).first()
    if not player:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Player not found")
    for field, value in player_in.model_dump().items():
        setattr(player, field, value)
    db.commit()
    db.refresh(player)
    return PlayerRead.model_validate(player)


@router.delete("/{player_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_player(
    player_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(UserRole.ADMIN)),
) -> None:
    """Delete a player profile."""

    player = db.query(Player).filter(Player.id == player_id).first()
    if not player:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Player not found")
    db.delete(player)
    db.commit()
    return None

