import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { supabase } from "@/integrations/supabase/client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getAuthErrorMessage } from "@/utils/auth-errors"
import { Loader2 } from "lucide-react"
import { Logo } from "@/components/Logo"

export default function Auth() {
  const navigate = useNavigate()
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setIsLoading(false)
        navigate("/")
      }
      if (event === 'SIGNED_OUT') {
        setError("")
        setIsLoading(false)
      }
      if (event === 'USER_UPDATED') {
        supabase.auth.getSession().then(({ error }) => {
          if (error) {
            setError(getAuthErrorMessage(error))
          }
          setIsLoading(false)
        })
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-6 flex flex-col items-center">
          <Logo size="lg" />
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {isLoading && (
            <div className="flex justify-center mb-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              style: {
                button: { background: '#2563eb', color: 'white' },
                anchor: { color: '#2563eb' },
              }
            }}
            providers={[]}
            localization={{
              variables: {
                sign_up: {
                  password_label: 'Password (min 6 characters, include letters and numbers)',
                }
              }
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}