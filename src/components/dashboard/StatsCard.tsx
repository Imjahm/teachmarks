import { Card } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  emptyMessage: string;
}

export const StatsCard = ({ title, emptyMessage }: StatsCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-white">
      <h2 className="text-xl font-semibold font-poppins text-primary mb-4">{title}</h2>
      <div className="flex items-center justify-center h-32 bg-gray-50 rounded-lg">
        <p className="text-gray-600 font-roboto">{emptyMessage}</p>
      </div>
    </Card>
  );
};