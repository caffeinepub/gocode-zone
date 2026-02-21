import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useGetAllAnnouncements } from '../hooks/useQueries';
import { Megaphone } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

export default function AnnouncementsList() {
  const { data: announcements, isLoading } = useGetAllAnnouncements();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!announcements || announcements.length === 0) {
    return null;
  }

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <Card key={Number(announcement.id)} className="border-2 border-go-blue/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-go-blue" />
              {announcement.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {formatDate(announcement.timestamp)}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap">{announcement.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
