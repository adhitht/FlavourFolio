from datetime import date
from typing import Generic, List, Optional, TypeVar

from pydantic import BaseModel, EmailStr, Field
from pydantic.generics import GenericModel

T = TypeVar('T')

class User_reviews(BaseModel):
    
     rating:float
     hotel_name:str
     cuisine:dict
     review:str
     sentimental_review:float
    

     class Config:
        orm_mode = True