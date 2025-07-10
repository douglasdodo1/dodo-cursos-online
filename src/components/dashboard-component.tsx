"use client";
import { BookOpen, ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { CourseDto } from "@/dtos/course-dto";
import { Label } from "./ui/label";
import { useSessionContext } from "@/app/contexts/session-context";
import { CardDashboard } from "./dashboard/card-dashboard";
import { useRouter } from "next/navigation";

const mockCourses: CourseDto[] = Array.from({ length: 12 }).map((_, index) => ({
  id: index + 1,
  name: `Curso ${index + 1}`,
  description: "Descrição do curso.",
  creator: { id: Math.floor(Math.random() * 3) + 1, name: "John Doe", email: "example@example.com" },
  student_number: 10 + index,
  start_date: new Date(),
  end_date: new Date(),
}));

export function DashboardComponent() {
  type filterStatusType = "all" | "my" | "arquived";
  const router = useRouter();
  const { session } = useSessionContext();
  const user = session;

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<filterStatusType>("all");
  const [courses, setCourses] = useState<CourseDto[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const coursesPerPage: number = 6;
  const [totalPages, setTotalPages] = useState<number>(1);
  const [paginatedCourses, setPaginatedCourses] = useState<CourseDto[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<CourseDto[]>([]);

  useEffect(() => {
    setCourses(mockCourses);

    let filtered = [];
    if (filterStatus === "my") {
      filtered = courses.filter((course) => course.creator?.id === user?.id);
    } else {
      filtered = courses;
    }

    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((course) => course.name.toLowerCase().includes(term));
    }

    const total: number =
      Math.ceil(filtered.length / coursesPerPage) == 0 ? 1 : Math.ceil(filtered.length / coursesPerPage);

    setTotalPages(total);
    setFilteredCourses(filtered);

    setCurrentPage((prev) => (prev > total ? 1 : prev));
    setPaginatedCourses(filtered.slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage));
  }, [courses, currentPage, filterStatus, searchTerm, user?.id]);

  const handleCreateCourse = () => {
    router.push("/courses/new");
  };

  const handleCourseClick = (course: CourseDto) => {
    console.log("curso clicado", course);
    router.push(`/courses/${course.id}`);
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
          <Label className="text-amber-100 text-2xl mr-2  justify-end">
            {currentPage} de {totalPages}
          </Label>

          <Button
            variant={currentPage > 1 ? "default" : "outline"}
            onClick={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
            className={
              currentPage > 1
                ? "border border-transparent bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-black "
                : "border-gray-700 text-gray-300 bg-green-800/50 hover:bg-gray-800 focus:outline-none focus:ring-0"
            }
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
          </Button>
          <Button
            variant={currentPage < totalPages ? "default" : "outline"}
            className={
              currentPage < totalPages
                ? "border border-transparent bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-black "
                : "border-gray-700 text-gray-300 bg-green-800/50 hover:bg-gray-800 focus:outline-none focus:ring-0"
            }
            onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
          >
            <ChevronRight className="mr-2 h-4 w-4" />
          </Button>
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            onClick={() => setFilterStatus("all")}
            className={
              filterStatus === "all"
                ? "border border-transparent bg-green-600 text-black hover:bg-green-600"
                : "border-gray-700 text-gray-300 bg-gray-800 hover:bg-gray-800"
            }
          >
            Todos
          </Button>
          <Button
            variant={filterStatus === "my" ? "default" : "outline"}
            onClick={() => setFilterStatus("my")}
            className={
              filterStatus === "my"
                ? "border border-transparent bg-green-600 text-black hover:bg-green-600"
                : "border-gray-700 text-gray-300 bg-gray-800 hover:bg-gray-800"
            }
          >
            Meus
          </Button>
        </div>
      </div>

      {filteredCourses.length > 0 && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {paginatedCourses.map((course) => (
              <CardDashboard key={course.id} course={course} handleCourseClick={handleCourseClick} />
            ))}
          </div>

          {totalPages < 1 && (
            <div className="text-center py-16">
              <div className="bg-gray-900/60 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-12 w-12 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {searchTerm || filterStatus !== "all" ? "Nenhum curso encontrado" : "Nenhum curso criado ainda"}
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                {searchTerm || filterStatus !== "my"
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
