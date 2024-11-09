# YouTube 動画要約ツール 🎥✨

[![GitHub](https://img.shields.io/badge/GitHub-VideoSummarizerGemini-orange)](https://github.com/Sunwood-ai-labs/VideoSummarizerGemini)

複数のYouTube動画を要約し、読みやすい記事に変換するAIツールです。

## ✨ 主な機能

- 🎯 複数動画の一括要約・統合
- 📝 Markdownフォーマット対応
- 💫 Gemini AIによる高品質な要約生成
- 🔄 動画の自動文字起こし
- 📊 AIによる記事品質スコアリング
- 🎨 おしゃれなグラデーションUI
- 🇯🇵 日本語最適化 (Kaisei Decolフォント)

## 🚀 使い方

1. YouTubeのURLを入力
2. 「要約を生成」をクリック
3. 自動で要約と品質スコアを生成
4. Markdownファイルとしてダウンロード可能

## 🛠️ 技術スタック

- Flask (Webフレームワーク)
- Google Gemini AI (テキスト生成)
- YouTube Data API (動画情報取得)
- SQLAlchemy (データベース)
- Bootstrap + カスタムCSS (UI)

## 📦 インストール

```bash
git clone https://github.com/Sunwood-ai-labs/VideoSummarizerGemini
cd VideoSummarizerGemini
pip install -r requirements.txt
```

## 🔑 環境変数の設定

以下の環境変数を設定してください：

- GEMINI_API_KEY
- YOUTUBE_API_KEY
- DATABASE_URL

## 💝 ライセンス

MIT License

© 2024 Sunwood AI Labs
