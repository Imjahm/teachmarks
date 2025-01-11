import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar"
import { FileText, Home, BookOpen, GraduationCap, UserSquare2, BookOpenCheck, Upload, CheckSquare, BarChart, Users } from "lucide-react"
import { useLocation } from "react-router-dom"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/" data-active={location.pathname === "/"}>
                        <Home className="w-4 h-4" />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/rubrics" data-active={location.pathname.startsWith("/rubrics")}>
                        <BookOpen className="w-4 h-4" />
                        <span>Rubrics</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/upload" data-active={location.pathname === "/upload"}>
                        <Upload className="w-4 h-4" />
                        <span>Upload</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/marking" data-active={location.pathname === "/marking"}>
                        <CheckSquare className="w-4 h-4" />
                        <span>Marking</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/lesson-plans" data-active={location.pathname === "/lesson-plans"}>
                        <GraduationCap className="w-4 h-4" />
                        <span>Lesson Plans</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/personas" data-active={location.pathname === "/personas"}>
                        <UserSquare2 className="w-4 h-4" />
                        <span>User Personas</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/resources" data-active={location.pathname === "/resources"}>
                        <BookOpenCheck className="w-4 h-4" />
                        <span>Resources</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/students" data-active={location.pathname === "/students"}>
                        <Users className="w-4 h-4" />
                        <span>Students</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href="/school-results" data-active={location.pathname === "/school-results"}>
                        <BarChart className="w-4 h-4" />
                        <span>School Results</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-6">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}

export default Layout