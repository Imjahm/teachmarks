export interface Message {
  query: string
  response: string
  feedback?: number
  context?: {
    section?: string
    subject?: string
    gradeLevel?: number
  }
}

export type PromptType = 'lesson-plan' | 'activity' | 'assessment' | 'resources'

export interface ContentGeneratorProps {
  subject?: string
  topic?: string
  gradeLevel?: number
}

export interface ContentRatingProps {
  onRate: (rating: number) => void
  rating?: number
}

export interface ContentTypeSelectProps {
  selectedType: PromptType
  onTypeChange: (type: PromptType) => void
}

export interface GeneratedContentProps {
  content: string
  isLoading: boolean
}