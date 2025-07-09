import { UserDto } from "./user-dto";

export type InstructorsDto = UserDto & {
  bio?: string;
  expertises: string[];
  linkedin: string;
  github: string;
};
