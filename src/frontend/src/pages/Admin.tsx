import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent } from '../components/ui/card';
import { Loader2, ShieldAlert, ShieldCheck, LogIn } from 'lucide-react';
import CourseEditor from '../components/admin/CourseEditor';
import AnnouncementManager from '../components/admin/AnnouncementManager';
import LessonManager from '../components/admin/LessonManager';
import VIPManager from '../components/admin/VIPManager';
import MembersList from '../components/admin/MembersList';
import { Button } from '../components/ui/button';
import { Link } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';

export default function Admin() {
  const { identity, isInitializing, login, loginStatus } = useInternetIdentity();
  const { data: isAdmin, isLoading: isCheckingAdmin } = useIsCallerAdmin();
  const queryClient = useQueryClient();

  const isLoggingIn = loginStatus === 'logging-in';

  // Show loading state while initializing or checking admin status
  if (isInitializing || (identity && isCheckingAdmin)) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-go-blue" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show admin login interface when not authenticated
  if (!identity) {
    const handleAdminLogin = async () => {
      try {
        await login();
        // After successful login, invalidate the admin check query to force a refetch
        await queryClient.invalidateQueries({ queryKey: ['isCallerAdmin'] });
      } catch (error: any) {
        console.error('Admin login error:', error);
      }
    };

    return (
      <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-go-blue/5 via-background to-go-cyan/5">
        <Card className="max-w-md w-full mx-4 border-2 border-go-blue/20 shadow-xl">
          <CardContent className="pt-8 pb-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-go-blue/10 flex items-center justify-center">
                <ShieldCheck className="h-10 w-10 text-go-blue" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-foreground">Admin Access</h2>
              <p className="text-muted-foreground">
                This is a restricted area. Please authenticate with your admin credentials.
              </p>
            </div>
            <Button
              onClick={handleAdminLogin}
              disabled={isLoggingIn}
              size="lg"
              className="w-full bg-go-blue hover:bg-go-blue/90 text-white font-semibold"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Admin Login
                </>
              )}
            </Button>
            <div className="pt-4 border-t border-border">
              <Link to="/">
                <Button variant="ghost" className="text-muted-foreground">
                  Return to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show access denied for authenticated non-admin users
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center space-y-4">
            <ShieldAlert className="h-12 w-12 mx-auto text-destructive" />
            <h2 className="text-2xl font-bold">Access Denied</h2>
            <p className="text-muted-foreground">
              You do not have permission to access the admin panel.
            </p>
            <Link to="/">
              <Button>Go to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show full admin panel for authenticated admin users
  return (
    <div className="flex flex-col">
      <section className="py-12 bg-gradient-to-br from-go-blue/10 via-background to-go-cyan/10">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-lg text-muted-foreground">
            Manage course content, announcements, lessons, VIP access, and members
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <Tabs defaultValue="course" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="course">Course</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="vip">VIP Access</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
            </TabsList>

            <TabsContent value="course">
              <CourseEditor />
            </TabsContent>

            <TabsContent value="announcements">
              <AnnouncementManager />
            </TabsContent>

            <TabsContent value="lessons">
              <LessonManager />
            </TabsContent>

            <TabsContent value="vip">
              <VIPManager />
            </TabsContent>

            <TabsContent value="members">
              <MembersList />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
