import { baseURL } from "@/lib/base-url";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const GoogleOauthButton = (props: { label: string }) => {
  const { label } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    try {
      setIsLoading(true);
      // Check if baseURL is defined
      if (!baseURL) {
        toast({
          title: "Configuration Error",
          description: "API base URL is not configured properly. Please check your environment variables.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Redirect to Google OAuth endpoint
      window.location.href = `${baseURL}/auth/google`;
    } catch (error) {
      console.error("Google OAuth error:", error);
      toast({
        title: "Authentication Error",
        description: "Failed to connect to Google authentication. Please try again later.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      type="button"
      disabled={isLoading}
      className="w-full rounded-xl border-zinc-50 relative" 
    >
      {isLoading ? (
        <span className="mr-2 h-4 w-4 animate-spin">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="mr-2 h-5 w-5">
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor"
          />
        </svg>
      )}
      {label} with Google
    </Button>
  );
};

export default GoogleOauthButton;