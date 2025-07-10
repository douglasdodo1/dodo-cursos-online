"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LessonForm } from "./forms/lesson-form";

export default function LessonComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-4">
      <Card className="w-full max-w-lg bg-gray-900/60 border-gray-700/50 backdrop-blur-sm">
        <CardHeader className="pb-2 px-6 pt-6">
          <CardTitle className="text-white text-2xl">Nova Aula</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <LessonForm courseId={123} creatorId={456} />
        </CardContent>
      </Card>
    </div>
  );
}
