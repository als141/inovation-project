'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Smile, Phone, Video, MoreVertical, Search, ArrowLeft, Check, CheckCheck, Camera, Plus, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { mockConversations, mockMessages, mockUsers } from '@/lib/mock-data';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import type { Conversation, Message, User } from '@/types';

export default function MessagesPage() {
  const { user } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [attachmentMenu, setAttachmentMenu] = useState(false);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // メッセージ自動スクロール用のuseEffect
  useEffect(() => {
    if (user && selectedConversation) {
      const conversationMessages = messages.filter(message => message.conversationId === selectedConversation);
      if (conversationMessages.length > 0) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [selectedConversation, user, messages]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-6">
            <div className="text-4xl mb-4">💬</div>
            <h1 className="text-xl font-semibold mb-2">メッセージを利用するには</h1>
            <p className="text-muted-foreground">ログインが必要です</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getUserById = (userId: string): User | undefined => {
    return mockUsers.find(u => u.id === userId);
  };

  const getOtherParticipant = (conversation: Conversation): User | undefined => {
    const otherUserId = conversation.participants.find(id => id !== user.id);
    return otherUserId ? getUserById(otherUserId) : undefined;
  };

  const getConversationMessages = (conversationId: string): Message[] => {
    return messages.filter(message => message.conversationId === conversationId);
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

  const otherUser = selectedConversationData ? getOtherParticipant(selectedConversationData) : null;

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !user || isLoading) return;
    
    const messageContent = newMessage.trim();
    setNewMessage('');
    setIsLoading(true);

    // ユーザーのメッセージを追加
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConversation,
      senderId: user.id,
      receiverId: otherUser?.id || '',
      content: messageContent,
      type: 'text',
      read: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // 佐藤花子（ID: '2'）との会話の場合のみAIレスポンスを生成
    if (otherUser?.id === '2') {
      try {
        setIsTyping(true);
        
        const conversationMessages = getConversationMessages(selectedConversation);
        const allMessages = [...conversationMessages, userMessage];
        
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: allMessages,
            currentUserId: user.id,
            targetUserId: otherUser.id,
          }),
        });

        if (!response.ok) {
          throw new Error('API通信エラー');
        }

        const data = await response.json();
        
        if (data.success) {
          // AIのレスポンスメッセージを追加
          const aiMessage: Message = {
            id: `msg-${Date.now()}-ai`,
            conversationId: selectedConversation,
            senderId: otherUser.id,
            receiverId: user.id,
            content: data.message,
            type: 'text',
            read: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          setMessages(prev => [...prev, aiMessage]);
        }
      } catch (error) {
        console.error('AI通信エラー:', error);
        // エラーメッセージを表示
        const errorMessage: Message = {
          id: `msg-${Date.now()}-error`,
          conversationId: selectedConversation,
          senderId: otherUser.id,
          receiverId: user.id,
          content: '申し訳ありません。少し時間をおいてから再度お試しください🙏',
          type: 'text',
          read: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversation(conversationId);
    setShowMobileChat(true);
  };

  const handleBackToList = () => {
    setShowMobileChat(false);
    setSelectedConversation(null);
  };

  const formatMessageTime = (date: Date) => {
    const now = new Date();
    const messageDate = new Date(date);
    
    if (now.toDateString() === messageDate.toDateString()) {
      return messageDate.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
    } else {
      return formatDistanceToNow(messageDate, { addSuffix: true, locale: ja });
    }
  };

  const MessageBubble = ({ message }: { message: Message }) => {
    const isOwn = message.senderId === user.id;
    const sender = getUserById(message.senderId);

    return (
      <div className={cn("flex mb-3", isOwn ? "justify-end" : "justify-start")}>
        <div className={cn("max-w-[80%] md:max-w-[70%]", isOwn ? "ml-12" : "mr-12")}>
          {!isOwn && (
            <div className="flex items-center gap-2 mb-1 px-1">
              <Avatar className="h-5 w-5">
                <AvatarImage src={sender?.avatar} alt={sender?.name} />
                <AvatarFallback className="text-xs">
                  {sender?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium text-muted-foreground">{sender?.name}</span>
            </div>
          )}
          <div className="group">
            <div
              className={cn(
                "rounded-lg px-3 py-2 text-sm transition-all duration-200",
                isOwn
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              <div className="leading-relaxed whitespace-pre-wrap">
                {message.content}
              </div>
            </div>
            <div className={cn(
              "flex items-center gap-1 mt-1 px-1 text-xs text-muted-foreground",
              isOwn ? "justify-end" : "justify-start"
            )}>
              <span>{formatMessageTime(message.createdAt)}</span>
              {isOwn && (
                <div className="flex items-center ml-1">
                  {message.read ? (
                    <CheckCheck className="h-3 w-3 text-primary" />
                  ) : (
                    <Check className="h-3 w-3" />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ConversationItem = ({ conversation }: { conversation: Conversation }) => {
    const otherUser = getOtherParticipant(conversation);
    if (!otherUser) return null;

    const isSelected = selectedConversation === conversation.id;
    const isUnread = conversation.unreadCount > 0;

    return (
      <button
        className={cn(
          "w-full p-3 text-left transition-colors rounded-lg",
          isSelected 
            ? "bg-accent" 
            : "hover:bg-accent/50"
        )}
        onClick={() => handleConversationSelect(conversation.id)}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-12 w-12">
              <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
              <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className={cn(
                "font-medium truncate",
                isUnread ? "font-semibold" : ""
              )}>
                {otherUser.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {formatMessageTime(conversation.lastMessage.createdAt)}
                </span>
                {isUnread && (
                  <Badge variant="default" className="h-5 w-5 p-0 text-xs rounded-full">
                    {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
            <p className={cn(
              "text-sm truncate",
              isUnread ? "font-medium" : "text-muted-foreground"
            )}>
              {conversation.lastMessage.content}
            </p>
            <div className="text-xs text-muted-foreground mt-1">
              {otherUser.major}
            </div>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div>
      {/* デスクトップ版 */}
      <div className="hidden lg:grid lg:grid-cols-[400px_1fr] gap-6 h-[calc(100vh-8rem)]">
        {/* 会話一覧 */}
        <Card className="flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-xl font-semibold">メッセージ</h1>
              <Button variant="ghost" size="icon">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            
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
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-2">
            {filteredConversations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <div className="text-4xl mb-4">💬</div>
                <p>{searchTerm ? '検索結果がありません' : 'まだ会話がありません'}</p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredConversations.map((conversation) => (
                  <ConversationItem key={conversation.id} conversation={conversation} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* メッセージエリア */}
        <Card className="flex flex-col h-full">
          {selectedConversationData && otherUser ? (
            <>
              {/* チャットヘッダー - 固定 */}
              <CardHeader className="flex-shrink-0 pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
                        <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-semibold">{otherUser.name}</h2>
                        {otherUser.id === '2' && (
                          <Badge variant="secondary" className="text-xs px-2 py-0.5">
                            🤖 AI
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {isTyping ? (
                          <span className="flex items-center gap-1">
                            <span>入力中</span>
                            <div className="flex space-x-1">
                              <div className="h-1 w-1 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                              <div className="h-1 w-1 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                              <div className="h-1 w-1 bg-current rounded-full animate-bounce"></div>
                            </div>
                          </span>
                        ) : (
                          `オンライン • ${otherUser.major}${otherUser.id === '2' ? ' • AI会話対応' : ''}`
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* メッセージエリア - スクロール可能 */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-2">
                  {selectedMessages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg px-3 py-2">
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* メッセージ入力エリア - 固定 */}
              <div className="flex-shrink-0 p-4 border-t bg-card">
                {attachmentMenu && (
                  <div className="mb-4 p-3 bg-accent rounded-lg">
                    <div className="grid grid-cols-4 gap-3">
                      <Button variant="ghost" size="sm" className="flex flex-col h-auto py-3">
                        <Camera className="h-6 w-6 mb-1" />
                        <span className="text-xs">カメラ</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex flex-col h-auto py-3">
                        <ImageIcon className="h-6 w-6 mb-1" />
                        <span className="text-xs">画像</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex flex-col h-auto py-3">
                        <Paperclip className="h-6 w-6 mb-1" />
                        <span className="text-xs">ファイル</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="flex flex-col h-auto py-3"
                        onClick={() => setAttachmentMenu(false)}
                      >
                        <X className="h-6 w-6 mb-1" />
                        <span className="text-xs">閉じる</span>
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="flex items-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setAttachmentMenu(!attachmentMenu)}
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                  
                  <div className="flex-1 relative">
                    <Input
                      type="text"
                      placeholder="メッセージを入力..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="pr-20"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Smile className="h-4 w-4" />
                      </Button>
                                          <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || isLoading}
                      size="icon"
                      className="h-8 w-8"
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                    </div>
                  </div>
                </div>
                
                {newMessage && (
                  <div className="text-xs text-muted-foreground mt-2">
                    入力中...
                  </div>
                )}
              </div>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="text-6xl mb-4">💬</div>
                <h2 className="text-xl font-semibold mb-2">
                  会話を選択してください
                </h2>
                <p className="text-muted-foreground">
                  左側の一覧から会話を選択して、メッセージのやり取りを始めましょう
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* モバイル版 */}
      <div className="lg:hidden">
        {!showMobileChat ? (
          /* 会話一覧 */
          <Card className="flex flex-col h-[calc(100vh-8rem)]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-3">
                <h1 className="text-xl font-semibold">メッセージ</h1>
                <Button variant="ghost" size="icon">
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
              
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
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-2">
              {filteredConversations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <div className="text-4xl mb-4">💬</div>
                  <p>{searchTerm ? '検索結果がありません' : 'まだ会話がありません'}</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredConversations.map((conversation) => (
                    <ConversationItem key={conversation.id} conversation={conversation} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          /* メッセージ画面 - スマホ用完全固定レイアウト */
          <div className="fixed inset-0 bg-background flex flex-col" style={{ top: '4rem', bottom: '4rem' }}>
            {selectedConversationData && otherUser ? (
              <>
                {/* ヘッダー - 完全固定 */}
                <div className="flex-shrink-0 p-4 border-b bg-background">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={handleBackToList}
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </Button>
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
                          <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-background"></div>
                      </div>
                                             <div>
                         <div className="flex items-center gap-2">
                           <h2 className="font-semibold">{otherUser.name}</h2>
                           {otherUser.id === '2' && (
                             <Badge variant="secondary" className="text-xs px-2 py-0.5">
                               🤖 AI
                             </Badge>
                           )}
                         </div>
                         <div className="text-sm text-muted-foreground">
                           {isTyping ? (
                             <span className="flex items-center gap-1">
                               <span>入力中</span>
                               <div className="flex space-x-1">
                                 <div className="h-1 w-1 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                 <div className="h-1 w-1 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                 <div className="h-1 w-1 bg-current rounded-full animate-bounce"></div>
                               </div>
                             </span>
                           ) : (
                             `オンライン • ${otherUser.major}${otherUser.id === '2' ? ' • AI会話対応' : ''}`
                           )}
                         </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon">
                        <Phone className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Video className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* メッセージエリア - スクロール可能 */}
                <div className="flex-1 overflow-y-auto p-4 bg-muted/20">
                  <div className="space-y-2">
                    {selectedMessages.map((message) => (
                      <MessageBubble key={message.id} message={message} />
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted rounded-lg px-3 py-2">
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* 入力エリア - 完全固定 */}
                <div className="flex-shrink-0 p-4 border-t bg-background">
                  {attachmentMenu && (
                    <div className="mb-4 p-3 bg-accent rounded-lg">
                      <div className="grid grid-cols-4 gap-3">
                        <Button variant="ghost" size="sm" className="flex flex-col h-auto py-3">
                          <Camera className="h-6 w-6 mb-1" />
                          <span className="text-xs">カメラ</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex flex-col h-auto py-3">
                          <ImageIcon className="h-6 w-6 mb-1" />
                          <span className="text-xs">画像</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="flex flex-col h-auto py-3">
                          <Paperclip className="h-6 w-6 mb-1" />
                          <span className="text-xs">ファイル</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex flex-col h-auto py-3"
                          onClick={() => setAttachmentMenu(false)}
                        >
                          <X className="h-6 w-6 mb-1" />
                          <span className="text-xs">閉じる</span>
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setAttachmentMenu(!attachmentMenu)}
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                    
                    <div className="flex-1 relative">
                      <Input
                        type="text"
                        placeholder="メッセージを入力..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pr-20"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Smile className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim() || isLoading}
                          size="icon"
                          className="h-8 w-8"
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {newMessage && (
                    <div className="text-xs text-muted-foreground mt-2">
                      入力中...
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*,video/*,.pdf,.doc,.docx"
        multiple
      />
    </div>
  );
}