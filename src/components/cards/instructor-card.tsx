import { InstructorsDto } from "@/dtos/instructors-dto";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { CourseDto } from "@/dtos/course-dto";
import { Trash } from "lucide-react";
import { useSessionContext } from "@/contexts/session-context";

type InstructorProps = {
  course: CourseDto | undefined;
  instructor: InstructorsDto;
  instructors: InstructorsDto[];
  setInstructors: React.Dispatch<React.SetStateAction<InstructorsDto[]>>;
};

export const InstrutorCard = ({ course, instructor, instructors, setInstructors }: InstructorProps) => {
  const { session } = useSessionContext();
  const user = session;

  const isCreator = user?.id === course?.creator?.id;

  const handleDeleteInstructor = () => {
    const updated = instructors.filter((inst) => inst.id !== instructor?.id);
    const stored = localStorage.getItem("courses");

    if (stored) {
      const parsed = JSON.parse(stored);
      const updatedCourses = parsed.map((c: CourseDto) => {
        if (c.id === course?.id) {
          return { ...c, instructors: updated };
        }
        return c;
      });
      localStorage.setItem("courses", JSON.stringify(updatedCourses));
    }
    setInstructors(updated);
  };

  return (
    <Card
      key={instructor.id}
      className="bg-gray-900/60 border-gray-700/50 hover:bg-gray-900/80 transition-all duration-200 backdrop-blur-sm relative"
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
                <p className="text-sm text-green-400">{instructor.title}</p>
                <p className="text-xs text-gray-500 mt-1">{instructor.email}</p>
              </div>
              <Badge
                className={
                  course?.creator?.id === instructor.id
                    ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                    : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                }
              >
                {course?.creator?.id === instructor.id ? "Criador" : "Colaborador"}
              </Badge>
            </div>
            <p className="text-sm text-gray-400 mt-2">{instructor.bio}</p>
          </div>
        </div>
        {isCreator && (
          <button
            onClick={handleDeleteInstructor}
            className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors"
            title="Remover Instrutor"
          >
            <Trash className="w-4 h-4" />
          </button>
        )}
      </CardContent>
    </Card>
  );
};
