from datetime import datetime
from app import db

class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    video_id = db.Column(db.String(20), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    summary = db.Column(db.Text, nullable=False)
    thumbnail_url = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    quality_score = db.Column(db.Float)
    
    def to_dict(self):
        return {
            'id': self.id,
            'video_id': self.video_id,
            'title': self.title,
            'summary': self.summary,
            'thumbnail_url': self.thumbnail_url,
            'created_at': self.created_at.isoformat(),
            'quality_score': round(self.quality_score, 2) if self.quality_score else None
        }
