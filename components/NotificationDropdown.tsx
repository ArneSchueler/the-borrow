"use client";

import { useState, useRef, useEffect } from "react";
import { useNotifications } from "./NotificationProvider";

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { notifications, markAllAsRead } = useNotifications();

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-[#555d61] hover:bg-[#e6f2f5] rounded-full transition-colors"
        aria-label="Notifications"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-[#c0c8cb] bg-white p-4 shadow-lg z-50">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-[#003644]">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-[#0e4d62] hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="py-4 text-center text-sm text-gray-500">
                No new notifications
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`rounded-lg p-3 text-sm transition-colors ${notification.read ? "bg-[#faf9f8]" : "bg-[#e6f2f5]"}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="flex-1 text-[#1a1c1c]">
                        {notification.message}
                      </p>
                      {!notification.read && (
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#0e4d62]" />
                      )}
                    </div>
                    <span className="mt-2 block text-[11px] text-[#555d61]">
                      {notification.date}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
