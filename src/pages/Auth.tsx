import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Auth = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative w-24 h-24">
              {/* Abstract butterfly logo representation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 relative">
                  <div className="absolute inset-0 transform rotate-45">
                    <div className="w-10 h-10 bg-primary rounded-tl-full rounded-br-full absolute top-0 left-0 opacity-80"></div>
                    <div className="w-10 h-10 bg-[#10b981] rounded-tl-full rounded-br-full absolute bottom-0 right-0 opacity-80"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-poppins font-semibold text-4xl text-gray-900">EduEumaeus</h1>
            <p className="font-roboto text-[#10b981] text-lg mt-2">Guiding Every Educational Journey</p>
          </div>
        </div>
        
        {errorMessage && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        
        <div className="bg-white rounded-lg">
          <SupabaseAuth 
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                button: {
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '500',
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.75rem 1rem',
                },
                input: {
                  fontFamily: 'Roboto, sans-serif',
                  borderRadius: '0.375rem',
                  padding: '0.75rem 1rem',
                },
                label: {
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: '500',
                  color: '#1f2937',
                },
                anchor: {
                  color: '#2563eb',
                  fontFamily: 'Roboto, sans-serif',
                },
              },
              variables: {
                default: {
                  colors: {
                    brand: '#2563eb',
                    brandAccent: '#1d4ed8',
                  },
                },
              },
            }}
            theme="light"
            providers={[]}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;