'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Trophy, 
  Utensils, 
  ShoppingBag, 
  BookOpen, 
  Briefcase,
  User,
  Settings
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navigationItems = [
  { icon: Home, label: 'ホーム', href: '/', color: 'text-blue-600' },
  { icon: Trophy, label: 'スポーツ', href: '/sports', color: 'text-orange-600' },
  { icon: Utensils, label: 'ごはん', href: '/food', color: 'text-green-600' },
  { icon: ShoppingBag, label: 'フリマ', href: '/marketplace', color: 'text-purple-600' },
  { icon: BookOpen, label: '研究', href: '/research', color: 'text-indigo-600' },
  { icon: Briefcase, label: '就活', href: '/career', color: 'text-gray-600' },
];

const bottomItems = [
  { icon: User, label: 'プロフィール', href: '/profile' },
  { icon: Settings, label: '設定', href: '/settings' },
];

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();

  const NavItem = ({ 
    icon: Icon, 
    label, 
    href, 
    color,
    isActive 
  }: { 
    icon: React.ElementType; 
    label: string; 
    href: string; 
    color?: string;
    isActive: boolean;
  }) => (
    <Link
      href={href}
      onClick={onClose}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-muted",
        "group"
      )}
    >
      <Icon 
        className={cn(
          "h-5 w-5 flex-shrink-0",
          isActive 
            ? "text-primary-foreground" 
            : color || "text-muted-foreground group-hover:text-foreground"
        )} 
      />
      <span>{label}</span>
    </Link>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <NavItem
                  key={item.href}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  color={item.color}
                  isActive={pathname === item.href || 
                    (item.href !== '/' && pathname.startsWith(item.href))}
                />
              ))}
            </div>

            {/* Divider */}
            <div className="my-4 border-t" />

            {/* Bottom Navigation */}
            <div className="space-y-1">
              {bottomItems.map((item) => (
                <NavItem
                  key={item.href}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  isActive={pathname === item.href}
                />
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="text-xs text-muted-foreground">
              <p>コミュニティ掲示板システム</p>
              <p>Version 1.0.0</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Desktop Spacer */}
      <div className="hidden md:block w-64 flex-shrink-0" />
    </>
  );
}