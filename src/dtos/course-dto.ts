import { UserDto } from "./user-dto";

export type CourseDto = {
  id: number;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
  creator: UserDto;
  student_number: number;
};
