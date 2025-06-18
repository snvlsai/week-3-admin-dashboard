
import { ChevronRight, Home, BarChart3, Database, Calendar, Kanban, Settings, Sun, Moon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
    color: "text-blue-500",
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
    color: "text-green-500",
  },
  {
    title: "Data Tables",
    url: "/tables",
    icon: Database,
    color: "text-purple-500",
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
    color: "text-orange-500",
  },
  {
    title: "Kanban Board",
    url: "/kanban",
    icon: Kanban,
    color: "text-pink-500",
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    color: "text-gray-500",
  },
]

export function AppSidebar() {
  const location = useLocation()
  const { theme, setTheme } = useTheme()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <BarChart3 className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SNVL SAI</span>
            <span className="text-xs text-muted-foreground">Admin Dashboard</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <Link to={item.url} className="flex items-center gap-2">
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                      <span>{item.title}</span>
                      {location.pathname === item.url && (
                        <ChevronRight className="ml-auto h-4 w-4" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-border">
        <div className="flex items-center justify-between p-4">
          <span className="text-xs text-muted-foreground">Theme</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="h-8 w-8 p-0 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 dark:hover:from-yellow-900 dark:hover:to-orange-900"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4 text-indigo-500" />
            ) : (
              <Sun className="h-4 w-4 text-yellow-500" />
            )}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
