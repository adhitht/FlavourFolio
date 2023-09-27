from fastapi import FastAPI, Depends, HTTPException
from authlib.integrations.starlette_client import OAuth
app = FastAPI()
oauth = OAuth()
from models import User
@app.get("/")
async def root():
    return {"message": "Hello World"}

oauth.register(
    name="google",
    client_id="219314185678-0pk1puakrjrokedjtof3nuk4o9dv0iq8.apps.googleusercontent.com",
    client_secret="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",
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    authorize_params=None,
)

@app.post("/login")
async def login(request):
    redirect_uri = url_for("auth", _external=True)
    return await oauth.google.authorize_redirect(request, redirect_uri)

@app.post("/login/callback")
async def auth(request):
    token = await oauth.google.authorize_access_token(request)
    user = await oauth.google.parse_id_token(request, token)
    
    user = db.query(User).filter_by(email=user_info['email']).first()

    if not user:
        user = User(email=user_info['email'])
        db.add(user)
        db.commit()
        db.refresh(user)

    return {"user_info": user}