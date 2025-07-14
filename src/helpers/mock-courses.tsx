import { CourseDto } from "@/dtos/course-dto";

export const MockCourses = async () => {
  const mockCourses: CourseDto[] = Array.from({ length: 12 }).map((_, index) => ({
    id: index + 1,
    name: `Curso ${index + 1}`,
    description: "Descrição do curso.",
    creator: { id: index + 1, name: "John Doe", email: "example@example.com" },
    student_number: 10 + index,
    start_date: new Date(),
    end_date: new Date(),
    instructors: [],
  }));

  return mockCourses;
};
