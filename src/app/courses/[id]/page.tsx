"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Edit, MoreVertical, Users, Calendar, Clock, Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { CourseDto } from "@/dtos/course-dto";
import { useSessionContext } from "@/app/contexts/session-context";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/app/helpers/format-date";
import { use } from "react";
import Image from "next/image";
import { getDuration } from "@/app/helpers/get-duration";
import { LessonCard } from "@/components/lessons/lesson-card";
import { lessonDton } from "@/dtos/lesson-dton";
import { Label } from "@/components/ui/label";

const instructors = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@exemplo.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "creator",
    title: "Senior React Developer",
    bio: "10+ anos de experiência em desenvolvimento frontend",
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@exemplo.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "collaborator",
    title: "Frontend Architect",
    bio: "Especialista em performance e arquitetura React",
  },
  {
    id: 3,
    name: "Pedro Costa",
    email: "pedro@exemplo.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "collaborator",
    title: "UI/UX Developer",
    bio: "Focado em experiência do usuário e design systems",
  },
];

const lessons: lessonDton[] = [
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

export default function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");
  const { session } = useSessionContext();
  const user = session;
  const { id } = use(params);

  const courseData: CourseDto = {
    id: Number(id),
    name: "Curso teste",
    description: "Descrição teste para esse curso teste",
    creator: { id: Number(id), name: "teste", email: "teste@mail.com" },
    student_number: 15,
    start_date: new Date(),
    end_date: new Date(),
  };

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || lesson.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredLessons.length / LESSONS_PER_PAGE);
  const startIndex = (currentPage - 1) * LESSONS_PER_PAGE;
  const paginatedLessons = filteredLessons.slice(startIndex, startIndex + LESSONS_PER_PAGE);

  const isCreator = user?.id === courseData.creator?.id;
  const canEdit = isCreator;
  const canManageInstructors = isCreator;

  const handleEditCourse = () => {
    console.log("Editar curso");
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
                    <h1 className="text-3xl font-bold text-white mb-2">{courseData.name}</h1>
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
                        <p className="text-sm font-medium text-white">{formatDate(courseData.start_date)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-900/60 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-red-400" />
                      <div>
                        <p className="text-xs text-gray-500">Término</p>
                        <p className="text-sm font-medium text-white">{formatDate(courseData.end_date)}</p>
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
                          {getDuration(courseData.start_date, courseData.end_date)}
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
              Aulas ({lessons.length})
            </TabsTrigger>
            <TabsTrigger
              value="instructors"
              className="text-amber-50 data-[state=active]:bg-green-600 data-[state=active]:text-black"
            >
              Instrutores ({instructors.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-gray-900/60 border-gray-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Descrição do curso</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 leading-relaxed">{courseData.description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lessons" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Buscar aulas por título..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-900/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-green-500/50"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  onClick={() => setStatusFilter("all")}
                  className={
                    statusFilter === "all"
                      ? "bg-green-600 text-black"
                      : "border-gray-700 text-gray-300 hover:bg-gray-800"
                  }
                >
                  Todas
                </Button>
                <Button
                  variant={statusFilter === "published" ? "default" : "outline"}
                  onClick={() => setStatusFilter("published")}
                  className={
                    statusFilter === "published"
                      ? "bg-green-600 text-black"
                      : "border-gray-700 text-gray-300 hover:bg-gray-800"
                  }
                >
                  Publicadas
                </Button>
                <Button
                  variant={statusFilter === "draft" ? "default" : "outline"}
                  onClick={() => setStatusFilter("draft")}
                  className={
                    statusFilter === "draft"
                      ? "bg-green-600 text-black"
                      : "border-gray-700 text-gray-300 hover:bg-gray-800"
                  }
                >
                  Rascunhos
                </Button>
                <Button
                  variant={statusFilter === "archived" ? "default" : "outline"}
                  onClick={() => setStatusFilter("archived")}
                  className={
                    statusFilter === "archived"
                      ? "bg-green-600 text-black"
                      : "border-gray-700 text-gray-300 hover:bg-gray-800"
                  }
                >
                  arquivadas
                </Button>
              </div>
              {canEdit && (
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-black font-semibold">
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Aula
                </Button>
              )}
            </div>

            {paginatedLessons.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedLessons.map((lesson) => (
                    <LessonCard key={lesson.id} lesson={lesson} canEdit={canEdit} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 disabled:opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={
                          currentPage === page
                            ? "bg-green-600 text-black"
                            : "border-gray-700 text-gray-300 hover:bg-gray-800"
                        }
                      >
                        {page}
                      </Button>
                    ))}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 disabled:opacity-50"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="bg-gray-900/60 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Nenhuma aula encontrada</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  {searchTerm || statusFilter !== "all"
                    ? "Tente ajustar os filtros ou termo de busca."
                    : "Este curso ainda não possui aulas cadastradas."}
                </p>
                {canEdit && !searchTerm && statusFilter === "all" && (
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-black font-semibold">
                    <Plus className="mr-2 h-4 w-4" />
                    Criar Primeira Aula
                  </Button>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="instructors" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Instrutores do Curso</h3>
              {canManageInstructors && (
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-black font-semibold">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Instrutor
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructors.map((instructor) => (
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
                            <p className="text-sm text-green-400">{instructor.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{instructor.email}</p>
                          </div>
                          <Badge
                            className={
                              instructor.role === "creator"
                                ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                                : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                            }
                          >
                            {instructor.role === "creator" ? "Criador" : "Colaborador"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">{instructor.bio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
