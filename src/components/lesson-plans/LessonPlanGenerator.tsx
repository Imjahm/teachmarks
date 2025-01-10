import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"

export const LessonPlanGenerator = () => {
  const [subject, setSubject] = useState("")
  const [topic, setTopic] = useState("")
  const [lessonPlan, setLessonPlan] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateLessonPlan = async () => {
    if (!subject || !topic) {
      toast.error("Please enter both subject and topic")
      return
    }

    setIsGenerating(true)
    try {
      const { data, error } = await supabase.functions.invoke('generate-lesson-plan', {
        body: { subject, topic }
      })

      if (error) throw error

      setLessonPlan(data.lessonPlan)
      toast.success("Lesson plan generated successfully!")
    } catch (error) {
      console.error("Error generating lesson plan:", error)
      toast.error("Failed to generate lesson plan")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">AI Lesson Plan Generator</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject (e.g., Mathematics)"
            />
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

          <Button 
            onClick={generateLessonPlan} 
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? "Generating..." : "Generate Lesson Plan"}
          </Button>
        </div>

        {lessonPlan && (
          <div className="mt-6">
            <Label>Generated Lesson Plan</Label>
            <Textarea
              value={lessonPlan}
              readOnly
              className="h-[400px] mt-2"
            />
          </div>
        )}
      </Card>
    </div>
  )
}