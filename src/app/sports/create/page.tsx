'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { useTokens } from '@/context/TokenContext';
import { useNotifications } from '@/context/NotificationContext';
import { SPORTS_CATEGORIES, SKILL_LEVELS } from '@/lib/constants';
import type { SportsEvent } from '@/types';

export default function CreateSportsEventPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { addTokens } = useTokens();
  const { addNotification } = useNotifications();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    sport: '',
    date: '',
    time: '',
    location: '',
    maxParticipants: '10',
    description: '',
    skillLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    equipmentProvided: false,
    registrationDeadline: '',
    contactInfo: '',
  });

  const locations = [
    '第一体育館',
    '第二体育館',
    'グラウンド',
    'テニスコート',
    'プール',
    '武道館',
    'トレーニングルーム',
    '学外施設',
    'その他',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    try {
      // 日時を結合
      const eventDateTime = new Date(`${formData.date}T${formData.time}`);
      
      // モックデータとしてイベントを作成
      const newEvent: Partial<SportsEvent> = {
        id: `event-${Date.now()}`,
        title: formData.title,
        sport: formData.sport,
        date: eventDateTime,
        location: formData.location,
        maxParticipants: parseInt(formData.maxParticipants),
        currentParticipants: [user], // 作成者は自動参加
        description: formData.description,
        skillLevel: formData.skillLevel,
        status: 'upcoming',
      };

      // イベント作成でトークン獲得
      addTokens(10, 'イベント作成');
      
      // 通知を追加
      addNotification({
        type: 'success',
        title: 'イベント作成完了',
        message: `「${formData.title}」のイベントを作成しました`,
        read: false,
        actionUrl: `/sports/${newEvent.id}`,
      });

      // 成功メッセージを表示してリダイレクト
      setTimeout(() => {
        router.push('/sports');
      }, 1000);

    } catch {
      addNotification({
        type: 'error',
        title: '作成エラー',
        message: 'イベントの作成に失敗しました。もう一度お試しください。',
        read: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ログインが必要です</h1>
          <p className="text-muted-foreground">
            イベントを作成するにはログインしてください。
          </p>
        </div>
      </div>
    );
  }

  // 現在時刻以降の日時のみ選択可能にする
  const now = new Date();
  const minDate = now.toISOString().split('T')[0];
  const minTime = formData.date === minDate ? now.toTimeString().slice(0, 5) : '00:00';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">新規イベント作成</h1>
          <p className="text-muted-foreground">
            スポーツイベントを企画して、仲間を集めましょう
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>基本情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">イベント名 *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="例: 平日バスケ練習会"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sport">スポーツ種目 *</Label>
                <Select value={formData.sport} onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, sport: value }))
                } required>
                  <SelectTrigger>
                    <SelectValue placeholder="種目を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {SPORTS_CATEGORIES.map(sport => (
                      <SelectItem key={sport.id} value={sport.id}>
                        {sport.icon} {sport.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skillLevel">レベル *</Label>
                <Select value={formData.skillLevel} onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, skillLevel: value as 'beginner' | 'intermediate' | 'advanced' }))
                } required>
                  <SelectTrigger>
                    <SelectValue placeholder="レベルを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {SKILL_LEVELS.map(level => (
                      <SelectItem key={level.id} value={level.id}>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: level.color }}
                          />
                          {level.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">イベント説明 *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="イベントの詳細、注意事項、持ち物などを記載してください"
                rows={4}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>日時・場所</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">開催日 *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  min={minDate}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">開始時刻 *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  min={minTime}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">開催場所 *</Label>
              <Select value={formData.location} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, location: value }))
              } required>
                <SelectTrigger>
                  <SelectValue placeholder="場所を選択" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {location}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationDeadline">申込締切</Label>
              <Input
                id="registrationDeadline"
                type="datetime-local"
                value={formData.registrationDeadline}
                onChange={(e) => setFormData(prev => ({ ...prev, registrationDeadline: e.target.value }))}
                max={`${formData.date}T${formData.time}`}
              />
              <p className="text-sm text-muted-foreground">
                設定しない場合は、イベント開始時刻まで申込可能です
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>参加者設定</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxParticipants">最大参加者数 *</Label>
              <Input
                id="maxParticipants"
                type="number"
                min="2"
                max="100"
                value={formData.maxParticipants}
                onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: e.target.value }))}
                required
              />
              <p className="text-sm text-muted-foreground">
                主催者を含む総参加者数を設定してください
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactInfo">連絡先情報</Label>
              <Input
                id="contactInfo"
                value={formData.contactInfo}
                onChange={(e) => setFormData(prev => ({ ...prev, contactInfo: e.target.value }))}
                placeholder="例: LINE ID、電話番号、メールアドレス等"
              />
              <p className="text-sm text-muted-foreground">
                参加者が連絡を取れる方法を記載してください（任意）
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>追加情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <div className="font-medium">用具提供</div>
                <div className="text-sm text-muted-foreground">
                  主催者が用具を提供する場合はオンにしてください
                </div>
              </div>
              <Button
                type="button"
                variant={formData.equipmentProvided ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFormData(prev => ({ ...prev, equipmentProvided: !prev.equipmentProvided }))}
              >
                {formData.equipmentProvided ? 'あり' : 'なし'}
              </Button>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-medium text-blue-900">イベント作成について</div>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 作成者は自動的にイベントに参加登録されます</li>
                    <li>• イベント作成で10トークンを獲得できます</li>
                    <li>• 参加者は設定した最大人数まで申し込み可能です</li>
                    <li>• イベント終了後は自動的に「完了」ステータスになります</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => router.back()}
          >
            キャンセル
          </Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={isLoading || !formData.title || !formData.sport || !formData.date || !formData.time || !formData.location || !formData.description}
          >
            {isLoading ? '作成中...' : 'イベントを作成'}
          </Button>
        </div>
      </form>
    </div>
  );
}