from sqlalchemy import Column, Integer, String, Date, Time, Text, DateTime, Enum
from sqlalchemy.sql import func
from .session import Base
import enum

class InteractionType(enum.Enum):
    MEETING = "Meeting"
    CALL = "Call"
    EMAIL = "Email"
    VISIT = "Visit"

class Sentiment(enum.Enum):
    POSITIVE = "Positive"
    NEUTRAL = "Neutral"
    NEGATIVE = "Negative"

class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)
    hcp_name = Column(String(255), nullable=False)
    interaction_type = Column(Enum(InteractionType), nullable=False)
    date = Column(Date, nullable=False)
    time = Column(Time, nullable=False)
    attendees = Column(Text)  # Matches screen [cite: 38]
    topics_discussed = Column(Text) # Matches screen [cite: 40]
    sentiment = Column(Enum(Sentiment)) # Matches screen [cite: 45]
    outcomes = Column(Text) # Matches screen [cite: 47]
    follow_up_actions = Column(Text) # Matches screen [cite: 49]
    created_at = Column(DateTime(timezone=True), server_default=func.now())