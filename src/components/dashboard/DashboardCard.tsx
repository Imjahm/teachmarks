import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

export const DashboardCard = ({
  icon: Icon,
  title,
  description,
  onClick
}: DashboardCardProps) => {
  return (
    <Card 
      className="p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20 group cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold font-poppins text-primary group-hover:text-primary/80 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-gray-600 font-roboto">{description}</p>
        </div>
      </div>
    </Card>
  );
};