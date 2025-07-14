"use client";
import { useSessionContext } from "../../../contexts/session-context";
import CourseDetailsComponent from "@/components/course/course-details-component";
import { NavbarComponent } from "@/components/navbar-component";

export default function CoursePage() {
  const { session } = useSessionContext();

  if (!session) {
    return null;
  }

  return (
    <div>
      <NavbarComponent />
      <CourseDetailsComponent />
    </div>
  );
}
