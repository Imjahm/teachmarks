import { PersonaCard } from "./PersonaCard"
import { personas } from "@/data/personas"

export const UserPersonas = () => {
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