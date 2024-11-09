from flask import render_template, request, jsonify
from app import app, db
from models import Article
from utils.youtube import get_video_info
from utils.gemini import generate_summary
from utils.cache import cache_get, cache_set
import re

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/summarize', methods=['POST'])
def summarize():
    urls = request.json.get('urls', [])
    results = []
    
    for url in urls:
        try:
            video_id = extract_video_id(url)
            if not video_id:
                results.append({'error': f'Invalid YouTube URL: {url}'})
                continue
                
            # Check cache
            cached_article = cache_get(video_id)
            if cached_article:
                results.append(cached_article)
                continue
                
            # Get video info
            video_info = get_video_info(video_id)
            if not video_info:
                results.append({'error': f'Could not fetch video info for: {url}'})
                continue
                
            # Generate summary
            summary = generate_summary(video_info['transcript'])
            
            # Create article
            article = Article(
                video_id=video_id,
                title=video_info['title'],
                summary=summary,
                thumbnail_url=video_info['thumbnail_url']
            )
            db.session.add(article)
            db.session.commit()
            
            result = article.to_dict()
            cache_set(video_id, result)
            results.append(result)
            
        except Exception as e:
            results.append({'error': str(e)})
    
    return jsonify(results)

def extract_video_id(url):
    patterns = [
        r'(?:youtube\.com\/watch\?v=|youtu.be\/)([^&\n?]*)',
        r'youtube.com\/embed\/([^&\n?]*)'
    ]
    
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return None
