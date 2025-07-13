"use client";
import { useSessionContext } from "@/app/contexts/session-context";
import CourseDetailsComponent from "@/components/course/course-details-component";
import { NavbarComponent } from "@/components/navbar-component";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CoursePage() {
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
        <CourseDetailsComponent />
      </div>
    );
  }
}
