'use client';

import { useState } from 'react';
import { MessageSquare, Search, Plus, Send, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { mockConversations, mockMessages, mockUsers } from '@/lib/mock-data';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import type { Conversation } from '@/types';

export default function MessagesPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ログインが必要です</h1>
          <p className="text-muted-foreground">
            メッセージを確認するにはログインしてください。
          </p>
        </div>
      </div>
    );
  }

  const getUserById = (userId: string) => {
    return mockUsers.find(u => u.id === userId);
  };

  const getOtherParticipant = (conversation: Conversation) => {
    const otherUserId = conversation.participants.find(id => id !== user.id);
    return otherUserId ? getUserById(otherUserId) : null;
  };

  const getConversationMessages = (conversationId: string) => {
    return mockMessages.filter(message => message.conversationId === conversationId);
  };

  const filteredConversations = mockConversations.filter(conversation => {
    if (!searchTerm) return true;
    const otherUser = getOtherParticipant(conversation);
    return otherUser?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           conversation.lastMessage.content.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const selectedConversationData = selectedConversation 
    ? mockConversations.find(c => c.id === selectedConversation)
    : null;

  const selectedMessages = selectedConversation 
    ? getConversationMessages(selectedConversation)
    : [];

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // モックでメッセージ送信をシミュレート
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const totalUnreadCount = mockConversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-4">
          <MessageSquare className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">メッセージ</h1>
            <p className="text-muted-foreground">
              {totalUnreadCount > 0 ? `${totalUnreadCount}件の未読メッセージ` : '未読メッセージはありません'}
            </p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          新規メッセージ
        </Button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-80 border-r flex flex-col">
          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="会話を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                {searchTerm ? '検索結果がありません' : 'まだ会話がありません'}
              </div>
            ) : (
              <div className="space-y-1 p-2">
                {filteredConversations.map((conversation) => {
                  const otherUser = getOtherParticipant(conversation);
                  if (!otherUser) return null;

                  const isSelected = selectedConversation === conversation.id;
                  const isUnread = conversation.unreadCount > 0;

                  return (
                    <div
                      key={conversation.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
                            <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {isUnread && (
                            <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                              <span className="text-xs text-white font-bold">
                                {conversation.unreadCount}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className={`font-medium truncate ${isUnread ? 'font-bold' : ''}`}>
                              {otherUser.name}
                            </div>
                            <div className={`text-xs ${isSelected ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                              {formatDistanceToNow(new Date(conversation.lastMessage.createdAt), { 
                                addSuffix: true, 
                                locale: ja 
                              })}
                            </div>
                          </div>
                          <div className={`text-sm truncate ${
                            isSelected 
                              ? 'text-primary-foreground/70' 
                              : isUnread 
                                ? 'text-foreground font-medium' 
                                : 'text-muted-foreground'
                          }`}>
                            {conversation.lastMessage.content}
                          </div>
                          <div className={`text-xs ${isSelected ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                            {otherUser.major}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Message View */}
        <div className="flex-1 flex flex-col">
          {selectedConversationData ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage 
                      src={getOtherParticipant(selectedConversationData)?.avatar} 
                      alt={getOtherParticipant(selectedConversationData)?.name} 
                    />
                    <AvatarFallback>
                      {getOtherParticipant(selectedConversationData)?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {getOtherParticipant(selectedConversationData)?.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {getOtherParticipant(selectedConversationData)?.major}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedMessages.map((message) => {
                  const isOwn = message.senderId === user.id;
                  const sender = getUserById(message.senderId);

                  return (
                    <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
                        {!isOwn && (
                          <div className="flex items-center gap-2 mb-1">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={sender?.avatar} alt={sender?.name} />
                              <AvatarFallback className="text-xs">
                                {sender?.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{sender?.name}</span>
                          </div>
                        )}
                        <div
                          className={`p-3 rounded-lg ${
                            isOwn
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <div className="text-sm">{message.content}</div>
                        </div>
                        <div className={`text-xs text-muted-foreground mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
                          {new Date(message.createdAt).toLocaleTimeString('ja-JP', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                          {isOwn && (
                            <span className="ml-1">
                              {message.read ? '既読' : '未読'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="メッセージを入力..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="text-lg font-medium">会話を選択してください</h3>
                  <p className="text-muted-foreground">
                    左側の一覧から会話を選択してメッセージを確認できます
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}