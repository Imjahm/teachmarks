import { RouteObject } from "react-router-dom"
import Layout from "@/components/Layout"
import Index from "@/pages/Index"
import Auth from "@/pages/Auth"
import Resources from "@/pages/Resources"
import Upload from "@/pages/Upload"
import Marking from "@/pages/Marking"
import { RubricUpload } from "@/components/RubricUpload"
import { RubricsList } from "@/components/rubrics/RubricsList"
import { RubricDetails } from "@/components/rubrics/RubricDetails"
import { LessonPlanGenerator } from "@/components/lesson-plans/LessonPlanGenerator"
import { CurriculumStandardsList } from "@/components/curriculum/CurriculumStandardsList"
import { CurriculumForm } from "@/components/curriculum/CurriculumForm"
import UserPersonas from "@/pages/UserPersonas"

const withLayout = (Component: React.ComponentType) => (
  <Layout>
    <Component />
  </Layout>
)

export const routes: RouteObject[] = [
  {
    path: "/auth",
    element: <Auth />
  },
  {
    path: "/",
    element: withLayout(Index)
  },
  {
    path: "/curriculum",
    element: withLayout(CurriculumStandardsList)
  },
  {
    path: "/curriculum/new",
    element: withLayout(CurriculumForm)
  },
  {
    path: "/rubrics",
    element: withLayout(RubricsList)
  },
  {
    path: "/rubrics/upload",
    element: withLayout(RubricUpload)
  },
  {
    path: "/rubrics/:id",
    element: withLayout(RubricDetails)
  },
  {
    path: "/upload",
    element: withLayout(Upload)
  },
  {
    path: "/marking",
    element: withLayout(Marking)
  },
  {
    path: "/lesson-plans",
    element: withLayout(LessonPlanGenerator)
  },
  {
    path: "/personas",
    element: withLayout(UserPersonas)
  },
  {
    path: "/resources",
    element: withLayout(Resources)
  }
]