import { Card } from "@/components/ui/card"

interface SchoolInfoProps {
  name: string
  address: string
  latitude: number
  longitude: number
}

export const SchoolInfo = ({ name, address, latitude, longitude }: SchoolInfoProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">School Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Address:</p>
          <p>{address}</p>
        </div>
        <div>
          <p className="font-semibold">Location:</p>
          <p>Lat: {latitude}, Long: {longitude}</p>
        </div>
      </div>
    </Card>
  )
}