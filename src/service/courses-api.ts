import { CourseDto } from "@/dtos/course-dto";

const simulateRequest = async <T>(data: T, delay = 1000): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

export const courseService = {
  async list(): Promise<CourseDto[]> {
    const stored = localStorage.getItem("courses");
    return stored ? JSON.parse(stored) : [];
  },

  async getById(id: number): Promise<CourseDto | undefined> {
    const courses = await this.list();
    return courses.find((course: CourseDto) => course.id === id);
  },

  async create(course: Omit<CourseDto, "id">): Promise<CourseDto> {
    const courses = await this.list();
    const newCourse: CourseDto = {
      ...course,
      id: Math.floor(Math.random() * 1000) + 1,
    };

    await simulateRequest(newCourse);
    localStorage.setItem("courses", JSON.stringify([...courses, newCourse]));
    return newCourse;
  },

  async update(id: number, courseData: Partial<CourseDto>): Promise<CourseDto> {
    const courses = await this.list();
    const index = courses.findIndex((c: CourseDto) => c.id === id);

    if (index === -1) {
      throw new Error("Curso não encontrado");
    }

    const updatedCourse = { ...courses[index], ...courseData };
    courses[index] = updatedCourse;

    await simulateRequest(updatedCourse);
    localStorage.setItem("courses", JSON.stringify(courses));
    return updatedCourse;
  },

  async delete(id: number): Promise<void> {
    const courses = await this.list();
    const filteredCourses = courses.filter((course: CourseDto) => course.id !== id);

    await simulateRequest({});
    localStorage.setItem("courses", JSON.stringify(filteredCourses));
  },
};
