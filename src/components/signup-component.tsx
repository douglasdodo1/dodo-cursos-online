"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUpFormData, SignupSchema } from "./schemas/signup-schema";
import { useState } from "react";

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
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: mockRegister,
  });
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    console.log(data);
    await sleep(2000);
    setIsLoading(false);
  };
  
  return (
    <div>
      <div>SignupComponent</div>
    </div>
  );
};
