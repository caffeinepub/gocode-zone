import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../hooks/useQueries';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent } from '../components/ui/card';
import { Loader2, ShieldAlert } from 'lucide-react';
import CourseEditor from '../components/admin/CourseEditor';
import AnnouncementManager from '../components/admin/AnnouncementManager';
import LessonManager from '../components/admin/LessonManager';
import VIPManager from '../components/admin/VIPManager';
import MembersList from '../components/admin/MembersList';
import { Button } from '../components/ui/button';
import { Link } from '@tanstack/react-router';

export default function Admin() {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: isAdmin, isLoading: isCheckingAdmin } = useIsCallerAdmin();

  if (isInitializing || isCheckingAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-go-blue" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!identity) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center space-y-4">
            <ShieldAlert className="h-12 w-12 mx-auto text-destructive" />
            <h2 className="text-2xl font-bold">Authentication Required</h2>
            <p className="text-muted-foreground">
              Please log in to access the admin panel.
            </p>
            <Link to="/">
              <Button>Go to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

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
