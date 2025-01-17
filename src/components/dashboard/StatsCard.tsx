import { Card } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value?: string
  label?: string
  items?: Array<{
    label: string
    color: string
  }>
  emptyMessage?: string
}

export const StatsCard = ({ title, value, label, items, emptyMessage }: StatsCardProps) => {
  if (emptyMessage && !value) {
    return (
      <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white">
        <h2 className="text-xl font-semibold font-poppins text-primary mb-4">{title}</h2>
        <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
          <p className="text-gray-600 font-roboto">{emptyMessage}</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="text-center mb-4">
        <div className="text-3xl font-bold">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
      {items && (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className={item.color}>{item.label}</span>
              <div className="h-2 w-2 rounded-full bg-current" />
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}