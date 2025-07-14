"use client";
import { Dialog, DialogContent, DialogHeader, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { CourseForm } from "../forms/course-form";

interface EditCourseModalProps {
  id: number;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export function EditCourseModal({ id, open, setOpen }: EditCourseModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-70" />

      <DialogContent className="bg-gray-900/80 border border-gray-700 text-white backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">Editar Curso</DialogTitle>
        </DialogHeader>

        <CourseForm courseId={id} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
