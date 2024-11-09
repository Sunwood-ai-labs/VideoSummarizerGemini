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

def evaluate_article_quality(summary):
    genai.configure(api_key=app.config['GEMINI_API_KEY'])
    model = genai.GenerativeModel('gemini-pro')
    
    prompt = f"""
    以下の記事の品質を評価し、0から100のスコアを返してください。

    評価基準:
    1. 内容の整理と構造化 (30点)
    2. 重要ポイントの明確さ (25点)
    3. 文章の読みやすさ (25点)
    4. まとめの適切さ (20点)

    評価する記事:
    {summary}

    スコアのみを数値で返してください。
    """
    
    try:
        response = model.generate_content(prompt)
        score = float(response.text.strip())
        return min(max(score, 0), 100)  # Ensure score is between 0 and 100
    except Exception as e:
        print(f"Error evaluating article quality: {str(e)}")
        return 70  # Default score if evaluation fails
