"use client";

import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { lessonDto } from "@/dtos/lesson-dto";
import { LessonForm } from "../forms/lesson-form";

type EditLessonModalProps = {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData: lessonDto;
};

export function EditLessonModal({ open, setIsOpen, initialData }: EditLessonModalProps) {
  const handleSuccess = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-70" />
      <DialogContent className="bg-gray-900/80 border border-gray-700 text-white backdrop-blur-md max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Editar Aula</DialogTitle>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto px-1">
          <LessonForm
            courseId={initialData.course_id}
            creatorId={initialData.creator_id}
            lessonId={initialData.id}
            initialData={initialData}
            onSuccess={handleSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
