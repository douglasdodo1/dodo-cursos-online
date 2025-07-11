"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LessonForm } from "../forms/lesson-form";
import { lessonDto } from "@/dtos/lesson-dto";

interface LessonModalProps {
  courseId: number;
  creatorId: number;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLessons: React.Dispatch<React.SetStateAction<lessonDto[]>>;
}

export default function AddLessonModal({ courseId, creatorId, isOpen, setIsOpen, setLessons }: LessonModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-gray-900 border border-gray-700/50 backdrop-blur-sm max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">Nova Aula</DialogTitle>
        </DialogHeader>

        <LessonForm courseId={courseId} creatorId={creatorId} setIsOpen={setIsOpen} setLessons={setLessons} />
      </DialogContent>
    </Dialog>
  );
}
