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
import EditCoursePage from "./pages/admin/EditCoursePage";
import ViewCoursePage from "./pages/admin/ViewCoursePage";
import CreateLessonPage from "./pages/admin/CreateLessonPage";
import EditLessonPage from "./pages/admin/EditLessonPage";
import ViewLessonPage from "./pages/admin/ViewLessonPage";
import CreateQuizPage from "./pages/admin/CreateQuizPage";
import CreateChallengePage from "./pages/admin/CreateChallengePage";
import LanguagesPage from "./pages/admin/LanguagesPage";
import CreateLanguagePage from "./pages/admin/CreateLanguagePage";
import EditLanguagePage from "./pages/admin/EditLanguagePage";
import ViewLanguagePage from "./pages/admin/ViewLanguagePage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import NotFound from "./pages/NotFound";
import QuestionsPage from "./pages/admin/QuestionsPage";
import CreateQuestionPage from "./pages/admin/CreateQuestionPage";
import EditQuestionPage from "./pages/admin/EditQuestionPage";
import ViewQuestionPage from "./pages/admin/ViewQuestionPage";

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
              <Route path="/admin/languages" element={
                <ProtectedRoute>
                  <LanguagesPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/languages/new" element={
                <ProtectedRoute>
                  <CreateLanguagePage />
                </ProtectedRoute>
              } />
              <Route path="/admin/languages/:id/edit" element={
                <ProtectedRoute>
                  <EditLanguagePage />
                </ProtectedRoute>
              } />
              <Route path="/admin/languages/:id/view" element={
                <ProtectedRoute>
                  <ViewLanguagePage />
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
              <Route path="/admin/courses/:id/edit" element={
                <ProtectedRoute>
                  <EditCoursePage />
                </ProtectedRoute>
              } />
              <Route path="/admin/courses/:id/view" element={
                <ProtectedRoute>
                  <ViewCoursePage />
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
              <Route path="/admin/lessons/:id/edit" element={
                <ProtectedRoute>
                  <EditLessonPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/lessons/:id/view" element={
                <ProtectedRoute>
                  <ViewLessonPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/questions" element={
                <ProtectedRoute>
                  <QuestionsPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/questions/new" element={
                <ProtectedRoute>
                  <CreateQuestionPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/questions/:id/edit" element={
                <ProtectedRoute>
                  <EditQuestionPage />
                </ProtectedRoute>
              } />
              <Route path="/admin/questions/:id/view" element={
                <ProtectedRoute>
                  <ViewQuestionPage />
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
              <Route path="/admin/analytics" element={
                <ProtectedRoute>
                  <AnalyticsPage />
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
