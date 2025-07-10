import { InstructorsDto } from "@/dtos/instructors-dto";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { CourseDto } from "@/dtos/course-dto";

type instructorProps = {
  instructor: InstructorsDto;
  course: CourseDto;
};

export const InstrutorCard = ({ instructor, course }: instructorProps) => {
  return (
    <Card
      key={instructor.id}
      className="bg-gray-900/60 border-gray-700/50 hover:bg-gray-900/80 transition-all duration-200 backdrop-blur-sm"
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16 border-2 border-green-500/30">
            <AvatarImage src={instructor.avatar} alt={instructor.name} />
            <AvatarFallback className="bg-gray-800 text-green-400">
              {instructor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-white">{instructor.name}</h4>
                <p className="text-sm text-green-400">{instructor.name}</p>
                <p className="text-xs text-gray-500 mt-1">{instructor.email}</p>
              </div>
              <Badge
                className={
                  course.creator?.id === instructor.id
                    ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                    : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                }
              >
                {course.creator?.id === instructor.id ? "Criador" : "Colaborador"}
              </Badge>
            </div>
            <p className="text-sm text-gray-400 mt-2">{instructor.bio}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
