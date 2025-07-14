"use client";
import { DashboardComponent } from "@/components/dashboard/dashboard-component";
import { NavbarComponent } from "@/components/navbar-component";
import { useSessionContext } from "../../contexts/session-context";

export default function Dashboard() {
  const { session } = useSessionContext();

  if (!session) {
    return null;
  }

  return (
    <div>
      <NavbarComponent />
      <DashboardComponent />
    </div>
  );
}
