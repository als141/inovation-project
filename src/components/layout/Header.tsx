'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, Menu, Search, User, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { User as UserType, Notification as AppNotification } from '@/types';

interface HeaderProps {
  currentUser: UserType | null;
  tokenBalance: number;
  notifications: AppNotification[];
  onMenuToggle: () => void;
}

export function Header({ 
  currentUser, 
  tokenBalance, 
  notifications, 
  onMenuToggle 
}: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuToggle}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg overflow-hidden">
              <img src="/icon.png" alt="Universe" className="w-full h-full object-cover" />
            </div>
            <span className="hidden sm:inline-block font-semibold text-lg">
              Universe
            </span>
            <span className="sm:hidden font-semibold text-lg">
              Universe
            </span>
          </Link>
        </div>

        {/* Center Section - Search (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-sm mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="検索..."
              className="w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Token Balance */}
          {currentUser && (
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-100 text-amber-800">
              <Coins className="h-4 w-4" />
              <span className="text-sm font-medium">{tokenBalance}</span>
            </div>
          )}

          {/* Notifications */}
          {currentUser && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="px-4 py-2 border-b">
                  <h4 className="font-semibold">通知</h4>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.slice(0, 5).map((notification) => (
                    <DropdownMenuItem key={notification.id} className="p-4">
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">
                            {notification.title}
                          </span>
                          {!notification.read && (
                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {new Date(notification.createdAt).toLocaleString('ja-JP')}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                {notifications.length > 5 && (
                  <div className="border-t p-2">
                    <Button variant="ghost" size="sm" className="w-full">
                      すべての通知を見る
                    </Button>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* User Menu */}
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>
                      {currentUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-4 py-2 border-b">
                  <div className="font-medium">{currentUser.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {currentUser.studentId} | {currentUser.major}
                  </div>
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    プロフィール
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    設定
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  ログアウト
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild>
              <Link href="/login">ログイン</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="border-t p-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="検索..."
              className="w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>
      )}
    </header>
  );
}