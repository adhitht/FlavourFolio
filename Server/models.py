from sqlalchemy import create_engine, Column, Integer, String,BigInteger,Boolean,ForeignKey,DateTime,Date,Float
from sqlalchemy.dialects.postgresql import JSONB
from config import Base,engine
from sqlalchemy.orm import relationship
import datetime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    profile_photo_url = Column(String)

    user_table = relationship("User_review",back_populates="user_review")
class User_review(Base):
     __tablename__ = "user_review"  
     id=Column(Integer, primary_key=True, index=True)
     user_id=Column(Integer,ForeignKey("users.id"))
     created_date=Column(DateTime,default=datetime.datetime.utcnow)
     rating=Column(Float)
     hotel_name=Column(String)
     cuisine=Column(JSONB)
     review=Column(String)
     sentimental_review=Column(Float)


     user_review = relationship("User",back_populates="user_table")