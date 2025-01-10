import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Sparkles } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { ContentGenerator } from "@/components/ai/ContentGenerator"

interface CurriculumStandardCardProps {
  id: string
  subject: string
  curriculum: string
  gradeLevel: number
  topic: string
  discipline?: string
  description?: string
}

export const CurriculumStandardCard = ({
  id,
  subject,
  curriculum,
  gradeLevel,
  topic,
  discipline,
  description
}: CurriculumStandardCardProps) => {
  const navigate = useNavigate()
  const [showGenerator, setShowGenerator] = useState(false)

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold font-poppins text-primary">{subject}</h3>
          <p className="text-sm text-gray-600 font-roboto mb-2">
            {curriculum} - Grade {gradeLevel}
          </p>
          {discipline && (
            <p className="text-sm text-secondary font-roboto mb-2">{discipline}</p>
          )}
          <p className="text-sm font-roboto mb-4">{topic}</p>
          {description && (
            <p className="text-sm text-gray-600 font-roboto line-clamp-2">{description}</p>
          )}
          
          <div className="flex gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowGenerator(!showGenerator)}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI Generate
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/curriculum/${id}`)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {showGenerator && (
        <div className="mt-4">
          <ContentGenerator
            subject={subject}
            topic={topic}
            gradeLevel={gradeLevel}
          />
        </div>
      )}
    </Card>
  )
}