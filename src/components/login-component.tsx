"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, Lock } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthFormData, authSchema } from "./schemas/auth-schema";
import Image from "next/image";
import { useSessionContext } from "@/app/contexts/session-context";
import { useRouter } from "next/navigation";

interface LoginComponentProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const mockLogin = {
  email: "dodo@example.com",
  senha: "123456",
};

export const LoginComponent = ({ setIsLogin }: LoginComponentProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setSession } = useSessionContext();
  const router = useRouter();

  const form = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: mockLogin,
  });

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    console.log(data);
    await sleep(2000);
    setSession({ id: 1, nome: "dodo", email: "dodo@example.com", token: "123" });
    await router.push("/dashboard");
    setIsLoading(false);
  };

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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-200">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                          <Input
                            className="pl-10 h-12 bg-black/40 backdrop-blur-sm border-2 border-gray-600 text-white placeholder:text-gray-500 transition-all duration-200"
                            placeholder="Insira seu email"
                            {...field}
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
                            placeholder="Insira sua senha"
                            {...field}
                          />
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
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </Form>

          <div className="text-center space-y-4">
            <button className="text-sm text-green-400 hover:text-green-300 font-medium hover:underline transition-colors">
              Esqueceu sua senha?
            </button>
            <div className="flex items-center justify-center space-x-2">
              <div className="h-px bg-gray-700 flex-1"></div>
              <span className="text-sm text-gray-500 px-3">ou</span>
              <div className="h-px bg-gray-700 flex-1"></div>
            </div>
            <p className="text-sm text-gray-400">
              Não tem uma conta?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-green-400 hover:text-green-300 font-semibold hover:underline transition-colors"
              >
                Cadastre-se gratuitamente
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
