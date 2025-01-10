export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      rubrics: {
        Row: {
          id: string
          created_at: string
          title: string
          exam_board: string
          grade_boundaries: Json
          criteria: Json
          total_marks: number
          teacher_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          exam_board: string
          grade_boundaries: Json
          criteria: Json
          total_marks: number
          teacher_id: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          exam_board?: string
          grade_boundaries?: Json
          criteria?: Json
          total_marks?: number
          teacher_id?: string
        }
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