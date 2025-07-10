export type lessonDto = {
  id: number;
  title: string;
  status: "published" | "draft" | "archived";
  description?: string;
  order: number;
  video_url: string;
  duration: number;
  course_id: number;
  creator_id: number;
};
