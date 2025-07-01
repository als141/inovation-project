import { NextRequest, NextResponse } from 'next/server';
import { sendMessageToHanako, formatMessagesForAPI } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { messages, currentUserId, targetUserId } = await request.json();
    
    // 佐藤花子（ID: '2'）との会話のみ許可
    if (targetUserId !== '2') {
      return NextResponse.json(
        { error: 'このユーザーとはAI会話できません' },
        { status: 400 }
      );
    }

    // メッセージ履歴をOpenAI API用にフォーマット
    const formattedMessages = formatMessagesForAPI(messages, currentUserId);
    
    // OpenAI APIを呼び出し
    const aiResponse = await sendMessageToHanako(formattedMessages);
    
    return NextResponse.json({ 
      message: aiResponse,
      success: true 
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
} 