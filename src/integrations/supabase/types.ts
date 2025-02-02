export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ocr_results: {
        Row: {
          created_at: string
          extracted_text: string | null
          file_name: string
          file_path: string
          id: string
          route_path: string
          status: string
          teacher_id: string
        }
        Insert: {
          created_at?: string
          extracted_text?: string | null
          file_name: string
          file_path: string
          id?: string
          route_path: string
          status?: string
          teacher_id: string
        }
        Update: {
          created_at?: string
          extracted_text?: string | null
          file_name?: string
          file_path?: string
          id?: string
          route_path?: string
          status?: string
          teacher_id?: string
        }
        Relationships: []
      }
      rubrics: {
        Row: {
          created_at: string
          criteria: Json
          exam_board: string
          grade_boundaries: Json
          id: string
          teacher_id: string
          title: string
          total_marks: number
        }
        Insert: {
          created_at?: string
          criteria?: Json
          exam_board: string
          grade_boundaries?: Json
          id?: string
          teacher_id: string
          title: string
          total_marks: number
        }
        Update: {
          created_at?: string
          criteria?: Json
          exam_board?: string
          grade_boundaries?: Json
          id?: string
          teacher_id?: string
          title?: string
          total_marks?: number
        }
        Relationships: []
      }
      school_results: {
        Row: {
          created_at: string
          date: string
          id: string
          metric_name: string
          metric_value: number
          school_id: string
          teacher_id: string
        }
        Insert: {
          created_at?: string
          date?: string
          id?: string
          metric_name: string
          metric_value: number
          school_id: string
          teacher_id: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          metric_name?: string
          metric_value?: number
          school_id?: string
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "school_results_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      schools: {
        Row: {
          achievements: string | null
          address: string
          affiliation: string | null
          annual_budget: number | null
          attendance_rate: number | null
          average_performance: number | null
          city: string | null
          classrooms: number | null
          country: string | null
          created_at: string
          curriculum: string | null
          description: string | null
          district: string | null
          email: string | null
          established_date: string | null
          funding_sources: string | null
          grade_levels: string | null
          graduation_rate: number | null
          has_library: boolean | null
          has_sports_facilities: boolean | null
          id: string
          labs: number | null
          latitude: number
          longitude: number
          name: string
          partnerships: string | null
          phone_number: string | null
          principal_name: string | null
          school_type: string | null
          state: string | null
          student_teacher_ratio: number | null
          teacher_id: string
          total_students: number | null
          total_teachers: number | null
          website: string | null
          zip_code: string | null
        }
        Insert: {
          achievements?: string | null
          address: string
          affiliation?: string | null
          annual_budget?: number | null
          attendance_rate?: number | null
          average_performance?: number | null
          city?: string | null
          classrooms?: number | null
          country?: string | null
          created_at?: string
          curriculum?: string | null
          description?: string | null
          district?: string | null
          email?: string | null
          established_date?: string | null
          funding_sources?: string | null
          grade_levels?: string | null
          graduation_rate?: number | null
          has_library?: boolean | null
          has_sports_facilities?: boolean | null
          id?: string
          labs?: number | null
          latitude: number
          longitude: number
          name: string
          partnerships?: string | null
          phone_number?: string | null
          principal_name?: string | null
          school_type?: string | null
          state?: string | null
          student_teacher_ratio?: number | null
          teacher_id: string
          total_students?: number | null
          total_teachers?: number | null
          website?: string | null
          zip_code?: string | null
        }
        Update: {
          achievements?: string | null
          address?: string
          affiliation?: string | null
          annual_budget?: number | null
          attendance_rate?: number | null
          average_performance?: number | null
          city?: string | null
          classrooms?: number | null
          country?: string | null
          created_at?: string
          curriculum?: string | null
          description?: string | null
          district?: string | null
          email?: string | null
          established_date?: string | null
          funding_sources?: string | null
          grade_levels?: string | null
          graduation_rate?: number | null
          has_library?: boolean | null
          has_sports_facilities?: boolean | null
          id?: string
          labs?: number | null
          latitude?: number
          longitude?: number
          name?: string
          partnerships?: string | null
          phone_number?: string | null
          principal_name?: string | null
          school_type?: string | null
          state?: string | null
          student_teacher_ratio?: number | null
          teacher_id?: string
          total_students?: number | null
          total_teachers?: number | null
          website?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      student_marks: {
        Row: {
          created_at: string
          id: string
          marks: number
          student_id: string
          subject_id: string
          teacher_id: string
          term: string
          year: number
        }
        Insert: {
          created_at?: string
          id?: string
          marks: number
          student_id: string
          subject_id: string
          teacher_id: string
          term: string
          year: number
        }
        Update: {
          created_at?: string
          id?: string
          marks?: number
          student_id?: string
          subject_id?: string
          teacher_id?: string
          term?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "student_marks_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_marks_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          age: number
          class: string
          created_at: string
          id: string
          name: string
          school_id: string
          teacher_id: string
          year: number | null
        }
        Insert: {
          age: number
          class: string
          created_at?: string
          id?: string
          name: string
          school_id: string
          teacher_id: string
          year?: number | null
        }
        Update: {
          age?: number
          class?: string
          created_at?: string
          id?: string
          name?: string
          school_id?: string
          teacher_id?: string
          year?: number | null
        }
        Relationships: []
      }
      subjects: {
        Row: {
          created_at: string
          id: string
          name: string
          teacher_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          teacher_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          teacher_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
