'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, FileText, HelpCircle } from 'lucide-react';

export default function ResearchPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">研究</h1>
          <p className="text-muted-foreground">
            研究成果を共有し、学術的な議論を通じて知見を深めよう！
          </p>
        </div>
        <Button asChild>
          <Link href="/research/create">
            <FileText className="h-4 w-4 mr-2" />
            論文投稿
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">学術コミュニティ</h2>
            <p className="text-indigo-100 mb-4">
              最新の研究成果や質問を共有して、学問の発展に貢献しましょう。
            </p>
            <Button variant="secondary">
              最新論文を見る
            </Button>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">23</div>
            <div className="text-indigo-100">新着論文</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">論文数</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">研究分野</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                <BookOpen className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">質問数</p>
                <p className="text-2xl font-bold">89</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                <HelpCircle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">参加者</p>
                <p className="text-2xl font-bold">234</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Features */}
      <Card>
        <CardHeader>
          <CardTitle>利用可能な機能</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 space-y-4">
            <div className="text-4xl">📚</div>
            <h3 className="text-lg font-semibold">論文投稿機能が利用可能です</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              研究成果を投稿して学術コミュニティと共有しましょう。複数の公開設定から選択できます。
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="default">論文投稿</Badge>
              <Badge variant="outline">Q&A (準備中)</Badge>
              <Badge variant="outline">ディスカッション (準備中)</Badge>
              <Badge variant="outline">分野別フィルタ (準備中)</Badge>
            </div>
            <Button asChild className="mt-4">
              <Link href="/research/create">
                論文を投稿する
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}