import { PersonaCard } from "./PersonaCard"
import { TeacherBot } from "@/components/ai/TeacherBot"
import { personas } from "@/data/personas"

export const UserPersonas = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">User Personas</h2>
          <p className="text-muted-foreground">Understanding our users and their needs</p>
        </div>
        
        <div className="space-y-4">
          {personas.map((persona, index) => (
            <PersonaCard key={index} {...persona} />
          ))}
        </div>
      </div>
      
      <div className="lg:col-span-2">
        <TeacherBot />
      </div>
    </div>
  )
}