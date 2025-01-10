import { Card } from "@/components/ui/card"
import { School, Users, GraduationCap, ClipboardList } from "lucide-react"

interface PersonaCardProps {
  icon: React.ReactNode
  title: string
  needs: string[]
  painPoints: string[]
  expectations: string[]
}

const PersonaCard = ({ icon, title, needs, painPoints, expectations }: PersonaCardProps) => {
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

export const UserPersonas = () => {
  const personas = [
    {
      icon: <School className="w-5 h-5 text-primary" />,
      title: "High School Teachers",
      needs: [
        "Efficient grading tools",
        "Easy-to-use rubric creation",
        "Quick access to student data",
        "Lesson planning templates"
      ],
      painPoints: [
        "Time-consuming manual grading",
        "Difficulty in maintaining consistent assessment",
        "Complex administrative tasks",
        "Limited collaboration with peers"
      ],
      expectations: [
        "Intuitive interface",
        "Time-saving features",
        "Reliable performance",
        "Integration with existing tools"
      ]
    },
    {
      icon: <Users className="w-5 h-5 text-primary" />,
      title: "Curriculum Coordinators",
      needs: [
        "Curriculum alignment tools",
        "Progress tracking across classes",
        "Standards compliance monitoring",
        "Resource distribution system"
      ],
      painPoints: [
        "Inconsistent curriculum implementation",
        "Difficulty tracking teacher adoption",
        "Limited visibility into classroom practices",
        "Complex reporting requirements"
      ],
      expectations: [
        "Comprehensive analytics",
        "Easy standard alignment",
        "Efficient communication tools",
        "Customizable workflows"
      ]
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-primary" />,
      title: "Department Heads",
      needs: [
        "Department performance overview",
        "Resource allocation tools",
        "Teacher support systems",
        "Quality assurance features"
      ],
      painPoints: [
        "Inconsistent assessment methods",
        "Resource management challenges",
        "Communication gaps",
        "Time-intensive reporting"
      ],
      expectations: [
        "Clear performance metrics",
        "Streamlined workflows",
        "Easy resource sharing",
        "Real-time insights"
      ]
    },
    {
      icon: <ClipboardList className="w-5 h-5 text-primary" />,
      title: "Educational Administrators",
      needs: [
        "School-wide performance tracking",
        "Compliance monitoring tools",
        "Budget optimization features",
        "Strategic planning support"
      ],
      painPoints: [
        "Complex data aggregation",
        "Regulatory compliance tracking",
        "Resource allocation challenges",
        "Limited visibility into daily operations"
      ],
      expectations: [
        "Comprehensive reporting",
        "Policy compliance tools",
        "Resource optimization",
        "Data-driven insights"
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">User Personas</h2>
        <p className="text-muted-foreground">Understanding our users and their needs</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {personas.map((persona, index) => (
          <PersonaCard key={index} {...persona} />
        ))}
      </div>
    </div>
  )
}