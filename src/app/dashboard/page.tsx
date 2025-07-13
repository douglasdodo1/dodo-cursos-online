"use client";
import { DashboardComponent } from "@/components/dashboard/dashboard-component";
import { NavbarComponent } from "@/components/navbar-component";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSessionContext } from "../contexts/session-context";

export default function Dashboard() {
  const { session } = useSessionContext();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [router, session]);

  if (session) {
    return (
      <div>
        <NavbarComponent />
        <DashboardComponent />
      </div>
    );
  }
}
