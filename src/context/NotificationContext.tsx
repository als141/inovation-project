'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Notification as AppNotification } from '@/types';
import { mockNotifications } from '@/lib/mock-data';

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (notification: Omit<AppNotification, 'id' | 'userId' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  useEffect(() => {
    if (user) {
      // localStorage から通知を復元、なければモックデータを使用
      const savedNotifications = localStorage.getItem(`notifications_${user.id}`);
      if (savedNotifications) {
        try {
          const parsed = JSON.parse(savedNotifications);
          setNotifications(parsed.map((n: AppNotification & { createdAt: string }) => ({
            ...n,
            createdAt: new Date(n.createdAt)
          })));
        } catch (error) {
          console.error('Failed to parse notifications:', error);
          // モックデータをフォールバックとして使用
          const userNotifications = mockNotifications.filter(n => n.userId === user.id);
          setNotifications(userNotifications);
        }
      } else {
        // 初回ロード時はモックデータを使用
        const userNotifications = mockNotifications.filter(n => n.userId === user.id);
        setNotifications(userNotifications);
        localStorage.setItem(`notifications_${user.id}`, JSON.stringify(userNotifications));
      }
    }
  }, [user]);

  const saveNotifications = (newNotifications: AppNotification[]) => {
    if (user) {
      localStorage.setItem(
        `notifications_${user.id}`, 
        JSON.stringify(newNotifications)
      );
    }
  };

  const addNotification = (notificationData: Omit<AppNotification, 'id' | 'userId' | 'createdAt'>) => {
    if (!user) return;

    const notification: AppNotification = {
      ...notificationData,
      id: Date.now().toString(),
      userId: user.id,
      read: false,
      createdAt: new Date(),
    };

    const newNotifications = [notification, ...notifications];
    setNotifications(newNotifications);
    saveNotifications(newNotifications);

    // ブラウザ通知を表示（許可されている場合）
    if (typeof window !== 'undefined' && 'Notification' in window && window.Notification.permission === 'granted') {
      new window.Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
      });
    }
  };

  const markAsRead = (id: string) => {
    const newNotifications = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(newNotifications);
    saveNotifications(newNotifications);
  };

  const markAllAsRead = () => {
    const newNotifications = notifications.map(n => ({ ...n, read: true }));
    setNotifications(newNotifications);
    saveNotifications(newNotifications);
  };

  const clearAll = () => {
    setNotifications([]);
    if (user) {
      localStorage.removeItem(`notifications_${user.id}`);
    }
  };

  const removeNotification = (id: string) => {
    const newNotifications = notifications.filter(n => n.id !== id);
    setNotifications(newNotifications);
    saveNotifications(newNotifications);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // ブラウザ通知の許可を要求
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (window.Notification.permission === 'default') {
        window.Notification.requestPermission();
      }
    }
  }, []);

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
    removeNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

// 通知生成のヘルパー関数
export const createNotification = {
  eventParticipation: (eventTitle: string, eventId: string) => ({
    type: 'success' as const,
    title: 'イベント参加',
    message: `${eventTitle}への参加が確定しました`,
    actionUrl: `/sports/${eventId}`,
  }),
  
  eventReminder: (eventTitle: string, eventId: string) => ({
    type: 'info' as const,
    title: 'イベントリマインダー',
    message: `${eventTitle}の開始まで1時間です`,
    actionUrl: `/sports/${eventId}`,
  }),
  
  newMessage: (senderName: string, conversationId: string) => ({
    type: 'info' as const,
    title: '新しいメッセージ',
    message: `${senderName}からメッセージが届きました`,
    actionUrl: `/messages/${conversationId}`,
  }),
  
  itemSold: (itemTitle: string, itemId: string) => ({
    type: 'success' as const,
    title: '商品が売れました',
    message: `${itemTitle}の購入希望者が現れました`,
    actionUrl: `/marketplace/${itemId}`,
  }),
  
  answerAccepted: (questionTitle: string, questionId: string) => ({
    type: 'success' as const,
    title: 'ベストアンサー選出',
    message: `「${questionTitle}」の回答がベストアンサーに選ばれました`,
    actionUrl: `/research/qa/${questionId}`,
  }),
  
  applicationDeadline: (companyName: string, daysLeft: number) => ({
    type: 'warning' as const,
    title: '応募期限',
    message: `${companyName}の応募期限まで${daysLeft}日です`,
    actionUrl: '/career',
  }),
};