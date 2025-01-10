import { UserPersonas as UserPersonasComponent } from "@/components/dashboard/UserPersonas"

const UserPersonas = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">User Personas</h2>
        <p className="text-muted-foreground">Understanding our users and their needs</p>
      </div>
      <UserPersonasComponent />
    </div>
  )
}

export default UserPersonas