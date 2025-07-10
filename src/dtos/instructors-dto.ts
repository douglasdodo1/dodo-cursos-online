import { UserDto } from "./user-dto";

export type InstructorsDto = UserDto & {
  bio?: string;
  avatar: string;
  title: string;
  expertises: string[];
  linkedin: string;
  github: string;
};
