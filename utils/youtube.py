from googleapiclient.discovery import build
from app import app
from youtube_transcript_api import YouTubeTranscriptApi

def get_video_info(video_id):
    youtube = build('youtube', 'v3', developerKey=app.config['YOUTUBE_API_KEY'])
    
    try:
        video_response = youtube.videos().list(
            part='snippet',
            id=video_id
        ).execute()
        
        if not video_response['items']:
            return None
            
        video_data = video_response['items'][0]['snippet']
        
        # Get transcript
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
        transcript_text = ' '.join([item['text'] for item in transcript_list])
        
        return {
            'title': video_data['title'],
            'description': video_data['description'],
            'thumbnail_url': video_data['thumbnails']['high']['url'],
            'transcript': transcript_text
        }
        
    except Exception as e:
        print(f"Error fetching video info: {str(e)}")
        return None
