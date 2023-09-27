from fastapi import FastAPI, Depends, HTTPException
from authlib.integrations.starlette_client import OAuth
from sqlalchemy.orm import Session
app = FastAPI()
oauth = OAuth()
from config import SessionLocal
from models import User
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


oauth.register(
    name="google",
    client_id="219314185678-0pk1puakrjrokedjtof3nuk4o9dv0iq8.apps.googleusercontent.com",
    client_secret="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",
    authorize_url="https://accounts.google.com/o/oauth2/auth",
     authorize_params={
        "access_type": "offline",
        "prompt": "consent",
        "scope": "openid email profile https://www.googleapis.com/auth/userinfo.profile",
        "response_type": "code",
        "redirect_uri": "https://localhost/login/callback",
    },
)
@app.get("/")
async def root():
    return {"message": "Hello World"}
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