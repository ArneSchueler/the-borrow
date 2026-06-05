"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Notification = {
  id: string;
  type: "confirmed" | "returned" | "reminder" | "overdue";
  message: string;
  read: boolean;
  date: string;
};

// Mock initial data (can be empty array `[]` in production)
const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "reminder",
    message: 'Reminder: "Camera" is due back tomorrow.',
    read: false,
    date: "1h ago",
  },
];

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (type: Notification["type"], message: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const addNotification = (type: Notification["type"], message: string) => {
    const newNotif: Notification = {
      id: Math.random().toString(36).substring(7), // Simple unique ID
      type,
      message,
      read: false,
      date: "Just now",
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
}
