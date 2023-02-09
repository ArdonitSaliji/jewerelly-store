from pydantic import BaseModel

class User(BaseModel):
    username: str
    email: str
    password: str
    cart: dict | None
    profileImage: str | None
    profileImageName: str | None
    isActive: str | None
    emailVerified: str | None
