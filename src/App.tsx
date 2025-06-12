
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
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
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/courses" element={
                <ProtectedRoute>
                  <CoursesPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/courses/new" element={
                <ProtectedRoute>
                  <CreateCoursePage />
                </ProtectedRoute>
              } />
              <Route path="/admin/lessons" element={
                <ProtectedRoute>
                  <LessonsPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/lessons/new" element={
                <ProtectedRoute>
                  <CreateLessonPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/quizzes" element={
                <ProtectedRoute>
                  <QuizzesPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/quizzes/new" element={
                <ProtectedRoute>
                  <CreateQuizPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/challenges" element={
                <ProtectedRoute>
                  <ChallengesPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/challenges/new" element={
                <ProtectedRoute>
                  <CreateChallengePage />
                </ProtectedRoute>
              } />
              <Route path="/admin/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/admin/settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/notifications" element={
                <ProtectedRoute>
                  <NotificationsPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/users" element={
                <ProtectedRoute>
                  <UsersPage />
                </ProtectedRoute>
              } />
              {/* Course specific routes */}
              <Route path="/admin/courses/:id" element={
                <ProtectedRoute>
                  <div className="p-8 text-center text-amber-900">Course details coming soon!</div>
                </ProtectedRoute>
              } />
              <Route path="/admin/courses/:id/edit" element={
                <ProtectedRoute>
                  <div className="p-8 text-center text-amber-900">Edit course form coming soon!</div>
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
