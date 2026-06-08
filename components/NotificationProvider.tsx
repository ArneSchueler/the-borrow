"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getUserNotifications,
  markNotificationsAsRead,
} from "@/app/[locale]/actions/transaction";
import { formatDistanceToNow } from "date-fns";

export type Notification = {
  id: string;
  type: "confirmed" | "returned" | "reminder" | "overdue";
  message: string;
  read: boolean;
  date: string;
};

const initialNotifications: Notification[] = [];

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

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const dbNotifs = await getUserNotifications();
        const formatted = dbNotifs.map((n) => ({
          id: n.id,
          type: n.type as Notification["type"],
          message: n.message,
          read: n.read,
          date: formatDistanceToNow(new Date(n.createdAt), { addSuffix: true }),
        }));
        setNotifications(formatted);
      } catch (err) {
        console.error("Failed to load notifications", err);
      }
    }
    fetchNotifications();
  }, []);

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

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    try {
      await markNotificationsAsRead();
    } catch (err) {
      console.error("Failed to mark notifications as read", err);
    }
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
