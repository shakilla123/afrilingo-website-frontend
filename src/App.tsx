
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import AdminDashboard from "./pages/AdminDashboard";
import CoursesPage from "./pages/admin/CoursesPage";
import LessonsPage from "./pages/admin/LessonsPage";
import QuizzesPage from "./pages/admin/QuizzesPage";
import ChallengesPage from "./pages/admin/ChallengesPage";
import ProfilePage from "./pages/admin/ProfilePage";
import SettingsPage from "./pages/admin/SettingsPage";
import NotificationsPage from "./pages/admin/NotificationsPage";
import UsersPage from "./pages/admin/UsersPage";
import CreateCoursePage from "./pages/admin/CreateCoursePage";
import CreateLessonPage from "./pages/admin/CreateLessonPage";
import CreateQuizPage from "./pages/admin/CreateQuizPage";
import CreateChallengePage from "./pages/admin/CreateChallengePage";
import NotFound from "./pages/NotFound";

const App = () => {
  // Create QueryClient inside the component to ensure proper React context
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/courses" element={<CoursesPage />} />
            <Route path="/admin/courses/new" element={<CreateCoursePage />} />
            <Route path="/admin/lessons" element={<LessonsPage />} />
            <Route path="/admin/lessons/new" element={<CreateLessonPage />} />
            <Route path="/admin/quizzes" element={<QuizzesPage />} />
            <Route path="/admin/quizzes/new" element={<CreateQuizPage />} />
            <Route path="/admin/challenges" element={<ChallengesPage />} />
            <Route path="/admin/challenges/new" element={<CreateChallengePage />} />
            <Route path="/admin/profile" element={<ProfilePage />} />
            <Route path="/admin/settings" element={<SettingsPage />} />
            <Route path="/admin/notifications" element={<NotificationsPage />} />
            <Route path="/admin/users" element={<UsersPage />} />
            {/* Course specific routes */}
            <Route path="/admin/courses/:id" element={<div className="p-8 text-center text-amber-900">Course details coming soon!</div>} />
            <Route path="/admin/courses/:id/edit" element={<div className="p-8 text-center text-amber-900">Edit course form coming soon!</div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
