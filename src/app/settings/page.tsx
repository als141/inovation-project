'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Bell, 
  User, 
  Shield, 
  Palette, 
  Globe,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const { logout } = useAuth();
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      sports: true,
      food: true,
      marketplace: false,
      research: true,
      career: true,
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showStudentId: false,
      showActivity: true,
    },
    appearance: {
      theme: 'light',
      language: 'ja',
      compactMode: false,
    }
  });

  const updateNotificationSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const updatePrivacySetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }));
  };

  const updateAppearanceSetting = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">設定</h1>
        <p className="text-muted-foreground">
          アカウントの設定やプライバシー設定を管理します。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>設定カテゴリ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <div className="flex items-center gap-2 font-medium text-primary">
                  <Bell className="h-4 w-4" />
                  通知設定
                </div>
              </div>
              <div className="p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  プライバシー
                </div>
              </div>
              <div className="p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  外観
                </div>
              </div>
              <div className="p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  アカウント
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                通知設定
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">メール通知</Label>
                    <p className="text-sm text-muted-foreground">重要な通知をメールで受け取る</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={settings.notifications.email}
                    onCheckedChange={(value) => updateNotificationSetting('email', value)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">プッシュ通知</Label>
                    <p className="text-sm text-muted-foreground">ブラウザのプッシュ通知</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={settings.notifications.push}
                    onCheckedChange={(value) => updateNotificationSetting('push', value)}
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-4">セクション別通知</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sports-notifications">スポーツ</Label>
                    <Switch
                      id="sports-notifications"
                      checked={settings.notifications.sports}
                      onCheckedChange={(value) => updateNotificationSetting('sports', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="food-notifications">ごはん</Label>
                    <Switch
                      id="food-notifications"
                      checked={settings.notifications.food}
                      onCheckedChange={(value) => updateNotificationSetting('food', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="marketplace-notifications">フリマ</Label>
                    <Switch
                      id="marketplace-notifications"
                      checked={settings.notifications.marketplace}
                      onCheckedChange={(value) => updateNotificationSetting('marketplace', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="research-notifications">研究</Label>
                    <Switch
                      id="research-notifications"
                      checked={settings.notifications.research}
                      onCheckedChange={(value) => updateNotificationSetting('research', value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="career-notifications">就活</Label>
                    <Switch
                      id="career-notifications"
                      checked={settings.notifications.career}
                      onCheckedChange={(value) => updateNotificationSetting('career', value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                プライバシー設定
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-email">メールアドレスを公開</Label>
                  <p className="text-sm text-muted-foreground">他のユーザーにメールアドレスを表示</p>
                </div>
                <Switch
                  id="show-email"
                  checked={settings.privacy.showEmail}
                  onCheckedChange={(value) => updatePrivacySetting('showEmail', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-student-id">学籍番号を公開</Label>
                  <p className="text-sm text-muted-foreground">プロフィールに学籍番号を表示</p>
                </div>
                <Switch
                  id="show-student-id"
                  checked={settings.privacy.showStudentId}
                  onCheckedChange={(value) => updatePrivacySetting('showStudentId', value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-activity">アクティビティを公開</Label>
                  <p className="text-sm text-muted-foreground">投稿や参加履歴を他のユーザーに表示</p>
                </div>
                <Switch
                  id="show-activity"
                  checked={settings.privacy.showActivity}
                  onCheckedChange={(value) => updatePrivacySetting('showActivity', value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                外観設定
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="compact-mode">コンパクトモード</Label>
                  <p className="text-sm text-muted-foreground">情報を密に表示してスペースを節約</p>
                </div>
                <Switch
                  id="compact-mode"
                  checked={settings.appearance.compactMode}
                  onCheckedChange={(value) => updateAppearanceSetting('compactMode', value)}
                />
              </div>

              <div>
                <Label>テーマ</Label>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm">ライト</Button>
                  <Button variant="outline" size="sm">ダーク</Button>
                  <Button variant="outline" size="sm">システム</Button>
                </div>
              </div>

              <div>
                <Label>言語</Label>
                <div className="flex gap-2 mt-2">
                  <Button variant="default" size="sm">日本語</Button>
                  <Button variant="outline" size="sm">English</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                アカウント設定
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  プロフィール編集
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  パスワード変更
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  データエクスポート
                </Button>
              </div>

              <div className="border-t pt-4">
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  ログアウト
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}