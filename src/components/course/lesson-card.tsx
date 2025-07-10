import { getStatusColor } from "@/app/helpers/get-status-color";
import { getStatusText } from "@/app/helpers/get-status-text";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Play, MoreVertical, Edit, Trash2, Archive, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { lessonDto } from "@/dtos/lesson-dto";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";

type LessonCardProps = {
  lesson: lessonDto;
  canEdit: boolean;
};
export const LessonCard = ({ lesson, canEdit }: LessonCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <Eye className="h-4 w-4" />;
      case "draft":
        return <Edit className="h-4 w-4" />;
      case "archived":
        return <Archive className="h-4 w-4" />;
      default:
        return <EyeOff className="h-4 w-4" />;
    }
  };
  return (
    <Card
      key={lesson.id}
      className="bg-gray-900/60 border-gray-700/50 hover:bg-gray-900/80 transition-all duration-200 backdrop-blur-sm"
    >
      <div className="aspect-video bg-gray-800/50 rounded-t-lg overflow-hidden relative">
        <Image src={"/images/logo.png"} fill alt={lesson.title} className="w-full h-1/2 object-cover" />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          <Label>{lesson.duration} minutos</Label>
        </div>
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg line-clamp-1">{lesson.title}</CardTitle>
        <CardDescription className="text-gray-400 line-clamp-2">{lesson.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
          <span>Aula {lesson.order}</span>
          <Badge className={`${getStatusColor(lesson.status)} text-xs`}>
            {getStatusIcon(lesson.status)}
            <span className="ml-1">{getStatusText(lesson.status)}</span>
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1 border-gray-700 text-gray-300 bg-transparent">
            <Play className="mr-1 h-4 w-4" />
            Assistir
          </Button>
          {canEdit && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-900/95 backdrop-blur-xl border-gray-700/50" align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="text-gray-300 hover:bg-gray-800/50"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar Aula
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400 hover:bg-red-950/50">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Excluir Aula
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
