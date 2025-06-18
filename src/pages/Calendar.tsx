
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
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from "date-fns"

interface Event {
  id: number
  title: string
  description: string
  date: Date
  time: string
  type: "meeting" | "deadline" | "event" | "reminder"
  location?: string
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Team Standup",
    description: "Daily team sync meeting",
    date: new Date(2024, 0, 15),
    time: "09:00",
    type: "meeting",
    location: "Conference Room A"
  },
  {
    id: 2,
    title: "Project Deadline",
    description: "Final submission for Q1 project",
    date: new Date(2024, 0, 20),
    time: "17:00",
    type: "deadline"
  },
  {
    id: 3,
    title: "Company All-Hands",
    description: "Quarterly company meeting",
    date: new Date(2024, 0, 25),
    time: "14:00",
    type: "event",
    location: "Main Auditorium"
  },
  {
    id: 4,
    title: "Code Review",
    description: "Review pending pull requests",
    date: new Date(2024, 0, 18),
    time: "11:00",
    type: "meeting"
  }
]

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const calendarDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date))
  }

  const getEventTypeColor = (type: Event["type"]) => {
    const colors = {
      meeting: "bg-blue-500",
      deadline: "bg-red-500",
      event: "bg-green-500",
      reminder: "bg-yellow-500"
    }
    return colors[type]
  }

  const getEventTypeBadge = (type: Event["type"]) => {
    const variants = {
      meeting: "default",
      deadline: "destructive",
      event: "secondary",
      reminder: "outline"
    } as const
    
    return variants[type]
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground">Manage your schedule and upcoming events.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Today</Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Event</DialogTitle>
                <DialogDescription>
                  Add a new event to your calendar.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Event title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Event description" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="deadline">Deadline</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location (Optional)</Label>
                  <Input id="location" placeholder="Event location" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>
                  Create Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Calendar */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                {format(currentDate, "MMMM yyyy")}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth("prev")}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth("next")}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => {
                const dayEvents = getEventsForDate(day)
                const isCurrentMonth = isSameMonth(day, currentDate)
                const isTodayDate = isToday(day)
                const isSelected = selectedDate && isSameDay(day, selectedDate)

                return (
                  <div
                    key={index}
                    className={`
                      min-h-[80px] p-2 border rounded-lg cursor-pointer transition-colors
                      ${isCurrentMonth ? "bg-background" : "bg-muted/30"}
                      ${isTodayDate ? "ring-2 ring-primary" : ""}
                      ${isSelected ? "bg-primary/10" : ""}
                      hover:bg-muted/50
                    `}
                    onClick={() => setSelectedDate(day)}
                  >
                    <div className={`text-sm font-medium ${!isCurrentMonth ? "text-muted-foreground" : ""}`}>
                      {format(day, "d")}
                    </div>
                    <div className="space-y-1 mt-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs px-1 py-0.5 rounded text-white truncate ${getEventTypeColor(event.type)}`}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-muted-foreground">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Event Details */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate ? format(selectedDate, "MMM d, yyyy") : "Select a Date"}
            </CardTitle>
            <CardDescription>
              {selectedDate ? "Events for this day" : "Click on a date to view events"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDate ? (
              <div className="space-y-4">
                {getEventsForDate(selectedDate).length > 0 ? (
                  getEventsForDate(selectedDate).map((event) => (
                    <div key={event.id} className="space-y-2 p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{event.title}</h4>
                        <Badge variant={getEventTypeBadge(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {event.time}
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No events scheduled</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Select a date to view events</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Calendar
