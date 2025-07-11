"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Session = {
  id: number;
  nome: string;
  email: string;
  token: string;
} | null;

type SessionContextType = {
  session: Session;
  setSession: (sess: Session) => void;
  isLoading: boolean;
};

const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("session");
    if (stored) {
      setSession(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (session) {
      localStorage.setItem("session", JSON.stringify(session));
    }
  }, [session]);

  return (
    <SessionContext.Provider value={{ session, setSession, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessionContext deve ser usado dentro de SessionProvider");
  }
  return context;
}
