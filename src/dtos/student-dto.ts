import { UserDto } from "./user-dto";

export type StudentDto = UserDto & {
  course: string;
};
