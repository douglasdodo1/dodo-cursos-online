// contexts/SessionContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Session = {
  nome: string;
  email: string;
  token: string;
} | null;

export type SessionContextType = {
  session: Session;
  setSession: (sess: Session) => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session>(null);

  return <SessionContext.Provider value={{ session, setSession }}>{children}</SessionContext.Provider>;
}

export function useSessionContext() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSessionContext deve ser usado dentro de SessionProvider");
  }
  return ctx;
}
