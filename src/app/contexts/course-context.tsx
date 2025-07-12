"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { CourseDto } from "@/dtos/course-dto";

type CourseContextType = {
  courses: CourseDto[];
  setCourses: React.Dispatch<React.SetStateAction<CourseDto[]>>;
};

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<CourseDto[]>([]);
  return <CourseContext.Provider value={{ courses, setCourses }}>{children}</CourseContext.Provider>;
};

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) throw new Error("useCourseContext must be used inside CourseProvider");
  return context;
};
