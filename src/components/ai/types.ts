export type PromptType = 'lesson' | 'examples' | 'assessment'

export interface ContentGeneratorProps {
  subject: string
  topic: string
  gradeLevel: number
}

export interface GeneratedContentProps {
  content: string
  rating: number | null
  onRate: (rating: number) => void
}

export interface ContentRatingProps {
  rating: number | null
  onRate: (rating: number) => void
}

export interface ContentTypeSelectProps {
  value: PromptType
  onChange: (value: PromptType) => void
}