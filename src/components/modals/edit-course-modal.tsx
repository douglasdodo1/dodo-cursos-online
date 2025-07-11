"use client";
import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { CourseFormData } from "../schemas/course-schema";
import { EditCourseForm } from "../forms/edit-course-form";
import { CourseDto } from "@/dtos/course-dto";

interface EditCourseModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  initialData: Partial<CourseFormData>;
  setCurrentCourse: React.Dispatch<React.SetStateAction<CourseDto>>;
}

export function EditCourseModal({ open, setOpen, initialData, setCurrentCourse }: EditCourseModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-70" />

      <DialogContent className="bg-gray-900/80 border border-gray-700 text-white backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">Editar Curso</DialogTitle>
        </DialogHeader>

        <EditCourseForm initialData={initialData} setOpen={setOpen} setCurrentCourse={setCurrentCourse} />
      </DialogContent>
    </Dialog>
  );
}
