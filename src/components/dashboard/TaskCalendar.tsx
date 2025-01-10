import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { Calendar as CalendarIcon } from "lucide-react"

interface Task {
  title: string
  date: Date
  description: string
}

export const TaskCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [tasks] = useState<Task[]>([
    {
      title: "Review Student Submissions",
      date: new Date(),
      description: "Review and grade recent student assignments"
    },
    {
      title: "Prepare Lesson Materials",
      date: new Date(Date.now() + 86400000), // Tomorrow
      description: "Create materials for next week's lessons"
    }
  ])

  const generateICalLink = () => {
    let icalContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//TeachMarks//Calendar//EN",
      ...tasks.map(task => [
        "BEGIN:VEVENT",
        `DTSTART:${task.date.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
        `SUMMARY:${task.title}`,
        `DESCRIPTION:${task.description}`,
        "END:VEVENT"
      ].join("\n")),
      "END:VCALENDAR"
    ].join("\n")

    const blob = new Blob([icalContent], { type: "text/calendar" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "tasks.ics"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const generateGoogleCalendarLink = (task: Task) => {
    const baseUrl = "https://calendar.google.com/calendar/render"
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: task.title,
      details: task.description,
      dates: `${task.date.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${task.date.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`
    })
    return `${baseUrl}?${params.toString()}`
  }

  const generateOutlookLink = (task: Task) => {
    const baseUrl = "https://outlook.live.com/calendar/0/deeplink/compose"
    const params = new URLSearchParams({
      subject: task.title,
      body: task.description,
      startdt: task.date.toISOString(),
      enddt: task.date.toISOString()
    })
    return `${baseUrl}?${params.toString()}`
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Upcoming Tasks</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            generateICalLink()
            toast.success("Calendar file downloaded successfully!")
          }}
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          Export Calendar
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
        
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <Card key={index} className="p-4">
              <h4 className="font-medium">{task.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(generateGoogleCalendarLink(task), '_blank')}
                >
                  Add to Google
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(generateOutlookLink(task), '_blank')}
                >
                  Add to Outlook
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  )
}