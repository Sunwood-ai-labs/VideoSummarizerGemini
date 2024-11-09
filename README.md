# YouTube 動画要約ツール 🎥✨

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![Framework](https://img.shields.io/badge/Framework-Flask-lightgrey)](https://flask.palletsprojects.com/)
[![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange)](https://deepmind.google/technologies/gemini/)
[![UI](https://img.shields.io/badge/UI-Bootstrap%205-purple)](https://getbootstrap.com/)
[![Font](https://img.shields.io/badge/Font-Kaisei%20Decol-green)](https://fonts.google.com/specimen/Kaisei+Decol)

複数のYouTube動画を要約し、読みやすい記事に変換するAIツールです。Gemini AIを活用した高品質な要約と品質スコアリングを提供します。

## ✨ 主な機能

### 🎯 コア機能
- 複数動画の一括要約・統合
- 動画の自動文字起こし
- Gemini AIによる高品質な要約生成
- AIによる記事品質スコアリング（0-100点）

### 📝 出力形式
- Markdownフォーマット対応
- カラーコード化された品質バッジ
- ダウンロード機能

### 🎨 UI/UX
- おしゃれなグラデーションテーマ
- レスポンシブデザイン
- 日本語最適化（Kaisei Decolフォント）

## 🚀 デモ

### 品質スコアバッジ
- 🏆 90-100点: Excellent（優秀）
- ✨ 80-89点: Good（良好）
- ✅ 70-79点: Fair（普通）
- 📝 0-69点: Needs Improvement（要改善）

## 💻 技術スタック

### バックエンド
- Flask (Webフレームワーク)
- SQLAlchemy (ORM)
- PostgreSQL (データベース)

### AI/API
- Google Gemini AI (テキスト生成/評価)
- YouTube Data API (動画情報取得)
- YouTube Transcript API (字幕取得)

### フロントエンド
- Bootstrap 5
- Custom CSS (グラデーションテーマ)
- Font Awesome (アイコン)

## 📦 インストール

```bash
# リポジトリのクローン
git clone https://github.com/Sunwood-ai-labs/VideoSummarizerGemini
cd VideoSummarizerGemini

# 依存関係のインストール
pip install -r requirements.txt

# データベースの設定
flask db upgrade
```

## ⚙️ 環境変数の設定

以下の環境変数を`.env`ファイルに設定してください：

```env
GEMINI_API_KEY=your_gemini_api_key    # Gemini AI APIキー
YOUTUBE_API_KEY=your_youtube_api_key  # YouTube Data APIキー
DATABASE_URL=your_database_url        # PostgreSQLデータベースURL
```

## 🎮 使用方法

1. **起動**
```bash
python main.py
```

2. **使用手順**
- YouTubeのURLを入力（複数可）
- 「要約を生成」をクリック
- AIが自動で要約と品質評価を実施
- 結果をMarkdownでダウンロード可能

## 🔍 主な特徴

### マルチ動画対応
- 複数動画の同時要約
- 関連動画の統合要約機能
- バッチ処理による効率的な処理

### 品質評価システム
- Gemini AIによる客観的評価
- 複数の評価基準
  - 内容の整理と構造化（30点）
  - 重要ポイントの明確さ（25点）
  - 文章の読みやすさ（25点）
  - まとめの適切さ（20点）

### UI/UXの特徴
- 直感的なインターフェース
- リアルタイムのフィードバック
- モバイルフレンドリーデザイン

## 🤝 コントリビューション

1. このリポジトリをFork
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにPush (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

## 💝 ライセンス

MIT License © 2024 [Sunwood AI Labs](https://github.com/Sunwood-ai-labs)

---

Made with ❤️ by Sunwood AI Labs
