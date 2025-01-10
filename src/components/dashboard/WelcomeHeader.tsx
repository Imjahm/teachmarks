import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";

interface WelcomeHeaderProps {
  email?: string;
}

export const WelcomeHeader = ({ email }: WelcomeHeaderProps) => {
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-6">
          <div className="bg-primary/5 p-3 rounded-lg">
            <Logo size="sm" showText={false} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-poppins bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome back
            </h1>
            <p className="text-gray-600 font-roboto mt-1">{email}</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          onClick={handleSignOut}
          className="hover:bg-primary hover:text-white transition-colors duration-300 font-roboto w-full md:w-auto"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};