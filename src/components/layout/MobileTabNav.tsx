'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Trophy, 
  Utensils, 
  ShoppingBag, 
  MessageSquare, 
  Award
} from 'lucide-react';

const navigationItems = [
  { icon: Home, label: 'ホーム', href: '/' },
  { icon: Trophy, label: 'スポーツ', href: '/sports' },
  { icon: Utensils, label: 'ごはん', href: '/food' },
  { icon: ShoppingBag, label: 'フリマ', href: '/marketplace' },
  { icon: MessageSquare, label: 'メッセージ', href: '/messages' },
  { icon: Award, label: 'ランキング', href: '/ranking' },
];

export function MobileTabNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
      <div className="grid grid-cols-6 h-16">
        {navigationItems.slice(0, 6).map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-1 py-2 text-xs transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon 
                className={cn(
                  "h-5 w-5",
                  isActive ? "text-primary" : "text-muted-foreground"
                )} 
              />
              <span className={cn(
                "text-xs font-medium truncate",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}