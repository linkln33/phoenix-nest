"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./button";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
}

let toastListeners: ((toasts: Toast[]) => void)[] = [];
let toasts: Toast[] = [];

function notify() {
  toastListeners.forEach((listener) => listener([...toasts]));
}

export function toast(newToast: Omit<Toast, "id">) {
  const id = Math.random().toString(36).substring(7);
  toasts = [...toasts, { ...newToast, id }];
  notify();
  
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    notify();
  }, 5000);
}

export function Toaster() {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>([]);

  useEffect(() => {
    toastListeners.push(setCurrentToasts);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== setCurrentToasts);
    };
  }, []);

  if (currentToasts.length === 0) return null;

  return (
    <div className="fixed bottom-0 right-0 z-[100] flex flex-col gap-2 p-4 max-w-md w-full">
      {currentToasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-lg border p-4 shadow-lg ${
            toast.variant === "destructive"
              ? "bg-red-900/50 border-red-700"
              : toast.variant === "success"
              ? "bg-green-900/50 border-green-700"
              : "bg-slate-900/90 border-slate-700"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {toast.title && (
                <div className="font-semibold mb-1">{toast.title}</div>
              )}
              {toast.description && (
                <div className="text-sm text-slate-300">{toast.description}</div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => {
                toasts = toasts.filter((t) => t.id !== toast.id);
                notify();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

