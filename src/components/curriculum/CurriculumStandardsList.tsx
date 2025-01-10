import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CurriculumStandardsList = () => {
  const navigate = useNavigate();
  
  const { data: standards, isLoading } = useQuery({
    queryKey: ['curriculum-standards'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('curriculum_standards')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading standards...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Curriculum Standards</h2>
        <Button onClick={() => navigate('/curriculum/new')}>
          <Plus className="w-4 h-4 mr-2" />
          Add Standard
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {standards?.map((standard) => (
          <Card key={standard.id} className="p-6 hover:shadow-lg transition-all duration-300">
            <h3 className="font-semibold text-lg mb-2">{standard.subject}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {standard.curriculum} - Grade {standard.grade_level}
            </p>
            <p className="text-sm mb-4">{standard.topic}</p>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate(`/curriculum/${standard.id}`)}
            >
              View Details
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};