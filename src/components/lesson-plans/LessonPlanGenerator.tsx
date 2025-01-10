import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const LessonPlanGenerator = () => {
  const [subject, setSubject] = useState("")
  const [topic, setTopic] = useState("")
  const [yearGroup, setYearGroup] = useState("")
  const [duration, setDuration] = useState("")
  const [lessonPlan, setLessonPlan] = useState("")
  const [schemeOfWork, setSchemeOfWork] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateContent = async (type: 'lesson-plan' | 'scheme-of-work') => {
    if (!subject || !topic || !yearGroup) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsGenerating(true)
    try {
      const { data, error } = await supabase.functions.invoke('generate-lesson-plan', {
        body: { 
          subject, 
          topic, 
          yearGroup,
          duration,
          type 
        }
      })

      if (error) throw error

      if (type === 'lesson-plan') {
        setLessonPlan(data.content)
        toast.success("Lesson plan generated successfully!")
      } else {
        setSchemeOfWork(data.content)
        toast.success("Scheme of work generated successfully!")
      }
    } catch (error) {
      console.error("Error generating content:", error)
      toast.error("Failed to generate content")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">AI Teaching Resource Generator</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Select onValueChange={setSubject} value={subject}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="History">History</SelectItem>
                <SelectItem value="Geography">Geography</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="yearGroup">Year Group</Label>
            <Select onValueChange={setYearGroup} value={yearGroup}>
              <SelectTrigger>
                <SelectValue placeholder="Select year group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Year 7">Year 7</SelectItem>
                <SelectItem value="Year 8">Year 8</SelectItem>
                <SelectItem value="Year 9">Year 9</SelectItem>
                <SelectItem value="Year 10">Year 10</SelectItem>
                <SelectItem value="Year 11">Year 11</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic (e.g., Quadratic Equations)"
            />
          </div>

          <div>
            <Label htmlFor="duration">Duration</Label>
            <Select onValueChange={setDuration} value={duration}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 hour">1 Hour</SelectItem>
                <SelectItem value="2 hours">2 Hours</SelectItem>
                <SelectItem value="Half term">Half Term</SelectItem>
                <SelectItem value="Full term">Full Term</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="lesson-plan" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lesson-plan">Lesson Plan</TabsTrigger>
            <TabsTrigger value="scheme-of-work">Scheme of Work</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lesson-plan">
            <div className="space-y-4">
              <Button 
                onClick={() => generateContent('lesson-plan')} 
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? "Generating..." : "Generate Lesson Plan"}
              </Button>

              {lessonPlan && (
                <div className="mt-4">
                  <Label>Generated Lesson Plan</Label>
                  <Textarea
                    value={lessonPlan}
                    readOnly
                    className="h-[400px] mt-2"
                  />
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="scheme-of-work">
            <div className="space-y-4">
              <Button 
                onClick={() => generateContent('scheme-of-work')} 
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? "Generating..." : "Generate Scheme of Work"}
              </Button>

              {schemeOfWork && (
                <div className="mt-4">
                  <Label>Generated Scheme of Work</Label>
                  <Textarea
                    value={schemeOfWork}
                    readOnly
                    className="h-[400px] mt-2"
                  />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}