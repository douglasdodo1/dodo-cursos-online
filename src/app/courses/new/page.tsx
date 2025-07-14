"use client";
import { useSessionContext } from "@/contexts/session-context";
import { NavbarComponent } from "@/components/navbar-component";
import { NewCourseComponent } from "@/components/new-course-component";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NewCourse() {
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
        <NewCourseComponent />
      </div>
    );
  }
}
