
import { useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, MoreHorizontal, User, Calendar, Tag } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Task {
  id: number
  title: string
  description: string
  status: "todo" | "in-progress" | "review" | "done"
  priority: "low" | "medium" | "high"
  assignee: string
  dueDate: string
  tags: string[]
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Design Homepage",
    description: "Create wireframes and mockups for the new homepage",
    status: "todo",
    priority: "high",
    assignee: "John Doe",
    dueDate: "2024-01-20",
    tags: ["Design", "UI/UX"]
  },
  {
    id: 2,
    title: "Implement Authentication",
    description: "Add login and registration functionality",
    status: "in-progress",
    priority: "high",
    assignee: "Jane Smith",
    dueDate: "2024-01-25",
    tags: ["Backend", "Security"]
  },
  {
    id: 3,
    title: "Write Unit Tests",
    description: "Create comprehensive test suite for API endpoints",
    status: "todo",
    priority: "medium",
    assignee: "Bob Johnson",
    dueDate: "2024-01-30",
    tags: ["Testing", "Backend"]
  },
  {
    id: 4,
    title: "Code Review",
    description: "Review pull requests from the team",
    status: "review",
    priority: "medium",
    assignee: "Alice Brown",
    dueDate: "2024-01-18",
    tags: ["Review", "Quality"]
  },
  {
    id: 5,
    title: "Deploy to Production",
    description: "Deploy the latest version to production environment",
    status: "done",
    priority: "high",
    assignee: "Charlie Wilson",
    dueDate: "2024-01-15",
    tags: ["DevOps", "Deployment"]
  }
]

const columns = [
  { id: "todo", title: "To Do", color: "bg-slate-100 dark:bg-slate-800" },
  { id: "in-progress", title: "In Progress", color: "bg-blue-100 dark:bg-blue-900" },
  { id: "review", title: "Review", color: "bg-yellow-100 dark:bg-yellow-900" },
  { id: "done", title: "Done", color: "bg-green-100 dark:bg-green-900" }
]

const Kanban = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [draggedTask, setDraggedTask] = useState<Task | null>(null)

  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter(task => task.status === status)
  }

  const getPriorityColor = (priority: Task["priority"]) => {
    const colors = {
      low: "bg-green-500",
      medium: "bg-yellow-500",
      high: "bg-red-500"
    }
    return colors[priority]
  }

  const getPriorityBadge = (priority: Task["priority"]) => {
    const variants = {
      low: "secondary",
      medium: "outline",
      high: "destructive"
    } as const
    
    return variants[priority]
  }

  const handleDragStart = (task: Task) => {
    setDraggedTask(task)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, newStatus: Task["status"]) => {
    e.preventDefault()
    if (draggedTask) {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === draggedTask.id ? { ...task, status: newStatus } : task
        )
      )
      setDraggedTask(null)
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Kanban Board</h1>
            <p className="text-muted-foreground">Organize and track your tasks with drag-and-drop functionality.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Filter</Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
                <DialogDescription>
                  Add a new task to your Kanban board.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Task title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Task description" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="assignee">Assignee</Label>
                    <Input id="assignee" placeholder="Assigned to" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" placeholder="Enter tags separated by commas" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>
                  Create Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <Card key={column.id} className={`${column.color} border-2 border-dashed border-border/40`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                {column.title}
                <Badge variant="secondary" className="ml-2">
                  {getTasksByStatus(column.id as Task["status"]).length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent 
              className="space-y-3 min-h-[500px]"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id as Task["status"])}
            >
              {getTasksByStatus(column.id as Task["status"]).map((task) => (
                <Card
                  key={task.id}
                  className="cursor-move hover:shadow-lg transition-shadow bg-background"
                  draggable
                  onDragStart={() => handleDragStart(task)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-medium leading-none">
                        {task.title}
                      </CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Task</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete Task
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription className="text-xs">
                      {task.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    {/* Priority & Tags */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={getPriorityBadge(task.priority)} className="text-xs">
                        {task.priority}
                      </Badge>
                      {task.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <Tag className="w-2 h-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Assignee & Due Date */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Avatar className="w-5 h-5">
                          <AvatarFallback className="text-xs">
                            {getInitials(task.assignee)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{task.assignee}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{task.dueDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Kanban
