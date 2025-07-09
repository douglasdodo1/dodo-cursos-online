"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { FileText, Type, Calendar, Loader2, Save } from "lucide-react";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { format, parse } from "date-fns";
import { CourseFormData, courseSchema } from "../schemas/course-schema";
import { CourseDto } from "@/dtos/course-dto";

export const CourseForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const mockCourse: CourseDto = {
    name: "React Avançado",
    description: "Curso de React Avançado",
    start_date: new Date(),
    end_date: new Date(),
  };

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: mockCourse,
  });

  const handleSubmit = (data: CourseFormData) => {
    setIsLoading(true);
    console.log(data);
    setIsLoading(false);
  };

  const handleCancel = () => {
    router.back();
  };

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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Type className="h-4 w-4 text-green-400" />
                        Nome do Curso
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Ex: React Avançado - Hooks e Performance"
                          disabled={isLoading}
                          className={`h-12 bg-black/40 backdrop-blur-sm border-2 text-white placeholder:text-gray-500 transition-all duration-200 ${
                            fieldState.error
                              ? "border-red-500/50 focus:border-red-400 focus:ring-red-500/20"
                              : "border-gray-700/50 focus:border-green-500/50 focus:ring-green-500/20 hover:border-gray-600/50"
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500">Mínimo de 3 caracteres</p>
                    </FormItem>
                  )}
                />

                {/* Descrição */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-400" />
                        Descrição
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Descreva o conteúdo e objetivos do curso..."
                          disabled={isLoading}
                          className={`min-h-[120px] bg-black/40 backdrop-blur-sm border-2 text-white placeholder:text-gray-500 transition-all duration-200 resize-none ${
                            fieldState.error
                              ? "border-red-500/50 focus:border-red-400 focus:ring-red-500/20"
                              : "border-gray-700/50 focus:border-green-500/50 focus:ring-green-500/20 hover:border-gray-600/50"
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500">
                        {field.value?.length || 0}/500 caracteres
                        {(field.value?.length ?? 0) > 450 && (
                          <span className="text-yellow-400 ml-2">({500 - (field.value?.length ?? 0)} restantes)</span>
                        )}
                      </p>
                    </FormItem>
                  )}
                />

                {/* Datas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Start Date */}
                  <FormField
                    control={form.control}
                    name="start_date"
                    render={({ field, fieldState }) => {
                      const str = field.value instanceof Date ? format(field.value, "dd/MM/yyyy") : "";
                      return (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-green-400" />
                            Data de Início
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              value={str}
                              placeholder="dd/MM/yyyy"
                              disabled={isLoading}
                              onChange={(e) => {
                                const parsed = parse(e.target.value, "dd/MM/yyyy", new Date());
                                field.onChange(isNaN(parsed.getTime()) ? null : parsed);
                              }}
                              className={`h-12 bg-black/40 backdrop-blur-sm border-2 text-white transition-all duration-200 ${
                                fieldState.error
                                  ? "border-red-500/50 focus:border-red-400 focus:ring-red-500/20"
                                  : "border-gray-700/50 focus:border-green-500/50 focus:ring-green-500/20 hover:border-gray-600/50"
                              }`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  {/* End Date */}
                  <FormField
                    control={form.control}
                    name="end_date"
                    render={({ field, fieldState }) => {
                      const str = field.value instanceof Date ? format(field.value, "dd/MM/yyyy") : "";
                      return (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-red-400" />
                            Data de Término
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              value={str}
                              placeholder="dd/MM/yyyy"
                              disabled={isLoading}
                              onChange={(e) => {
                                const parsed = parse(e.target.value, "dd/MM/yyyy", new Date());
                                field.onChange(isNaN(parsed.getTime()) ? null : parsed);
                              }}
                              className={`h-12 bg-black/40 backdrop-blur-sm border-2 text-white transition-all duration-200 ${
                                fieldState.error
                                  ? "border-red-500/50 focus:border-red-400 focus:ring-red-500/20"
                                  : "border-gray-700/50 focus:border-green-500/50 focus:ring-green-500/20 hover:border-gray-600/50"
                              }`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="flex-1 h-12 border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-black font-semibold shadow-lg shadow-green-500/25 transition-all duration-200"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Criando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-5 w-5" />
                        Criar Curso
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
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
