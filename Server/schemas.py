from typing import List, Optional, Generic, TypeVar
from pydantic import BaseModel , Field,EmailStr 
from pydantic.generics import GenericModel
from datetime import date 

from pydantic import BaseModel
T = TypeVar('T')


class User_reviews(BaseModel):
    
     rating:float
     hotel_name:str
     cuisine:dict
     review:str
     sentimental_review:float
    

     class Config:
        orm_mode = True