import { School, Users, GraduationCap, ClipboardList } from "lucide-react"

export const personas = [
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
] as const