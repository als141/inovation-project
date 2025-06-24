'use client';

import Link from 'next/link';
import { Plus, Search, Calendar, MessageSquare, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}

const quickActions: QuickAction[] = [
  {
    title: 'メッセージ',
    description: 'DMを確認',
    href: '/messages',
    icon: <MessageSquare className="h-5 w-5" />,
    color: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    title: 'ランキング',
    description: 'トークンランキング',
    href: '/ranking',
    icon: <Trophy className="h-5 w-5" />,
    color: 'bg-yellow-500 hover:bg-yellow-600',
  },
  {
    title: '検索',
    description: 'コンテンツを検索',
    href: '/search',
    icon: <Search className="h-5 w-5" />,
    color: 'bg-green-500 hover:bg-green-600',
  },
  {
    title: 'イベント',
    description: 'イベントを確認',
    href: '/events',
    icon: <Calendar className="h-5 w-5" />,
    color: 'bg-purple-500 hover:bg-purple-600',
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">クイックアクション</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.title}
              asChild
              variant="outline"
              className="h-auto p-4 flex-col items-start hover:shadow-md transition-all"
            >
              <Link href={action.href}>
                <div className={`p-2 rounded-lg text-white mb-2 ${action.color}`}>
                  {action.icon}
                </div>
                <div className="text-left">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {action.description}
                  </div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}