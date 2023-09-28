from sqlalchemy.orm import Session
from models import User_review
from schemas import User_reviews

def user_review(db: Session,user_review: User_reviews):
    _user_review = User_review(**user_review.dict())
    db.add( _user_review)
    db.commit()
    db.refresh ( _user_review)
    return  _user_review 