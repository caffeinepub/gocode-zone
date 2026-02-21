import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useGetAllAnnouncements, usePublishAnnouncement } from '../../hooks/useQueries';
import { toast } from 'sonner';
import { Loader2, Megaphone, Plus } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export default function AnnouncementManager() {
  const { data: announcements, isLoading } = useGetAllAnnouncements();
  const publishMutation = usePublishAnnouncement();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await publishMutation.mutateAsync({ title, content });
      toast.success('Announcement published successfully');
      setTitle('');
      setContent('');
    } catch (error) {
      toast.error('Failed to publish announcement');
      console.error(error);
    }
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Announcement Manager</h2>
        <p className="text-muted-foreground">
          Create and publish announcements for the community
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Announcement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePublish} className="space-y-4">
            <div>
              <Label htmlFor="announcement-title">Title</Label>
              <Input
                id="announcement-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Announcement title"
                required
              />
            </div>
            <div>
              <Label htmlFor="announcement-content">Content</Label>
              <Textarea
                id="announcement-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Announcement content"
                rows={6}
                required
              />
            </div>
            <Button type="submit" disabled={publishMutation.isPending}>
              {publishMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Megaphone className="mr-2 h-4 w-4" />
                  Publish Announcement
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-semibold mb-4">Published Announcements</h3>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : announcements && announcements.length > 0 ? (
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <Card key={Number(announcement.id)}>
                <CardHeader>
                  <CardTitle>{announcement.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(announcement.timestamp)}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {announcement.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No announcements yet</p>
        )}
      </div>
    </div>
  );
}
