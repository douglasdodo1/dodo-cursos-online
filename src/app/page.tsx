"use client";
import { LoginComponent } from "@/components/login-component";
import { SignupComponent } from "@/components/signup-component";
import { useState } from "react";

export default function Home() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <main className="flex items-center justify-center h-min-screen w-full">
      {isLogin ? <LoginComponent setIsLogin={setIsLogin} /> : <SignupComponent setIsLogin={setIsLogin} />}
    </main>
  );
}
