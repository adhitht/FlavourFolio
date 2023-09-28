from authlib.integrations.starlette_client import OAuth
from fastapi import Depends, FastAPI, HTTPException
from schemas import User_reviews
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
oauth = OAuth()
import os

import crud
from config import SessionLocal
from dotenv import load_dotenv
from models import User

load_dotenv()
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your list of allowed origins
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers in the request
)

oauth.register(
    name="google",
    client_id=os.getenv('CLIENT_ID'),
    client_secret=os.getenv('CLIENT_SECRET'),
    authorize_url="https://accounts.google.com/o/oauth2/auth",
     authorize_params={
        "access_type": "offline",
        "prompt": "consent",
        "scope": "openid email profile https://www.googleapis.com/auth/userinfo.profile",
        "response_type": "code",
        "redirect_uri": "http://localhost:8000/login/callback",
    },
)
@app.get("/")
async def root():
    return {"message": "Hello World", "client_id": os.getenv('CLIENT_ID'),"client_secret": os.getenv('CLIENT_SECRET')}

@app.post("/login")
async def login(request):
    redirect_uri = url_for("auth", _external=True)
    return await oauth.google.authorize_redirect(request, redirect_uri)

def fetch_profile_photo(access_token):
    profile_url = "https://www.googleapis.com/plus/v1/people/me"
    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(profile_url, headers=headers)
    data = response.json()
    return data.get("image", {}).get("url")

@app.post("/login/callback")
async def auth(request,db: Session = Depends(get_db)):
    token = await oauth.google.authorize_access_token(request)
    user = await oauth.google.parse_id_token(request, token)
    
    user = db.query(User).filter_by(email=user_info['email']).first()

    if not user:
        user = User(email=user_info['email'],username=user_info['name'])
        db.add(user)
        db.commit()
        db.refresh(user)
    profile_photo_url = fetch_profile_photo(token['access_token'])
    db.commit()
    return {"user_info": user , "profile_photo_url": profile_photo_url}


@app.post("/review")
async def review(user_review: User_reviews, db: Session = Depends(get_db)):
    crud.user_review(db, user_review)
    response_data = {
        "status": "Ok",  
        "code": "200",
        "message": "user_review created successfully",
        "result": None  
    }
    return response_data