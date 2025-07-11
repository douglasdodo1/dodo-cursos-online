"use client";

import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { lessonDto } from "@/dtos/lesson-dto";
import { EditLessonForm } from "../forms/edit-lesson-form";

type EditLessonModalProps = {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialData: lessonDto;
  setLessons: React.Dispatch<React.SetStateAction<lessonDto[]>>;
};

export function EditLessonModal({ open, setIsOpen, initialData, setLessons }: EditLessonModalProps) {
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-70" />
      <DialogContent className="bg-gray-900/80 border border-gray-700 text-white backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Editar Aula</DialogTitle>
        </DialogHeader>

        <EditLessonForm initialData={initialData} setIsOpen={setIsOpen} setLessons={setLessons} />
      </DialogContent>
    </Dialog>
  );
}
