import { useLocation } from "react-router-dom"

export interface TeacherBotContext {
  section?: string
  subject?: string
  gradeLevel?: number
}

export const getCurrentSection = () => {
  const path = window.location.pathname.split("/")[1] || "dashboard"
  return path.charAt(0).toUpperCase() + path.slice(1)
}

export const getInitialPrompt = () => {
  const section = getCurrentSection()
  switch (section.toLowerCase()) {
    case "dashboard":
      return "Welcome! How can I help you with your dashboard today? I can assist with metrics, activities, or general guidance."
    case "upload":
      return "Would you like help with uploading and organizing your teaching materials? I can guide you through the process."
    case "students":
      return "What would you like to know about your students? I can help with progress tracking, management, or generating insights."
    case "marking":
      return "Ready to assist with marking! Would you like help with assessment strategies, feedback generation, or grading consistency?"
    case "rubrics":
      return "Let's work on your rubrics. Would you like to create a new rubric, modify existing ones, or get guidance on assessment criteria?"
    case "lesson-plans":
      return "How can I help with your lesson planning? I can assist with creating new plans, modifying existing ones, or suggesting activities."
    case "personas":
      return "Would you like to understand more about different user roles? I can explain their needs, challenges, and how to support them."
    case "resources":
      return "Looking for teaching resources? I can help you find, organize, or create materials for your classes."
    default:
      return "How can I assist you today?"
  }
}

export const getPlaceholder = () => {
  const section = getCurrentSection()
  switch (section.toLowerCase()) {
    case "dashboard":
      return "Ask me about your dashboard metrics or recent activities..."
    case "upload":
      return "Need help uploading and organizing work?"
    case "students":
      return "Ask about student management and progress tracking..."
    case "marking":
      return "Need assistance with marking or feedback?"
    case "rubrics":
      return "Help with creating or applying rubrics..."
    case "lesson-plans":
      return "Ask me to help create or modify lesson plans..."
    case "personas":
      return "Questions about user roles and permissions?"
    case "resources":
      return "Need help finding or organizing resources?"
    default:
      return "Ask me anything about teaching..."
  }
}