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