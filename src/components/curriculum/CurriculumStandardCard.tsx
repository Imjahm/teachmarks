import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface CurriculumStandardCardProps {
  id: string
  subject: string
  curriculum: string
  gradeLevel: number
  topic: string
  description?: string
}

export const CurriculumStandardCard = ({
  id,
  subject,
  curriculum,
  gradeLevel,
  topic,
  description
}: CurriculumStandardCardProps) => {
  const navigate = useNavigate()

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold font-poppins text-primary">{subject}</h3>
          <p className="text-sm text-gray-600 font-roboto mb-2">
            {curriculum} - Grade {gradeLevel}
          </p>
          <p className="text-sm font-roboto mb-4">{topic}</p>
          {description && (
            <p className="text-sm text-gray-600 font-roboto line-clamp-2">{description}</p>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(`/curriculum/${id}`)}
          className="ml-4"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}