import { AuthError, AuthApiError } from "@supabase/supabase-js";

export const getAuthErrorMessage = (error: AuthError): string => {
  if (error instanceof AuthApiError) {
    switch (error.code) {
      case 'email_provider_disabled':
        return "Email authentication is currently disabled. Please contact the administrator to enable it.";
      case 'invalid_credentials':
        return 'Invalid email or password. Please check your credentials and try again.';
      case 'user_not_found':
        return 'No user found with these credentials.';
      case 'invalid_grant':
        return 'Invalid login credentials.';
      default:
        return error.message;
    }
  }
  return error.message;
};