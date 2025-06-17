'use client';

import { useAuth } from '@/context/AuthContext';
import { useTokens } from '@/context/TokenContext';
import { StatCard } from '@/components/common/StatCard';
import { ActivityFeed } from '@/components/common/ActivityFeed';
import { QuickActions } from '@/components/common/QuickActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  mockActivities, 
  mockUsers, 
  mockUpcomingEvents, 
  mockSportsEvents, 
  mockMenuItems,
  mockMarketItems,
  mockResearchPapers 
} from '@/lib/mock-data';
import { 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  Clock,
  Trophy,
  Utensils,
  ShoppingBag,
  BookOpen,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { user } = useAuth();
  const { balance } = useTokens();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ログインが必要です</h1>
          <p className="text-muted-foreground">
            コミュニティ掲示板システムをご利用いただくにはログインしてください。
          </p>
        </div>
      </div>
    );
  }

  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'おはようございます';
    if (currentHour < 18) return 'こんにちは';
    return 'こんばんは';
  };

  const quickStats = {
    unreadMessages: 3,
    activeApplications: 2,
    upcomingDeadlines: 1,
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {getGreeting()}、{user.name}さん！
            </h1>
            <p className="text-blue-100 mt-1">
              今日も素晴らしい一日になりそうですね
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{balance}</div>
            <div className="text-blue-100 text-sm">トークン</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="未読メッセージ"
          value={quickStats.unreadMessages}
          icon={MessageSquare}
          color="blue"
          description="新しいメッセージがあります"
        />
        <StatCard
          title="今日の予定"
          value={mockUpcomingEvents.length}
          icon={Calendar}
          color="green"
          description="今日のイベント"
        />
        <StatCard
          title="応募中"
          value={quickStats.activeApplications}
          icon={TrendingUp}
          color="purple"
          description="就活応募状況"
        />
        <StatCard
          title="締切間近"
          value={quickStats.upcomingDeadlines}
          icon={Clock}
          color="orange"
          description="要注意の締切"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activities */}
          <ActivityFeed 
            activities={mockActivities.slice(0, 8)} 
            users={mockUsers}
            title="最近のアクティビティ"
          />

          {/* Today's Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">今日の予定</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockUpcomingEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {event.location} • {event.date.toLocaleTimeString('ja-JP', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {event.type === 'sports' ? 'スポーツ' : 
                       event.type === 'career' ? '就活' : event.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <QuickActions />

          {/* Section Highlights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">セクション別ハイライト</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/sports" className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Trophy className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">スポーツ</div>
                    <div className="text-xs text-muted-foreground">
                      {mockSportsEvents.filter(e => e.status === 'upcoming').length}件の新着イベント
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">{mockSportsEvents.length}</Badge>
              </Link>

              <Link href="/food" className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Utensils className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">ごはん</div>
                    <div className="text-xs text-muted-foreground">
                      今日のメニュー{mockMenuItems.length}品
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">{mockMenuItems.length}</Badge>
              </Link>

              <Link href="/marketplace" className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <ShoppingBag className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">フリマ</div>
                    <div className="text-xs text-muted-foreground">
                      新着商品{mockMarketItems.length}件
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">{mockMarketItems.length}</Badge>
              </Link>

              <Link href="/research" className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <BookOpen className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">研究</div>
                    <div className="text-xs text-muted-foreground">
                      新着論文{mockResearchPapers.length}件
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">{mockResearchPapers.length}</Badge>
              </Link>

              <Link href="/career" className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Briefcase className="h-4 w-4 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">就活</div>
                    <div className="text-xs text-muted-foreground">
                      新着求人情報
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">2</Badge>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
