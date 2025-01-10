import { Card } from "@/components/ui/card"
import { School, Users, GraduationCap, ClipboardList } from "lucide-react"
import type { PersonaData } from "@/data/personas"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const iconMap = {
  School,
  Users,
  GraduationCap,
  ClipboardList
} as const

export const PersonaCard = ({ iconName, title, needs, painPoints, expectations }: PersonaData) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = iconMap[iconName]
  
  return (
    <Card className="p-6 space-y-4 hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      
      {isExpanded && (
        <>
          <div>
            <h4 className="font-medium text-primary mb-2">Needs</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {needs.map((need, index) => (
                <li key={index}>{need}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-primary mb-2">Pain Points</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {painPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-primary mb-2">Expectations</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {expectations.map((expectation, index) => (
                <li key={index}>{expectation}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </Card>
  )
}