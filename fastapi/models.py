from sqlalchemy import Column, Integer, String, BigInteger, JSON, BLOB, Boolean
from db import Base

class User(Base):
    __tablename__ = 'users' 
    id = Column(BigInteger, primary_key=True, index=True)
    username = Column(String(length=50))
    email = Column(String(length=100))
    password = Column(String(length=255))
    cart = Column(JSON)
    profileImage = Column(BLOB)
    profileImageName = Column(String(length=100))
    isActive = Column(Boolean)
    emailVerified = Column(Boolean)


class Product(Base):
    __tablename__ = 'products'
    id = Column(BigInteger, primary_key=True, index=True)
    name = Column(String(length=50))
    image = Column(String(length=50))
    shape = Column(String(length=50))
    size = Column(String(length=50))
    price = Column(String(length=50))
    text = Column(String(length=255))
