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
    <div className="flex flex-col md:flex-row justify-between items-center mb-12 bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-6 mb-4 md:mb-0">
        <Logo size="sm" showText={false} />
        <div>
          <h1 className="text-3xl font-bold font-poppins bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome back
          </h1>
          <p className="text-gray-600 font-roboto">{email}</p>
        </div>
      </div>
      <Button 
        variant="outline" 
        onClick={handleSignOut}
        className="hover:bg-primary hover:text-white transition-colors duration-300 font-roboto"
      >
        Sign Out
      </Button>
    </div>
  );
};