"use client";
import { LogOut, Settings, User } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useSessionContext } from "@/app/contexts/session-context";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function NavbarComponent() {
  const { session } = useSessionContext();
  const sessionContext = useSessionContext();
  const router = useRouter();

  const logout = async () => {
    sessionContext.setSession(null);
    await router.push("/");
  };

  const user = session;
  return (
    <header className="flex justify-center border-b border-gray-800/50 bg-gray-900/30 backdrop-blur-xl max-w-screen">
      <div className="max-w-screen pl-12 pr-12 container px-6 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-gray-800 to-black p-2 rounded-xl border border-gray-700/50">
              <Image src="/images/logo.png" alt="logo" width={30} height={30} priority />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Dodo Cursos</h1>
              <p className="text-sm text-gray-400">Dashboard do Instrutor</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={null} className="relative h-17 w-17 p-0 rounded-full overflow-hidden">
                <Avatar className="h-full w-full">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="avatar"
                    className="h-full w-full aspect-square  rounded-full  object-cover flex-shrink-0"
                  />
                  <AvatarFallback className="bg-gray-800 text-green-400">
                    {user?.nome
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-900/95 backdrop-blur-xl border-gray-700/50" align="end">
              <DropdownMenuLabel className="text-gray-200">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user?.nome}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700/50" />
              <DropdownMenuItem className="text-gray-300 hover:bg-gray-800/50">
                <User className="mr-2 h-4 w-4" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:bg-gray-800/50">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700/50" />
              <DropdownMenuItem onClick={() => logout()} className="text-red-400 hover:bg-red-950/50">
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
