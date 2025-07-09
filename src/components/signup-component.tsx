"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpFormData, SignupSchema } from "./schemas/signup-schema";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Mail, Loader2, Lock, Eye, EyeOff, User, CheckCircle } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import Image from "next/image";
import { Button } from "./ui/button";

interface SignupComponentProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const mockRegister = {
  nome: "dodo",
  email: "dodo@example.com",
  senha: "123456",
  confirmarSenha: "123456",
};

export const SignupComponent = ({ setIsLogin }: SignupComponentProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean[]>([false, false]);
  const [signupSuccess, setSignupSuccess] = useState<boolean>(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: mockRegister,
  });
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    console.log(data);
    await sleep(1000);
    setIsLoading(false);
    setSignupSuccess(true);
    await sleep(3000);
    setSignupSuccess(false);
    setIsLogin(true);
  };

  const togglePassword = (index: number) => {
    setShowPassword((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  if (signupSuccess == false) {
    return (
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex justify-center mb-6 mt-8">
          <div className="relative">
            <div className="bg-gradient-to-r from-gray-800 to-black p-4 rounded-2xl shadow-2xl border border-gray-700/50">
              <Image src="/images/logo.png" alt="logo" width={70} height={70} priority />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/25">
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-3">
          Bem-vindo de volta
        </h1>
        <p className="text-gray-400 text-lg pb-10">Continue sua jornada de aprendizado</p>
        <Card className=" w-full sm:w-3/4 md:w-1/2 lg:w-1/4 backdrop-blur-xl bg-gray-900/80 border border-gray-700/50 shadow-2xl shadow-black/50">
          <CardContent className="p-8 pb-4">
            <Form {...form}>
              <form className="pb-6" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6 pb-6">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-200">Nome completo</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-200" />
                            <Input
                              className="pl-10 h-12 bg-black/40 backdrop-blur-sm border-2 border-gray-600 text-white placeholder:text-gray-500 transition-all duration-200"
                              placeholder="Insira seu nome"
                              {...field}
                              disabled={isLoading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 mt-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-200">E-mail</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                            <Input
                              className="pl-10 h-12 bg-black/40 backdrop-blur-sm border-2 border-gray-600 text-white placeholder:text-gray-500 transition-all duration-200"
                              placeholder="seu@email.com"
                              {...field}
                              disabled={isLoading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 mt-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="senha"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-200">Senha</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                            <Input
                              className="pl-10 h-12 bg-black/40 backdrop-blur-sm border-2 border-gray-600 text-white placeholder:text-gray-500 transition-all duration-200"
                              placeholder="Minimo 6 caracteres"
                              type={showPassword[0] ? "text" : "password"}
                              {...field}
                              disabled={isLoading}
                            />
                            <Button
                              className="absolute right-0 top-1/2 -translate-y-1/2 h-12 w-12"
                              onClick={() => togglePassword(0)}
                              variant={null}
                              type="button"
                            >
                              {showPassword[0] ? (
                                <Eye size={24} className=" text-gray-500" />
                              ) : (
                                <EyeOff size={24} className=" w-12 h-12 text-gray-500" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 mt-1" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmarSenha"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-200">Confirmar senha</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                            <Input
                              className="pl-10 h-12 bg-black/40 backdrop-blur-sm border-2 border-gray-600 text-white placeholder:text-gray-500 transition-all duration-200"
                              placeholder="Digite a senha novamente"
                              type={showPassword[1] ? "text" : "password"}
                              {...field}
                              disabled={isLoading}
                            />
                            <Button
                              className="absolute right-0 top-1/2 -translate-y-1/2 p-0"
                              onClick={() => togglePassword(1)}
                              variant={null}
                              type="button"
                            >
                              {showPassword[1] ? (
                                <Eye size={30} className=" text-gray-500" />
                              ) : (
                                <EyeOff size={24} className=" w-12 h-12 text-gray-500" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 mt-1" />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-black font-semibold text-base shadow-lg shadow-green-500/25 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] border-0"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Criando conta...
                    </>
                  ) : (
                    "Criar conta"
                  )}
                </Button>
              </form>
            </Form>

            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="h-px bg-gray-700 flex-1"></div>
                <span className="text-sm text-gray-500 px-3">ou</span>
                <div className="h-px bg-gray-700 flex-1"></div>
              </div>
              <p className="text-sm text-gray-400">
                Já tem uma conta?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-green-400 hover:text-green-300 font-semibold hover:underline transition-colors"
                >
                  Faça login
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md text-center">
        <div className="bg-green-500/20 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-12 w-12 text-green-400" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Conta Criada com Sucesso!</h2>
        <p className="text-gray-400 mb-6">
          Bem-vindo(a) à <span className="text-green-400 font-semibold">Dodo Learning</span>!<br />
          Redirecionando para o login...
        </p>
        <div className="flex items-center justify-center space-x-2">
          <Loader2 className="h-5 w-5 animate-spin text-green-400" />
          <span className="text-sm text-gray-500">Aguarde um momento</span>
        </div>
      </div>
    </div>
  );
};
