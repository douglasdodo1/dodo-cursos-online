import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { Button } from "../ui/button";
import { TabsContent } from "../ui/tabs";
import { Input } from "../ui/input";
import { LessonCard } from "./lesson-card";
import { lessonDto } from "@/dtos/lesson-dto";
import { useState } from "react";
import LessonComponent from "../modals/add-lesson-modal";
import { CourseDto } from "@/dtos/course-dto";

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: "all" | "published" | "draft" | "archived";
  setStatusFilter: React.Dispatch<React.SetStateAction<"all" | "published" | "draft" | "archived">>;
  canEdit: boolean;
  paginatedLessons: lessonDto[];
  setPaginatedLessons: React.Dispatch<React.SetStateAction<lessonDto[]>>;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  course: CourseDto;
};

export const LessonTypeComponent = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  canEdit,
  paginatedLessons,
  setPaginatedLessons,
  totalPages,
  currentPage,
  setCurrentPage,
  course,
}: Props) => {
  const [isOpenLessonCreateModal, setIsOpenLessonCreateModal] = useState<boolean>(false);

  const handleCreateLesson = () => {
    setIsOpenLessonCreateModal(true);
  };

  return (
    <TabsContent value="lessons" className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 lm: justify-between items-center">
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
                : "border-gray-700 text-gray-300 hover:bg-gray-800  bg-gray-600"
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
                : "border-gray-700 text-gray-300 hover:bg-gray-800 bg-gray-600"
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
                : "border-gray-700 text-gray-300 hover:bg-gray-800  bg-gray-600"
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
                : "border-gray-700 text-gray-300 hover:bg-gray-800  bg-gray-600"
            }
          >
            arquivadas
          </Button>
        </div>

        <Button
          onClick={handleCreateLesson}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-black font-semibold"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova Aula
        </Button>
        {course.id ? (
          <LessonComponent
            isOpen={isOpenLessonCreateModal}
            setIsOpen={setIsOpenLessonCreateModal}
            courseId={course.id}
            creatorId={0}
            setLessons={setPaginatedLessons}
          />
        ) : (
          <div></div>
        )}
      </div>

      {paginatedLessons.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedLessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} setLessons={setPaginatedLessons} />
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
                    currentPage === page ? "bg-green-600 text-black" : "border-gray-700 text-gray-300 hover:bg-gray-800"
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
  );
};
