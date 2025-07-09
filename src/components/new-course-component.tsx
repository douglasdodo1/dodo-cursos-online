"use client";

import { CourseForm } from "./forms/course-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { FileText } from "lucide-react";

export const NewCourseComponent = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Criar Novo Curso</h2>
          <p className="text-gray-400">Preencha as informações para criar um novo curso</p>
        </div>

        <Card className="bg-gray-900/60 border-gray-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <FileText className="mr-2 h-5 w-5 text-green-400" />
              Informações do Curso
            </CardTitle>
            <CardDescription className="text-gray-400">
              Todos os campos são obrigatórios para criar um curso
            </CardDescription>
          </CardHeader>

          <CardContent>
            <CourseForm />
          </CardContent>
        </Card>

        <div className="mt-6 p-4 bg-gray-900/40 rounded-lg border border-gray-700/30">
          <h4 className="text-sm font-semibold text-white mb-2">💡 Dicas para criar um bom curso:</h4>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Use um nome claro e descritivo que indique o nível e tecnologias</li>
            <li>• Na descrição, mencione os pré-requisitos e o que o aluno vai aprender</li>
            <li>• Defina datas realistas considerando o tempo necessário para criar o conteúdo</li>
            <li>• Você poderá adicionar aulas e instrutores após criar o curso</li>
          </ul>
        </div>
      </div>
    </main>
  );
};
