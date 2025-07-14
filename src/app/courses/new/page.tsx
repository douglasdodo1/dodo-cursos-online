"use client";
import { useSessionContext } from "../../../contexts/session-context";
import { NavbarComponent } from "@/components/navbar-component";
import { NewCourseComponent } from "@/components/new-course-component";

export default function NewCourse() {
  const { session } = useSessionContext();

  if (!session) {
    return null;
  }

  return (
    <div>
      <NavbarComponent />
      <NewCourseComponent />
    </div>
  );
}
