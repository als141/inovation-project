'use client';

import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileTabNav } from './MobileTabNav';
import { getCurrentUser, mockNotifications } from '@/lib/mock-data';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentUser = getCurrentUser();
  const notifications = mockNotifications.filter(n => n.userId === currentUser?.id);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        currentUser={currentUser}
        tokenBalance={currentUser?.tokens || 0}
        notifications={notifications}
        onMenuToggle={handleMenuToggle}
      />
      
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={handleSidebarClose}
        />
        
        <main className="flex-1 min-h-[calc(100vh-4rem)] pb-16 md:pb-0">
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
      
      <MobileTabNav />
    </div>
  );
}