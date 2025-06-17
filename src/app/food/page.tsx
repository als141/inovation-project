'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Star, Clock, MapPin, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  mockMenuItems, 
  mockReviews, 
  mockMealInvitations,
  mockUsers 
} from '@/lib/mock-data';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function FoodPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'すべて' },
    { id: 'japanese', name: '和食' },
    { id: 'western', name: '洋食' },
    { id: 'chinese', name: '中華' },
  ];

  const filteredMenuItems = selectedCategory === 'all' 
    ? mockMenuItems 
    : mockMenuItems.filter(item => item.category === selectedCategory);

  const getUserById = (userId: string) => {
    return mockUsers.find(user => user.id === userId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ごはん</h1>
          <p className="text-muted-foreground">
            美味しい食事の情報を共有して、みんなで楽しい食事タイムを！
          </p>
        </div>
        <Button asChild>
          <Link href="/food/review">
            <Plus className="h-4 w-4 mr-2" />
            レビュー投稿
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg text-white p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">今日のおすすめ</h2>
            <p className="text-green-100 mb-4">
              学食Aの唐揚げ定食が大人気！レビュー平均4.2★
            </p>
            <Button variant="secondary" asChild>
              <Link href="/food/menu/1">詳細を見る</Link>
            </Button>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{mockMenuItems.length}</div>
            <div className="text-green-100">今日のメニュー</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="menu" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="menu">今日のメニュー</TabsTrigger>
          <TabsTrigger value="reviews">レビュー</TabsTrigger>
          <TabsTrigger value="invitations">食事の誘い</TabsTrigger>
          <TabsTrigger value="random">ランダム席</TabsTrigger>
        </TabsList>

        <TabsContent value="menu" className="space-y-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenuItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{item.restaurant}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.name}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover"
                      onError={() => {}}
                    />
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">
                      ¥{item.price}
                    </div>
                    <Button size="sm" asChild>
                      <Link href={`/food/menu/${item.id}`}>詳細</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <div className="space-y-4">
            {mockReviews.map((review) => {
              const author = getUserById(review.authorId);
              const menuItem = mockMenuItems.find(item => item.id === review.menuItemId);
              
              if (!author || !menuItem) return null;

              return (
                <Card key={review.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={author.avatar} alt={author.name} />
                          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{author.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(review.createdAt), { 
                              addSuffix: true, 
                              locale: ja 
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < review.rating 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium">{menuItem.name}</h4>
                        <p className="text-sm text-muted-foreground">{menuItem.restaurant}</p>
                      </div>
                      <p className="text-sm">{review.comment}</p>
                      {review.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {review.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>参考になった: {review.helpful}人</span>
                        <Button variant="ghost" size="sm">
                          参考になった
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="invitations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockMealInvitations.map((invitation) => {
              const author = getUserById(invitation.authorId);
              if (!author) return null;

              return (
                <Card key={invitation.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={author.avatar} alt={author.name} />
                          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-lg">{author.name}</CardTitle>
                      </div>
                      <Badge variant={invitation.status === 'open' ? 'default' : 'secondary'}>
                        {invitation.status === 'open' ? '募集中' : '締切'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {invitation.datetime.toLocaleDateString('ja-JP')} {invitation.datetime.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{invitation.restaurant}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{invitation.currentPeople}/{invitation.maxPeople}名</span>
                      </div>
                    </div>

                    <p className="text-sm">{invitation.message}</p>

                    {invitation.participants.length > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {invitation.participants.slice(0, 3).map((participant) => (
                            <Avatar key={participant.id} className="h-6 w-6 border-2 border-background">
                              <AvatarImage src={participant.avatar} alt={participant.name} />
                              <AvatarFallback className="text-xs">
                                {participant.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">参加予定</span>
                      </div>
                    )}

                    <Button 
                      className="w-full" 
                      size="sm"
                      disabled={invitation.status !== 'open' || invitation.currentPeople >= invitation.maxPeople}
                    >
                      {invitation.status !== 'open' ? '締切済み' : 
                       invitation.currentPeople >= invitation.maxPeople ? '満員' : '参加する'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="random" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ランダム席機能</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  ランダムに学食の席を決めて、新しい出会いを楽しもう！
                </p>
                <div className="bg-muted rounded-lg p-8">
                  <div className="text-4xl font-bold text-primary mb-2">
                    テーブル 7
                  </div>
                  <div className="text-muted-foreground">
                    学食A 窓際の席
                  </div>
                </div>
                <Button size="lg" className="w-full max-w-sm">
                  もう一度ランダム
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}