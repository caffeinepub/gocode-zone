import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { Button } from './ui/button';
import { LogIn, LogOut } from 'lucide-react';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { useEffect } from 'react';

export default function LoginButton() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: isAdmin, isFetched, isLoading } = useIsCallerAdmin();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';

  // Redirect admin users to admin panel after successful login
  useEffect(() => {
    // Only redirect when:
    // 1. User is authenticated
    // 2. Admin check query has completed (isFetched is true)
    // 3. User is confirmed as admin
    // 4. Not currently loading
    if (isAuthenticated && isFetched && !isLoading && isAdmin === true) {
      navigate({ to: '/admin' });
    }
  }, [isAuthenticated, isFetched, isLoading, isAdmin, navigate]);

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
        // After successful login, invalidate the admin check query to force a refetch
        queryClient.invalidateQueries({ queryKey: ['isCallerAdmin'] });
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <Button
      onClick={handleAuth}
      disabled={disabled}
      variant="outline"
      className="font-medium"
    >
      {disabled ? (
        'Logging in...'
      ) : isAuthenticated ? (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </>
      ) : (
        <>
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </>
      )}
    </Button>
  );
}
