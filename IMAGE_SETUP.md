# 画像ファイル設定ガイド

このプロトタイプで使用する画像ファイルの配置方法について説明します。

## ディレクトリ構造

以下の構造で `public` ディレクトリに画像ファイルを配置してください：

```
public/
├── food/                    # 食事メニューの画像
│   ├── karaage.jpg         # 唐揚げ定食
│   ├── curry.jpg           # カレーライス
│   └── pasta.jpg           # パスタランチ
├── items/                   # フリマ商品の画像
│   ├── programming-books.jpg # プログラミング入門書セット
│   └── thinkpad.jpg         # ノートパソコン
├── avatars/                 # ユーザーアバター画像
│   ├── tanaka.jpg          # 田中太郎
│   ├── sato.jpg            # 佐藤花子
│   ├── suzuki.jpg          # 鈴木一郎
│   ├── takahashi.jpg       # 高橋美咲
│   ├── yamada.jpg          # 山田健二
│   └── default.png         # デフォルトアバター
└── restaurants/             # レストランの画像
    └── gakushoku-a.jpg     # 学食A
```

## 画像仕様

### 推奨サイズ
- **食事メニュー**: 800x450px (16:9比率)
- **フリマ商品**: 600x600px (1:1比率)
- **ユーザーアバター**: 400x400px (1:1比率)
- **レストラン**: 800x600px (4:3比率)

### サポート形式
- JPG (推奨)
- PNG
- WebP
- AVIF

### ファイルサイズ
- 最大ファイルサイズ: 5MB
- 推奨サイズ: 500KB以下

## 画像の追加方法

1. 適切なディレクトリに画像ファイルを配置
2. ファイル名は上記の構造に従って命名
3. 画像が表示されない場合は、適切なフォールバック表示が自動的に行われます

## 自動機能

### レスポンシブ対応
- 各画像は自動的にデバイスサイズに最適化されます
- Next.js Image コンポーネントによる自動最適化

### エラーハンドリング
- 画像が読み込めない場合、自動的にフォールバック表示
- 食事メニュー: 🍽️ アイコンと「画像なし」テキスト
- フリマ商品: 📸 アイコンと「画像なし」テキスト

### パフォーマンス最適化
- 画像の遅延読み込み（Lazy Loading）
- WebP/AVIF形式への自動変換
- 適切なサイズでの配信

## 実際の画像を追加する場合

実際の画像ファイルを追加する場合は、上記の構造に従って配置し、以下のコマンドでサーバーを再起動してください：

```bash
npm run dev
```

画像が正しく表示されない場合は、ブラウザのキャッシュをクリアしてください。