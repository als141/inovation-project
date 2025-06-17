'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Calendar, MapPin, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  mockSportsEvents, 
  mockTournaments, 
  mockSports
} from '@/lib/mock-data';
import { useNotifications } from '@/context/NotificationContext';

export default function SportsPage() {
  const { addNotification } = useNotifications();
  const [selectedSport, setSelectedSport] = useState<string>('all');

  const handleParticipate = (eventId: string, eventTitle: string) => {
    // 参加処理のシミュレーション
    addNotification({
      type: 'success',
      title: 'イベント参加',
      message: `${eventTitle}への参加が確定しました`,
      read: false,
      actionUrl: `/sports/${eventId}`,
    });
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSkillLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner': return '初心者';
      case 'intermediate': return '中級者';
      case 'advanced': return '上級者';
      default: return level;
    }
  };

  const filteredEvents = selectedSport === 'all' 
    ? mockSportsEvents 
    : mockSportsEvents.filter(event => event.sport === selectedSport);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">スポーツ</h1>
          <p className="text-muted-foreground">
            スポーツイベントに参加して、健康的な学生生活を送ろう！
          </p>
        </div>
        <Button asChild>
          <Link href="/sports/create">
            <Plus className="h-4 w-4 mr-2" />
            新規イベント作成
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">今週のハイライト</h2>
            <p className="text-orange-100 mb-4">
              バスケットボール定期戦開催！初心者も大歓迎です。
            </p>
            <Button variant="secondary" asChild>
              <Link href="/sports/1">詳細を見る</Link>
            </Button>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{mockSportsEvents.length}</div>
            <div className="text-orange-100">開催予定イベント</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="events" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="events">イベント</TabsTrigger>
          <TabsTrigger value="tournaments">大会</TabsTrigger>
          <TabsTrigger value="rankings">ランキング</TabsTrigger>
          <TabsTrigger value="facilities">施設情報</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedSport === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSport('all')}
            >
              すべて
            </Button>
            {mockSports.map((sport) => (
              <Button
                key={sport.id}
                variant={selectedSport === sport.name ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSport(sport.name)}
              >
                {sport.name}
              </Button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="secondary" 
                      className={getSkillLevelColor(event.skillLevel)}
                    >
                      {getSkillLevelLabel(event.skillLevel)}
                    </Badge>
                    <Badge variant="outline">
                      {event.sport}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {event.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {event.date.toLocaleDateString('ja-JP')} {event.date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>
                        {event.currentParticipants.length}/{event.maxParticipants}名
                      </span>
                    </div>
                  </div>

                  {/* Participants */}
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {event.currentParticipants.slice(0, 3).map((participant) => (
                        <Avatar key={participant.id} className="h-6 w-6 border-2 border-background">
                          <AvatarImage src={participant.avatar} alt={participant.name} />
                          <AvatarFallback className="text-xs">
                            {participant.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {event.currentParticipants.length > 3 && (
                        <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                          <span className="text-xs font-medium">
                            +{event.currentParticipants.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      参加者
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1" 
                      size="sm"
                      onClick={() => handleParticipate(event.id, event.title)}
                      disabled={event.currentParticipants.length >= event.maxParticipants}
                    >
                      {event.currentParticipants.length >= event.maxParticipants ? '満員' : '参加する'}
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/sports/${event.id}`}>詳細</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tournaments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockTournaments.map((tournament) => (
              <Card key={tournament.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{tournament.name}</CardTitle>
                    <Badge variant={tournament.status === 'registration' ? 'default' : 'secondary'}>
                      {tournament.status === 'registration' ? '募集中' : tournament.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">競技</div>
                      <div className="font-medium">{tournament.sport}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">チーム数</div>
                      <div className="font-medium">{tournament.currentTeams}/{tournament.maxTeams}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">開始日</div>
                      <div className="font-medium">
                        {tournament.startDate.toLocaleDateString('ja-JP')}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">申込締切</div>
                      <div className="font-medium">
                        {tournament.registrationDeadline.toLocaleDateString('ja-JP')}
                      </div>
                    </div>
                  </div>
                  <Button className="w-full" size="sm">
                    {tournament.status === 'registration' ? 'チーム登録' : '詳細を見る'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rankings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>スポーツ別参加者ランキング</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSports.slice(0, 5).map((sport, index) => (
                  <div key={sport.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{sport.name}</div>
                        <div className="text-sm text-muted-foreground">{sport.category}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{sport.participants}人</div>
                      <div className="text-sm text-muted-foreground">{sport.difficulty}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facilities" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>第一体育館</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">利用可能時間</span>
                    <span>9:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">収容人数</span>
                    <span>200名</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">設備</span>
                    <span>バスケットコート2面</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="default">利用可能</Badge>
                  <Badge variant="outline">予約制</Badge>
                </div>
                <Button size="sm" className="w-full">予約する</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>グラウンド</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">利用可能時間</span>
                    <span>8:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">面積</span>
                    <span>100m × 60m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">設備</span>
                    <span>サッカー・野球可</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge variant="destructive">利用中</Badge>
                  <Badge variant="outline">予約制</Badge>
                </div>
                <Button size="sm" className="w-full" disabled>
                  利用中（16:00まで）
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}