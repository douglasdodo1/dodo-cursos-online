// components/modals/AddInstructorModal.tsx
"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Search, X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { InstructorsDto } from "@/dtos/instructors-dto";

interface AddInstructorModalProps {
  courseId: number;
  open: boolean;
  setOpen: (value: boolean) => void;
  setInstructors: Dispatch<SetStateAction<InstructorsDto[]>>;
}

export function AddInstructorModal({ courseId, open, setOpen, setInstructors }: AddInstructorModalProps) {
  const [search, setSearch] = useState("");
  const [foundInstructor, setFoundInstructor] = useState<InstructorsDto | null>(null);

  const mockResults: InstructorsDto = {
    id: 5,
    name: "Douglas Gemir",
    email: "douglas@example.com",
    bio: "Desenvolvedor apaixonado por React, TypeScript e educação.",
    avatar: "https://avatars.githubusercontent.com/u/1?v=4",
    title: "Senior Frontend Engineer",
    expertises: ["React", "Next.js", "TypeScript"],
    linkedin: "https://linkedin.com/in/douglas",
    github: "https://github.com/douglas",
  };

  useEffect(() => {
    if (open) {
      setSearch("");
      setFoundInstructor(null);
    }
  }, [open]);

  function handleSearch() {
    const q = search.trim().toLowerCase();
    if (mockResults.email.toLowerCase().includes(q) && q.length > 0) {
      setFoundInstructor(mockResults);
    } else {
      setFoundInstructor(null);
      alert("Instrutor não encontrado.");
    }
  }

  function handleClear() {
    setSearch("");
    setFoundInstructor(null);
  }

  function handleAdd() {
    console.log("Adicionando instrutor ao curso", courseId, foundInstructor);
    setInstructors((prevInstructors) => [...prevInstructors, foundInstructor!]);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl bg-black/50 border border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-white text-2xl">Adicionar Instrutor</DialogTitle>
        </DialogHeader>

        <Card className="bg-transparent border-none shadow-none">
          <CardHeader className="p-0" />
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Buscar por e‑mail"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="bg-black/40 text-white border-2 border-gray-700"
              />
              <Button onClick={handleSearch} className="bg-green-600">
                <Search className="h-4 w-4" />
              </Button>
              <Button onClick={handleClear} variant="outline" className="border-gray-700 text-white">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {foundInstructor && (
              <div className="p-4 space-y-2 border border-gray-700 rounded-md bg-black/30">
                <Label className="text-amber-50">Nome: {foundInstructor.name}</Label>
                <Label className="text-amber-50">Email: {foundInstructor.email}</Label>
                <Label className="text-amber-50">Título:{foundInstructor.title}</Label>
                <Button onClick={handleAdd} className="mt-2 bg-green-600 w-full">
                  <Plus className="h-4 w-4 mr-2" /> Adicionar Instrutor
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
