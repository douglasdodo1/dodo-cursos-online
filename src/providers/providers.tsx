"use client";

import { SessionProvider } from "@/contexts/session-context";
import { CourseProvider } from "@/contexts/course-context";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <CourseProvider>{children}</CourseProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
