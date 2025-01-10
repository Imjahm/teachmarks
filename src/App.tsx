import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { SessionContextProvider } from "@supabase/auth-helpers-react"
import Layout from "./components/Layout"
import Index from "./pages/Index"
import Auth from "./pages/Auth"
import { RubricUpload } from "./components/RubricUpload"
import { RubricsList } from "./components/rubrics/RubricsList"
import { RubricDetails } from "./components/rubrics/RubricDetails"
import { LessonPlanGenerator } from "./components/lesson-plans/LessonPlanGenerator"
import { CurriculumStandardsList } from "./components/curriculum/CurriculumStandardsList"
import { supabase } from "./integrations/supabase/client"

const queryClient = new QueryClient()

const App = () => {
  const [supabaseClient] = useState(() => supabase)

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/" element={
                <RequireAuth>
                  <Layout>
                    <Index />
                  </Layout>
                </RequireAuth>
              } />
              <Route path="/curriculum" element={
                <RequireAuth>
                  <Layout>
                    <CurriculumStandardsList />
                  </Layout>
                </RequireAuth>
              } />
              <Route path="/rubrics" element={
                <RequireAuth>
                  <Layout>
                    <RubricsList />
                  </Layout>
                </RequireAuth>
              } />
              <Route path="/rubrics/upload" element={
                <RequireAuth>
                  <Layout>
                    <RubricUpload />
                  </Layout>
                </RequireAuth>
              } />
              <Route path="/rubrics/:id" element={
                <RequireAuth>
                  <Layout>
                    <RubricDetails />
                  </Layout>
                </RequireAuth>
              } />
              <Route path="/lesson-plans" element={
                <RequireAuth>
                  <Layout>
                    <LessonPlanGenerator />
                  </Layout>
                </RequireAuth>
              } />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </SessionContextProvider>
  )
}

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default App