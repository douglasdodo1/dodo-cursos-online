"use client";
import { Calendar, Users, BookOpen, Trash } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { CourseDto } from "@/dtos/course-dto";
import Image from "next/image";
import { formatDate } from "@/app/helpers/format-date";
import { useSessionContext } from "@/app/contexts/session-context";

type CardDashboardProps = {
  course: CourseDto;
  handleCourseClick: (course: CourseDto) => void;
  setCourses: React.Dispatch<React.SetStateAction<CourseDto[]>>;
};

export const CardDashboard = ({ course, handleCourseClick, setCourses }: CardDashboardProps) => {
  const { session } = useSessionContext();
  const user = session;

  const isCreator = user?.id === course.creator?.id;

  const handleDeleteCourse = async () => {
    setCourses((prevCourses) => prevCourses.filter((c) => c.id !== course.id));
  };

  return (
    <Card
      key={course.id}
      className="bg-gray-900/60 border border-gray-700/50 hover:bg-gray-900/80 transition-all duration-200 hover:scale-[1.02] backdrop-blur-sm cursor-pointer flex flex-col relative"
      onClick={() => handleCourseClick(course)}
    >
      <div className="relative w-full aspect-video rounded-t-lg overflow-hidden">
        <Image src="/images/logo.png" alt="logo" fill className="object-cover" priority />
      </div>

      {isCreator && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteCourse();
          }}
          className="absolute top-2 right-2 text-red-400 hover:text-red-600 transition-colors"
          title="Excluir curso"
        >
          <Trash className="w-4 h-4" />
        </button>
      )}

      <CardHeader className="px-4">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-white text-base font-semibold line-clamp-1">{course.name}</CardTitle>
        </div>
        <CardDescription className="text-gray-400 text-sm line-clamp-2">{course.description}</CardDescription>
      </CardHeader>

      <CardContent className="mt-auto">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-400">
              <Calendar className="mr-1 h-4 w-4" />
              {formatDate(course.start_date)}
            </div>
            <div className="flex items-center text-gray-400">
              <Users className="mr-1 h-4 w-4" />
              {course.student_number} alunos
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Badge className="border border-gray-600 text-gray-300 bg-transparent px-2 py-0.5 text-xs">
              {isCreator ? "Instrutor" : "Não Instrutor"}
            </Badge>
            <Button
              size="sm"
              variant="ghost"
              className="text-green-400 hover:text-green-300 hover:bg-green-500/10 px-2 py-1 h-auto text-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleCourseClick(course);
              }}
            >
              <BookOpen className="mr-1 h-4 w-4" />
              Ver Curso
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
