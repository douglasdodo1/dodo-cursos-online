"use client";

import CourseDetailsComponent from "@/components/course/course-details-component";
import { NavbarComponent } from "@/components/navbar-component";

export default function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div>
      <NavbarComponent />
      <CourseDetailsComponent params={params} />
    </div>
  );
}
