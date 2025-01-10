import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const RubricsList = () => {
  const navigate = useNavigate();

  const { data: rubrics, isLoading } = useQuery({
    queryKey: ['rubrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rubrics')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast.error("Failed to load rubrics");
        throw error;
      }

      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold font-poppins">Rubrics</h1>
        <Button onClick={() => navigate('/rubrics/upload')}>
          <Plus className="w-4 h-4 mr-2" />
          New Rubric
        </Button>
      </div>

      {rubrics?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No rubrics found</p>
          <Button onClick={() => navigate('/rubrics/upload')}>
            Create your first rubric
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rubrics?.map((rubric) => (
            <div
              key={rubric.id}
              className="p-6 rounded-lg border bg-card hover:border-primary/20 transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/rubrics/${rubric.id}`)}
            >
              <h3 className="font-semibold mb-2 font-poppins">{rubric.title}</h3>
              <p className="text-sm text-muted-foreground font-roboto mb-4">
                {rubric.exam_board}
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">
                  Total marks: {rubric.total_marks}
                </span>
                <span className="text-primary">View details →</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};