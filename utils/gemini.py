import google.generativeai as genai
from app import app

def generate_summary(transcript):
    genai.configure(api_key=app.config['GEMINI_API_KEY'])
    model = genai.GenerativeModel('gemini-pro')
    
    prompt = f"""
    以下のYouTube動画の文字起こしを要約し、読みやすいMarkdown形式の記事にしてください。

    要件:
    1. 日本語で出力してください
    2. 重要なポイントを箇条書きで含めてください
    3. 内容を論理的に整理し、見出しを使って構造化してください
    4. 結論や重要な発見を最後にまとめてください

    文字起こし:
    {transcript}
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error generating summary: {str(e)}")
        return "要約の生成に失敗しました"
