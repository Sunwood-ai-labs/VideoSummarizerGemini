import google.generativeai as genai
from app import app

def generate_summary(transcript):
    genai.configure(api_key=app.config['GEMINI_API_KEY'])
    model = genai.GenerativeModel('gemini-pro')
    
    prompt = f"""
    Please summarize the following YouTube video transcript in a well-structured article format.
    Include main points, key takeaways, and maintain a natural flow:
    
    {transcript}
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error generating summary: {str(e)}")
        return "Failed to generate summary"
