"use client";
import { BookOpen, Calendar, ChevronLeft, ChevronRight, Plus, Search, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { CourseDto } from "@/dtos/course-dto";
import Image from "next/image";
import { Badge } from "./ui/badge";

const mockCourses: CourseDto[] = Array.from({ length: 12 }).map((_, index) => ({
  id: index + 1,
  name: `Curso ${index + 1}`,
  description: "Descrição do curso.",
  creator: { id: 1, name: "John Doe", email: "example@example.com" },
  student_number: 10 + index,
  start_date: new Date(),
  end_date: new Date(),
}));

export function DashboardComponent() {
  type filterStatusType = "all" | "meus" | "arquived";

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<filterStatusType>("all");
  const [courses, setCourses] = useState<CourseDto[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(2);
  const coursesPerPage: number = 6;
  //const totalPages: number = Math.ceil(courses.length / COURSES_PER_PAGE);
  const totalPages: number = 5;
  const paginatedCourses = courses.slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage);

  useEffect(() => {
    setCourses(mockCourses);
  }, []);

  const handleCreateCourse = () => {
    console.log("criar curso");
  };

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const handleCourseClick = (course: CourseDto) => {
    console.log("curso clicado", course);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Meus Cursos</h2>
          <p className="text-gray-400">Gerencie os cursos que você criou ou colabora como instrutor</p>
        </div>

        <Button
          onClick={handleCreateCourse}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-black font-semibold shadow-lg shadow-green-500/25 transition-all duration-200 transform hover:scale-[1.02]"
        >
          <Plus className="mr-2 h-4 w-4" />
          Criar Novo Curso
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar cursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-900/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-green-500/50"
          />
        </div>
        <div className="flex justify-end gap-2  w-1/4">
          <Button
            variant={currentPage > 1 ? "default" : "ghost"}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={
              currentPage > 1
                ? "border border-transparent bg-green-700 text-black hover:bg-green-600"
                : "border-gray-700 text-gray-300 bg-green-800/50 hover:bg-gray-800 focus:outline-none focus:ring-0"
            }
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
          </Button>
          <Button
            variant={currentPage < totalPages ? "default" : "outline"}
            className={
              currentPage < totalPages
                ? "border border-transparent bg-green-700 text-black hover:bg-green-600"
                : "border-gray-700 text-gray-300 bg-green-800/50 hover:bg-gray-800 focus:outline-none focus:ring-0"
            }
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            <ChevronRight className="mr-2 h-4 w-4" />
          </Button>
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            onClick={() => setFilterStatus("all")}
            className={
              filterStatus === "meus"
                ? "border border-transparent bg-green-600 text-black hover:bg-green-600"
                : "border-gray-700 text-gray-300 bg-gray-800 hover:bg-gray-800"
            }
          >
            Todos
          </Button>
          <Button
            variant={filterStatus === "meus" ? "default" : "outline"}
            onClick={() => setFilterStatus("meus")}
            className={
              filterStatus === "meus"
                ? "border border-transparent bg-green-600 text-black hover:bg-green-600"
                : "border-gray-700 text-gray-300 bg-gray-800 hover:bg-gray-800"
            }
          >
            Meus
          </Button>
        </div>
      </div>

      {courses.length > 0 && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {paginatedCourses.map((course) => (
              <Card
                key={course.id}
                className="bg-gray-900/60 border border-gray-700/50 hover:bg-gray-900/80 transition-all duration-200 hover:scale-[1.02] backdrop-blur-sm cursor-pointer flex flex-col"
                onClick={() => handleCourseClick(course)}
              >
                <div className="relative w-full aspect-video rounded-t-lg overflow-hidden">
                  <Image src="/images/logo.png" alt="logo" fill className="object-cover" priority />
                </div>

                <CardHeader className="  px-4">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-white text-base font-semibold line-clamp-1">{course.name}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400 text-sm line-clamp-2">{course.description}</CardDescription>
                </CardHeader>

                <CardContent className="  mt-auto">
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
                        {course.creator?.name === "John Doe" ? "Instrutor" : "não instrutor"}
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
            ))}
          </div>

          {totalPages <= 1 && (
            <div className="text-center py-16">
              <div className="bg-gray-900/60 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-12 w-12 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {searchTerm || filterStatus !== "all" ? "Nenhum curso encontrado" : "Nenhum curso criado ainda"}
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                {searchTerm || filterStatus !== "meus"
                  ? "Tente ajustar os filtros ou termo de busca para encontrar seus cursos."
                  : "Comece criando seu primeiro curso e compartilhe seu conhecimento com o mundo."}
              </p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
