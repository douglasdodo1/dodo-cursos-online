import { lessonDto } from "@/dtos/lesson-dto";

const simulateRequest = async <T>(data: T, delay = 1000): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

export const lessonService = {
  async listByCourse(courseId: number): Promise<lessonDto[]> {
    const stored = localStorage.getItem(`lessons_${courseId}`);
    return stored ? JSON.parse(stored) : [];
  },

  async getById(id: number): Promise<lessonDto | undefined> {
    const allLessons = await this.getAllLessons();
    const lesson = allLessons.find((lesson: lessonDto) => lesson.id === id);
    return lesson;
  },
  async getAllLessons(): Promise<lessonDto[]> {
    const allLessons: lessonDto[] = [];
    const keys = Object.keys(localStorage);

    for (const key of keys) {
      if (key.startsWith("lessons_")) {
        try {
          const item = localStorage.getItem(key);
          if (item) {
            const lessons = JSON.parse(item);
            if (Array.isArray(lessons)) {
              allLessons.push(...lessons);
            } else {
              console.warn(`Expected array at key ${key}, got:`, typeof lessons);
            }
          }
        } catch (error) {
          console.error(`Error parsing lessons from key ${key}:`, error);
        }
      }
    }
    return allLessons;
  },

  async create(lesson: Omit<lessonDto, "id">): Promise<lessonDto> {
    const lessons = await this.listByCourse(lesson.course_id);
    const newLesson: lessonDto = {
      ...lesson,
      id: Math.floor(Math.random() * 1000000) + 1,
    };

    await simulateRequest(newLesson);
    localStorage.setItem(`lessons_${lesson.course_id}`, JSON.stringify([...lessons, newLesson]));
    return newLesson;
  },

  async update(id: number, lessonData: Partial<lessonDto>): Promise<lessonDto> {
    const allLessons = await this.getAllLessons();

    const index = allLessons.findIndex((l) => l.id === id);

    if (index === -1) {
      if (!lessonData.course_id) {
        throw new Error("course_id is required to create a new lesson");
      }

      const newLesson = {
        ...lessonData,
        id,
      } as lessonDto;

      return this.create(newLesson);
    }

    const updatedLesson = { ...allLessons[index], ...lessonData };

    allLessons[index] = updatedLesson;

    const courseLessons = allLessons.filter((l) => l.course_id === updatedLesson.course_id);

    await simulateRequest(updatedLesson);

    if (updatedLesson.course_id) {
      localStorage.setItem(`lessons_${updatedLesson.course_id}`, JSON.stringify(courseLessons));
      return updatedLesson;
    } else {
      throw new Error("Cannot save lesson: course_id is missing");
    }
  },

  async delete(id: number): Promise<void> {
    const allLessons = await this.getAllLessons();
    const lesson = allLessons.find((l) => l.id === id);

    if (!lesson) {
      throw new Error("Aula nÃ£o encontrada");
    }

    const filteredLessons = allLessons.filter((l) => l.id !== id);
    const courseLessons = filteredLessons.filter((l) => l.course_id === lesson.course_id);

    await simulateRequest({});
    localStorage.setItem(`lessons_${lesson.course_id}`, JSON.stringify(courseLessons));
  },
};
