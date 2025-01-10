import { Card } from "@/components/ui/card"

interface PersonaCardProps {
  icon: React.ReactNode
  title: string
  needs: string[]
  painPoints: string[]
  expectations: string[]
}

export const PersonaCard = ({ icon, title, needs, painPoints, expectations }: PersonaCardProps) => {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      
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
    </Card>
  )
}