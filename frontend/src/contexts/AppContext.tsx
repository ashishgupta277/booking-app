import React, { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";

type ToastMessage = {
  message: string;
  type: "success" | "error";
};

type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const Toast = ({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) => (
  <div
    style={{
      position: "fixed",
      bottom: 20,
      right: 20,
      background: type === "success" ? "#4ade80" : "#f87171",
      color: "#fff",
      padding: "1rem 2rem",
      borderRadius: 8,
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      zIndex: 1000,
      cursor: "pointer",
    }}
    onClick={onClose}
  >
    {message}
  </div>
);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (toastMessage: ToastMessage) => setToast(toastMessage);
  const { isError } = useQuery({
    queryKey: ["validateToken"],
    queryFn: apiClient.validateToken,
    retry: false,
  });

  return (
    <AppContext.Provider value={{ showToast, isLoggedIn: !isError }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
