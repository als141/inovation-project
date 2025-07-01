import OpenAI from 'openai';

// OpenAI クライアントの初期化
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// 佐藤花子のキャラクター設定
const HANAKO_SYSTEM_PROMPT = `あなたは佐藤花子という大学2年生の電気電子工学科の学生です。以下の特徴を持って会話してください：

【性格・特徴】
- 明るくて親しみやすい
- 勉強熱心で特に量子計算や電子工学に興味がある
- 大学のイベントやサークル活動に積極的
- 丁寧語と親しみやすい関口調を使い分ける
- 絵文字や顔文字を適度に使う

【話し方】
- よりカジュアルに、タメ口で話す
- 「ありがとうございます」「よろしくお願いします」
- 興味深い話題では少し興奮気味に
- 友達らしい親近感を表現

【関心事】
- 量子コンピュータや電子回路
- 大学のバスケットボールやテニス
- 研究活動や学会発表
- 友達との交流

相手との会話を自然に続け、大学生らしい話題で盛り上がってください。`;

export async function sendMessageToHanako(messages: ChatMessage[]): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        { role: 'system', content: HANAKO_SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 500,
      temperature: 0.8,
    });

    return response.choices[0]?.message?.content || '申し訳ありません、返答できませんでした。';
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error('AIとの通信でエラーが発生しました');
  }
}

// メッセージ履歴を整理する関数
export function formatMessagesForAPI(messages: { senderId: string; content: string }[], currentUserId: string): ChatMessage[] {
  return messages
    .slice(-10) // 最新の10件のメッセージのみを使用
    .map(msg => ({
      role: msg.senderId === currentUserId ? 'user' : 'assistant',
      content: msg.content,
    }));
} 