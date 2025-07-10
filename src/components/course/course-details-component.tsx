"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Edit, MoreVertical, Users, Calendar, Clock, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { CourseDto } from "@/dtos/course-dto";
import { useSessionContext } from "@/app/contexts/session-context";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/app/helpers/format-date";
import { use } from "react";
import Image from "next/image";
import { getDuration } from "@/app/helpers/get-duration";
import { lessonDto } from "@/dtos/lesson-dto";
import { InstrutorCard } from "./instructor-card";
import { LessonTypeComponent } from "./lesson-type-component";
import { AddInstructorModal } from "../add-instructor-modal";
import { InstructorsDto } from "@/dtos/instructors-dto";

const instructorsMock = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@exemplo.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "creator",
    title: "Senior React Developer",
    bio: "10+ anos de experiência em desenvolvimento frontend",
    expertises: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    linkedin: "https://linkedin.com/joao-silva",
    github: "https://github.com/joao-silva",
    website: "https://joao-silva.com",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@exemplo.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "collaborator",
    title: "Frontend Architect",
    bio: "Especialista em performance e arquitetura React",
    expertises: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    linkedin: "https://linkedin.com/joao-silva",
    github: "https://github.com/joao-silva",
    website: "https://joao-silva.com",
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro@exemplo.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "collaborator",
    title: "UI/UX Developer",
    bio: "Focado em experiência do usuário e design systems",
    expertises: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    linkedin: "https://linkedin.com/joao-silva",
    github: "https://github.com/joao-silva",
    website: "https://joao-silva.com",
  },
];

const lessons: lessonDto[] = [
  {
    id: 1,
    title: "Introdução aos Hooks Avançados",
    description: "Visão geral dos hooks customizados e quando utilizá-los",
    duration: 15,
    status: "published",
    video_url: "/placeholder.svg?height=120&width=200",
    order: 1,
    course_id: 1,
    creator_id: 1,
  },
  {
    id: 2,
    title: "Introdução aos Hooks Avançados",
    description: "Visão geral dos hooks customizados e quando utilizá-los",
    duration: 15,
    status: "published",
    video_url: "/placeholder.svg?height=120&width=200",
    order: 1,
    course_id: 1,
    creator_id: 1,
  },
  {
    id: 3,
    title: "Introdução aos Hooks Avançados",
    description: "Visão geral dos hooks customizados e quando utilizá-los",
    duration: 15,
    status: "archived",
    video_url: "/placeholder.svg?height=120&width=200",
    order: 1,
    course_id: 1,
    creator_id: 1,
  },
];

const LESSONS_PER_PAGE = 6;

export default function CourseDetailsComponent({ params }: { params: Promise<{ id: string }> }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredLessons, setFilteredLessons] = useState<lessonDto[]>(lessons);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");
  const [openCreateInstructorModal, setOpenCreateInstructorModal] = useState<boolean>(false);
  const [instructors, setInstructors] = useState<InstructorsDto[]>([]);
  const { session } = useSessionContext();
  const user = session;
  const { id } = use(params);

  const course: CourseDto = {
    id: Number(id),
    name: "Curso teste",
    description: "Descrição teste para esse curso teste",
    creator: { id: Number(id), name: "teste", email: "teste@mail.com" },
    student_number: 15,
    start_date: new Date(),
    end_date: new Date(),
  };

  useEffect(() => {
    setFilteredLessons(
      lessons.filter((lesson) => {
        const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || lesson.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
    );
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    setInstructors(instructorsMock);
  }, []);
  const totalPages = Math.ceil(filteredLessons.length / LESSONS_PER_PAGE);
  const startIndex = (currentPage - 1) * LESSONS_PER_PAGE;
  const paginatedLessons = filteredLessons.slice(startIndex, startIndex + LESSONS_PER_PAGE);

  const isCreator = user?.id === course.creator?.id;
  const canEdit = isCreator;
  const canManageInstructors = isCreator;

  const handleEditCourse = () => {
    console.log("Editar curso");
  };

  const handleCreateInstructor = () => {
    setOpenCreateInstructorModal(true);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black  justify-center items-top pt-12">
      <main className="container mx-auto px-4 py-8 justify-center items-center">
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
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{course.name}</h1>
                  </div>
                  {canEdit && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-900/95 backdrop-blur-xl border-gray-700/50" align="end">
                        <DropdownMenuItem onClick={handleEditCourse} className="text-gray-300 hover:bg-gray-800/50">
                          <Edit className="mr-2 h-4 w-4" />
                          Editar Curso
                        </DropdownMenuItem>
                        {canManageInstructors && (
                          <DropdownMenuItem className="text-gray-300 hover:bg-gray-800/50">
                            <Users className="mr-2 h-4 w-4" />
                            Gerenciar Instrutores
                          </DropdownMenuItem>
                        )}
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
                        <p className="text-sm font-medium text-white">{formatDate(course.start_date)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-900/60 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-red-400" />
                      <div>
                        <p className="text-xs text-gray-500">Término</p>
                        <p className="text-sm font-medium text-white">{formatDate(course.end_date)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-900/60 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-blue-400" />
                      <div>
                        <p className="text-xs text-gray-500">Estudantes</p>
                        <p className="text-sm font-medium text-white">{0}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-900/60 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-purple-400" />
                      <div>
                        <p className="text-xs text-gray-500">Duração</p>
                        <p className="text-sm font-medium text-white">
                          {getDuration(course.start_date, course.end_date)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 ">
          <div className="flex justify-center sm:justify-start">
            <TabsList className="bg-gray-900/60 border border-gray-700/50 ">
              <TabsTrigger
                value="overview"
                className=" text-amber-50 data-[state=active]:bg-green-600 data-[state=active]:text-black"
              >
                Visão Geral
              </TabsTrigger>
              <TabsTrigger
                value="lessons"
                className="text-amber-50 data-[state=active]:bg-green-600 data-[state=active]:text-black"
              >
                Aulas ({lessons.length})
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
                <p className="text-gray-300 leading-relaxed">{course.description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <LessonTypeComponent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            canEdit={canEdit}
            paginatedLessons={paginatedLessons}
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

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
                courseId={Number(id)}
                open={openCreateInstructorModal}
                setOpen={setOpenCreateInstructorModal}
                setInstructors={setInstructors}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructors.map((instructor) => (
                <InstrutorCard key={instructor.id} instructor={instructor} course={course} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
