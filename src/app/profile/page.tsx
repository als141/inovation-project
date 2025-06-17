'use client';

import { useAuth } from '@/context/AuthContext';
import { useTokens } from '@/context/TokenContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  GraduationCap, 
  Calendar,
  Coins,
  Trophy,
  Star,
  MessageSquare,
  FileText,
  Settings
} from 'lucide-react';
import Link from 'next/link';
import { mockAchievements } from '@/lib/mock-data';

export default function ProfilePage() {
  const { user } = useAuth();
  const { balance, transactions } = useTokens();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ログインが必要です</h1>
          <p className="text-muted-foreground">
            プロフィールを表示するにはログインしてください。
          </p>
        </div>
      </div>
    );
  }

  const activityStats = {
    postsCount: 23,
    commentsCount: 87,
    eventsAttended: 12,
    itemsSold: 3,
    reviewsWritten: 15,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">プロフィール</h1>
        <Button asChild>
          <Link href="/settings">
            <Settings className="h-4 w-4 mr-2" />
            設定
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-2xl">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.major}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.studentId}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.year}年生</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {new Date(user.createdAt).toLocaleDateString('ja-JP')} 登録
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-center gap-2 p-3 bg-amber-50 rounded-lg">
                  <Coins className="h-5 w-5 text-amber-600" />
                  <span className="font-semibold text-amber-800">
                    {balance} トークン
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>獲得バッジ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {mockAchievements.slice(0, 4).map((achievement) => (
                  <div key={achievement.id} className="text-center p-3 border rounded-lg">
                    <div className="text-2xl mb-1">{achievement.icon}</div>
                    <div className="text-xs font-medium">{achievement.title}</div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                すべてのバッジを見る
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Activity Stats */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>アクティビティ統計</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold">{activityStats.postsCount}</div>
                  <div className="text-sm text-muted-foreground">投稿数</div>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-2">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold">{activityStats.commentsCount}</div>
                  <div className="text-sm text-muted-foreground">コメント数</div>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-2">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold">{activityStats.eventsAttended}</div>
                  <div className="text-sm text-muted-foreground">参加イベント</div>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-2">
                    <Star className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold">{activityStats.reviewsWritten}</div>
                  <div className="text-sm text-muted-foreground">レビュー数</div>
                </div>
                <div className="text-center">
                  <div className="h-12 w-12 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-2">
                    <Badge className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold">{activityStats.itemsSold}</div>
                  <div className="text-sm text-muted-foreground">販売実績</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>最近のトークン履歴</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">{transaction.reason}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(transaction.createdAt).toLocaleDateString('ja-JP')}
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      transaction.type === 'earn' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'earn' ? '+' : '-'}{transaction.amount}
                    </div>
                  </div>
                ))}
              </div>
              {transactions.length > 5 && (
                <Button variant="outline" size="sm" className="w-full mt-4">
                  すべての履歴を見る
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}