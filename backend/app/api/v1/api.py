from fastapi import APIRouter

from app.api.v1.endpoints import (
    auth,
    players,
    contact,
    program_enrollments,
    program_requests,
)


api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(players.router)
api_router.include_router(contact.router)
api_router.include_router(program_enrollments.router)
api_router.include_router(program_requests.router)

