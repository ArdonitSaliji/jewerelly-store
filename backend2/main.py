from fastapi import FastAPI, Depends, Request, HTTPException, status
from fastapi.responses import JSONResponse
import json
import schemas
import models
from db import engine, SessionLocal
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


models.Base.metadata.create_all(engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post('/signup', status_code=201)
def home(request: schemas.User, db: Session = Depends(get_db)):
    new_blog = models.User(username=request.username, email=request.email, password=request.password, cart=request.cart, profileImage=request.profileImage, profileImageName=request.profileImageName, isActive=request.isActive, emailVerified=request.emailVerified) 
    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)
    return new_blog

@app.get('/products')
def all(db: Session = Depends(get_db)):
    products = db.query(models.Product).filter(models.Product.text != '').all()
    return products

@app.post('/login')
async def login(request: Request, db: Session = Depends(get_db)):
    body = await request.json()
    query = db.query(models.User).filter(models.User.username == body['email'] and models.User.password == body['password']).first()
    if query:
        return JSONResponse(content={'message': 'Login successfull', 'auth': True, 'ok': True, 'user': body['email']}, status_code=200)
    else:
        return JSONResponse(content={'message': 'Account does not exist'}, status_code=404)
    


