'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Building, Calendar, TrendingUp } from 'lucide-react';

export default function CareerPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">就活</h1>
          <p className="text-muted-foreground">
            就職活動を成功に導くための情報とサポートを提供します！
          </p>
        </div>
        <Button>
          <Briefcase className="h-4 w-4 mr-2" />
          プロフィール設定
        </Button>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg text-white p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">就活サポート</h2>
            <p className="text-gray-200 mb-4">
              企業情報、インターンシップ、就活イベントなど、就職活動に必要な情報をまとめて提供。
            </p>
            <Button variant="secondary">
              企業を探す
            </Button>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">150+</div>
            <div className="text-gray-200">参加企業</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">企業数</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                <Building className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">求人数</p>
                <p className="text-2xl font-bold">89</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <Briefcase className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">今月のイベント</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">内定率</p>
                <p className="text-2xl font-bold">78%</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon */}
      <Card>
        <CardHeader>
          <CardTitle>就活セクション - 開発中</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 space-y-4">
            <div className="text-4xl">🚧</div>
            <h3 className="text-lg font-semibold">就活セクションは現在開発中です</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              企業情報、求人検索、説明会予約、インターンシップ情報など、就職活動をサポートする機能を準備中です。
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="outline">企業検索</Badge>
              <Badge variant="outline">求人情報</Badge>
              <Badge variant="outline">説明会予約</Badge>
              <Badge variant="outline">インターンシップ</Badge>
              <Badge variant="outline">OB/OG情報</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}