import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { supabase } from "@/integrations/supabase/client"
import { LessonPlanForm } from "./LessonPlanForm"
import { GeneratedContent } from "./GeneratedContent"

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
        
        <LessonPlanForm
          subject={subject}
          topic={topic}
          yearGroup={yearGroup}
          duration={duration}
          onSubjectChange={setSubject}
          onTopicChange={setTopic}
          onYearGroupChange={setYearGroup}
          onDurationChange={setDuration}
        />

        <Tabs defaultValue="lesson-plan" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lesson-plan">Lesson Plan</TabsTrigger>
            <TabsTrigger value="scheme-of-work">Scheme of Work</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lesson-plan">
            <GeneratedContent
              content={lessonPlan}
              isGenerating={isGenerating}
              onGenerate={() => generateContent('lesson-plan')}
              type="lesson-plan"
            />
          </TabsContent>

          <TabsContent value="scheme-of-work">
            <GeneratedContent
              content={schemeOfWork}
              isGenerating={isGenerating}
              onGenerate={() => generateContent('scheme-of-work')}
              type="scheme-of-work"
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}