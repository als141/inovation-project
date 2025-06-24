'use client';

import { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp, Calendar, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { mockTokenRankings, mockUsers } from '@/lib/mock-data';
import { TOKEN_REWARDS } from '@/lib/constants';

export default function RankingPage() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState<'total' | 'monthly' | 'weekly'>('total');

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-bold">{rank}</div>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600';
      default:
        return 'bg-gradient-to-r from-blue-400 to-blue-600';
    }
  };

  const getTokensForPeriod = (ranking: typeof mockTokenRankings[0]) => {
    switch (selectedPeriod) {
      case 'monthly':
        return ranking.monthlyTokens;
      case 'weekly':
        return ranking.weeklyTokens;
      default:
        return ranking.totalTokens;
    }
  };

  const currentUserRanking = mockTokenRankings.find(r => r.user.id === user?.id);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ログインが必要です</h1>
          <p className="text-muted-foreground">
            ランキングを確認するにはログインしてください。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">トークンランキング</h1>
        <p className="text-muted-foreground">
          コミュニティ活動でトークンを獲得して上位を目指そう！
        </p>
      </div>

      {/* Current User Stats */}
      {currentUserRanking && (
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getRankIcon(currentUserRanking.rank)}
                  <span className="text-2xl font-bold">#{currentUserRanking.rank}</span>
                </div>
                <div>
                  <div className="font-medium">あなたの順位</div>
                  <div className="text-blue-100 text-sm">
                    総獲得トークン: {currentUserRanking.totalTokens}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{user.tokens}</div>
                <div className="text-blue-100 text-sm">現在のトークン</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="ranking" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ranking">ランキング</TabsTrigger>
          <TabsTrigger value="rewards">報酬一覧</TabsTrigger>
          <TabsTrigger value="achievements">実績</TabsTrigger>
        </TabsList>

        <TabsContent value="ranking" className="space-y-6">
          {/* Period Selection */}
          <div className="flex justify-center gap-2">
            <Button
              variant={selectedPeriod === 'total' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod('total')}
            >
              総合
            </Button>
            <Button
              variant={selectedPeriod === 'monthly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod('monthly')}
            >
              今月
            </Button>
            <Button
              variant={selectedPeriod === 'weekly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod('weekly')}
            >
              今週
            </Button>
          </div>

          {/* Top 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockTokenRankings.slice(0, 3).map((ranking) => (
              <Card key={ranking.user.id} className="relative overflow-hidden">
                <div className={`absolute top-0 left-0 right-0 h-1 ${getRankColor(ranking.rank)}`} />
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex justify-center">
                    {getRankIcon(ranking.rank)}
                  </div>
                  <Avatar className="h-16 w-16 mx-auto">
                    <AvatarImage src={ranking.user.avatar} alt={ranking.user.name} />
                    <AvatarFallback className="text-lg">
                      {ranking.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-lg">{ranking.user.name}</div>
                    <div className="text-sm text-muted-foreground">{ranking.user.major}</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {getTokensForPeriod(ranking)}
                    </div>
                    <div className="text-sm text-muted-foreground">トークン</div>
                  </div>
                  {ranking.achievements.length > 0 && (
                    <div className="flex justify-center gap-1">
                      {ranking.achievements.slice(0, 3).map((achievement) => (
                        <div key={achievement.id} className="text-lg" title={achievement.title}>
                          {achievement.icon}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Rest of Rankings */}
          <Card>
            <CardHeader>
              <CardTitle>4位以下</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTokenRankings.slice(3).map((ranking) => (
                  <div key={ranking.user.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 min-w-[60px]">
                        {getRankIcon(ranking.rank)}
                        <span className="font-bold">#{ranking.rank}</span>
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={ranking.user.avatar} alt={ranking.user.name} />
                        <AvatarFallback>{ranking.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{ranking.user.name}</div>
                        <div className="text-sm text-muted-foreground">{ranking.user.major}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {ranking.achievements.length > 0 && (
                        <div className="flex gap-1">
                          {ranking.achievements.slice(0, 2).map((achievement) => (
                            <span key={achievement.id} className="text-sm" title={achievement.title}>
                              {achievement.icon}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="text-right">
                        <div className="font-bold text-lg">{getTokensForPeriod(ranking)}</div>
                        <div className="text-sm text-muted-foreground">トークン</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>トークン獲得方法</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-medium">デイリーログイン</span>
                    </div>
                    <Badge variant="secondary">+{TOKEN_REWARDS.DAILY_LOGIN}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="font-medium">投稿作成</span>
                    </div>
                    <Badge variant="secondary">+{TOKEN_REWARDS.POST_CREATION}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Star className="h-4 w-4 text-purple-600" />
                      </div>
                      <span className="font-medium">コメント投稿</span>
                    </div>
                    <Badge variant="secondary">+{TOKEN_REWARDS.COMMENT}</Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Star className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="font-medium">レビュー投稿</span>
                    </div>
                    <Badge variant="secondary">+{TOKEN_REWARDS.REVIEW}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Trophy className="h-4 w-4 text-red-600" />
                      </div>
                      <span className="font-medium">イベント参加</span>
                    </div>
                    <Badge variant="secondary">+{TOKEN_REWARDS.EVENT_PARTICIPATION}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Award className="h-4 w-4 text-yellow-600" />
                      </div>
                      <span className="font-medium">質問回答（ベストアンサー）</span>
                    </div>
                    <Badge variant="secondary">+{TOKEN_REWARDS.BEST_ANSWER}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTokenRankings[0].achievements.map((achievement) => (
              <Card key={achievement.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="text-4xl">{achievement.icon}</div>
                  <div>
                    <div className="font-bold text-lg">{achievement.title}</div>
                    <div className="text-sm text-muted-foreground">{achievement.description}</div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`
                      ${achievement.rarity === 'common' ? 'border-gray-300 text-gray-600' : ''}
                      ${achievement.rarity === 'uncommon' ? 'border-green-300 text-green-600' : ''}
                      ${achievement.rarity === 'rare' ? 'border-blue-300 text-blue-600' : ''}
                      ${achievement.rarity === 'epic' ? 'border-purple-300 text-purple-600' : ''}
                      ${achievement.rarity === 'legendary' ? 'border-yellow-300 text-yellow-600' : ''}
                    `}
                  >
                    {achievement.rarity === 'common' && 'コモン'}
                    {achievement.rarity === 'uncommon' && 'アンコモン'}
                    {achievement.rarity === 'rare' && 'レア'}
                    {achievement.rarity === 'epic' && 'エピック'}
                    {achievement.rarity === 'legendary' && 'レジェンダリー'}
                  </Badge>
                  <div className="text-xs text-muted-foreground">
                    {achievement.requirement}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}