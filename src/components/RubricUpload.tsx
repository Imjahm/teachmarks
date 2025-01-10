import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const rubricSchema = z.object({
  title: z.string().min(1, "Title is required"),
  exam_board: z.string().min(1, "Exam board is required"),
  total_marks: z.number().min(1, "Total marks must be at least 1"),
  grade_boundaries: z.object({
    A: z.number().min(0),
    B: z.number().min(0),
    C: z.number().min(0),
    D: z.number().min(0),
    E: z.number().min(0),
  }),
  criteria: z.array(z.object({
    description: z.string(),
    marks: z.number(),
  })),
});

type RubricFormValues = z.infer<typeof rubricSchema>;

export const RubricUpload = () => {
  const navigate = useNavigate();
  const session = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RubricFormValues>({
    resolver: zodResolver(rubricSchema),
    defaultValues: {
      title: "",
      exam_board: "",
      total_marks: 100,
      grade_boundaries: {
        A: 80,
        B: 70,
        C: 60,
        D: 50,
        E: 40,
      },
      criteria: [],
    },
  });

  const onSubmit = async (values: RubricFormValues) => {
    if (!session?.user?.id) {
      toast.error("You must be logged in to create a rubric");
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("rubrics")
        .insert({
          ...values,
          teacher_id: session.user.id,
        });

      if (error) throw error;

      toast.success("Rubric created successfully");
      navigate("/rubrics");
    } catch (error: any) {
      toast.error(error.message || "Failed to create rubric");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Rubric</CardTitle>
          <CardDescription>
            Fill in the details below to create a new marking rubric
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter rubric title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="exam_board"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Exam Board</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter exam board" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="total_marks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Marks</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter total marks"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/rubrics")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Rubric"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};