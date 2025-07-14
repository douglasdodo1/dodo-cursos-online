"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Edit, MoreVertical, Users, Calendar, Clock, Plus, Trash, ChevronLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CourseDto } from "@/dtos/course-dto";
import { useSessionContext } from "../../contexts/session-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { lessonDto } from "@/dtos/lesson-dto";
import { InstrutorCard } from "../cards/instructor-card";
import { LessonTypeComponent } from "./lesson-type-component";
import { AddInstructorModal } from "../modals/add-instructor-modal";
import { InstructorsDto } from "@/dtos/instructors-dto";
import { usePathname, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { lessonService } from "@/service/lessons-api";
import { formatDate } from "@/helpers/format-date";
import { getDuration } from "@/helpers/get-duration";
import { LessonForm } from "../forms/lesson-form";
import { EditCourseModal } from "../modals/edit-course-modal";

const LESSONS_PER_PAGE = 6;

export default function CourseDetailsComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft" | "archived">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");
  const [openCreateInstructorModal, setOpenCreateInstructorModal] = useState(false);
  const [openEditLessonModal, setOpenEditLessonModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState<lessonDto | null>(null);
  const [instructors, setInstructors] = useState<InstructorsDto[]>([]);
  const [openEditCourseModal, setOpenEditCourseModal] = useState(false);

  const pathname = usePathname();
  const id = pathname ? Number(pathname.split("/")[2]) : NaN;
  const queryClient = useQueryClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const user = session;

  const { data: lessons = [], isLoading: isLoadingLessons } = useQuery({
    queryKey: ["lessons", id],
    queryFn: () => lessonService.listByCourse(id),
    enabled: !!id,
  });

  const [filteredLessons, setFilteredLessons] = useState<lessonDto[]>([]);
  const [paginatedLessons, setPaginatedLessons] = useState<lessonDto[]>([]);

  const [currentCourse, setCurrentCourse] = useState<CourseDto>({
    id: 0,
    name: "",
    description: "",
    start_date: new Date(),
    end_date: new Date(),
    creator: {
      name: "",
      email: "",
    },
    instructors: [],
  });

  useEffect(() => {
    if (lessons) {
      const filtered = lessons.filter((lesson) => {
        const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || lesson.status === statusFilter;
        return matchesSearch && matchesStatus;
      });
      setFilteredLessons(filtered);
      setPaginatedLessons(filtered.slice((currentPage - 1) * LESSONS_PER_PAGE, currentPage * LESSONS_PER_PAGE));
    }
  }, [lessons, searchTerm, statusFilter, currentPage]);

  useEffect(() => {
    const stored = localStorage.getItem("courses");
    if (stored) {
      const courses = JSON.parse(stored);
      const course = courses.find((course: CourseDto) => course.id === id);
      if (course) {
        setCurrentCourse(course);
        setInstructors(course.instructors ?? []);
      }
    }
  }, [id]);

  const isCreator = user?.id === currentCourse?.creator?.id;
  const canEdit = isCreator;
  const canManageInstructors = isCreator;

  const handleEditCourse = () => {
    setOpenEditCourseModal(true);
  };

  const handleDeleteCourse = async () => {
    const stored = localStorage.getItem("courses");

    if (stored) {
      const parsed = JSON.parse(stored);
      const updatedCourses = parsed.filter((c: CourseDto) => c.id !== currentCourse.id);
      localStorage.setItem("courses", JSON.stringify(updatedCourses));
    }

    await router.push("/dashboard");
  };

  const handleCreateInstructor = () => {
    setOpenCreateInstructorModal(true);
  };

  const handleDashboard = async () => {
    await router.push("/dashboard");
  };

  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["lessons", id] });
    setOpenEditLessonModal(false);
    setEditingLesson(null);
    toast.success("Aula salva com sucesso!");
  };

  if (isLoadingLessons) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black justify-center items-start pt-12">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <div className="aspect-video bg-gray-800/50 rounded-xl overflow-hidden relative h-full w-full">
                <Image src="/images/logo.png" alt="logo" fill className="object-cover" priority />
              </div>
            </div>

            <div className="lg:w-2/3 space-y-6">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <Button
                    onClick={handleDashboard}
                    size="sm"
                    type="button"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                  </Button>

                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{currentCourse?.name}</h1>
                  </div>
                  {canEdit && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="z-[9999] bg-gray-800" align="end">
                        <DropdownMenuItem onClick={handleEditCourse} className="text-gray-300 hover:bg-gray-800">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-gray-400 hover:text-white hover:bg-blue-900"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Editar Curso
                          </Button>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-800">
                          <Button
                            onClick={handleDeleteCourse}
                            variant="destructive"
                            size="sm"
                            className="w-full text-gray-400 hover:text-white"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Excluir Curso
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-900/60 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-green-400" />
                      <div>
                        <p className="text-xs text-gray-500">Início</p>
                        <p className="text-sm font-medium text-white">{formatDate(currentCourse?.start_date)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-900/60 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-red-400" />
                      <div>
                        <p className="text-xs text-gray-500">Término</p>
                        <p className="text-sm font-medium text-white">{formatDate(currentCourse?.end_date)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-900/60 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-blue-400" />
                      <div>
                        <p className="text-xs text-gray-500">Estudantes</p>
                        <p className="text-sm font-medium text-white">{5}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-900/60 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-purple-400" />
                      <div>
                        <p className="text-xs text-gray-500">Duração</p>
                        <p className="text-sm font-medium text-white">
                          {getDuration(currentCourse?.start_date, currentCourse?.end_date)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-center sm:justify-start">
            <TabsList className="bg-gray-900/60 border border-gray-700/50">
              <TabsTrigger
                value="overview"
                className="text-amber-50 data-[state=active]:bg-green-600 data-[state=active]:text-black"
              >
                Visão Geral
              </TabsTrigger>
              <TabsTrigger
                value="lessons"
                className="text-amber-50 data-[state=active]:bg-green-600 data-[state=active]:text-black"
              >
                Aulas ({lessons?.length || 0})
              </TabsTrigger>
              <TabsTrigger
                value="instructors"
                className="text-amber-50 data-[state=active]:bg-green-600 data-[state=active]:text-black"
              >
                Instrutores ({instructors.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-gray-900/60 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Descrição do curso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 leading-relaxed">{currentCourse?.description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lessons" className="space-y-6">
            {canEdit && (
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    setEditingLesson(null);
                    setOpenEditLessonModal(true);
                  }}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-black font-semibold"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Aula
                </Button>
              </div>
            )}

            <LessonTypeComponent
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              canEdit={canEdit}
              paginatedLessons={paginatedLessons}
              totalPages={Math.ceil(filteredLessons.length / LESSONS_PER_PAGE)}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              course={currentCourse}
              setPaginatedLessons={setPaginatedLessons}
            />
          </TabsContent>

          <TabsContent value="instructors" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Instrutores do Curso</h3>
              {canManageInstructors && (
                <Button
                  onClick={handleCreateInstructor}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-black font-semibold"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Instrutor
                </Button>
              )}
              <AddInstructorModal
                currentCourse={currentCourse}
                setCourse={setCurrentCourse}
                open={openCreateInstructorModal}
                setOpen={setOpenCreateInstructorModal}
                setInstructors={setInstructors}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructors.map((instructor) => (
                <InstrutorCard
                  key={instructor.id}
                  instructor={instructor}
                  course={currentCourse}
                  instructors={instructors}
                  setInstructors={setInstructors}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit/Create Lesson Modal */}
        {openEditLessonModal && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">{editingLesson ? "Editar Aula" : "Nova Aula"}</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setOpenEditLessonModal(false);
                    setEditingLesson(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>

              <LessonForm
                courseId={currentCourse.id}
                creatorId={user?.id || 0}
                lessonId={editingLesson?.id}
                initialData={editingLesson || undefined}
                onSuccess={handleSuccess}
              />
            </div>
          </div>
        )}

        <EditCourseModal id={currentCourse?.id} open={openEditCourseModal} setOpen={setOpenEditCourseModal} />
      </main>
    </div>
  );
}
