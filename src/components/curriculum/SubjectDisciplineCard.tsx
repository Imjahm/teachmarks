import { Card } from "@/components/ui/card"

interface SubjectDisciplineCardProps {
  subject: string
  discipline: string
  description: string
}

export const SubjectDisciplineCard = ({
  subject,
  discipline,
  description
}: SubjectDisciplineCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300">
      <div>
        <h3 className="text-lg font-semibold font-poppins text-primary">{subject}</h3>
        <p className="text-sm text-gray-600 font-roboto mb-2">{discipline}</p>
        <p className="text-sm font-roboto line-clamp-2">{description}</p>
      </div>
    </Card>
  )
}