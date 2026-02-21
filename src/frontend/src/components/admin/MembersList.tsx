import { Card, CardContent } from '../ui/card';
import { useGetVIPMembers } from '../../hooks/useQueries';
import { Users, Crown } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';

export default function MembersList() {
  const { data: members, isLoading } = useGetVIPMembers();
  const [searchTerm, setSearchTerm] = useState('');

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredMembers = members?.filter((member) =>
    member.principalId.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Members List</h2>
        <p className="text-muted-foreground">
          View all registered members and their VIP status
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by principal ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="h-5 w-5" />
          <span className="font-semibold">
            {members?.length || 0} members
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : filteredMembers && filteredMembers.length > 0 ? (
        <ScrollArea className="h-[600px] rounded-md border">
          <div className="space-y-3 p-4">
            {filteredMembers.map((member) => (
              <Card key={member.principalId.toString()}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {member.isVIP && (
                          <>
                            <Crown className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                            <Badge variant="secondary">VIP</Badge>
                          </>
                        )}
                        {!member.isVIP && (
                          <Badge variant="outline">Free</Badge>
                        )}
                      </div>
                      <p className="text-sm font-mono break-all">
                        {member.principalId.toString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Joined: {formatDate(member.joinDate)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <p className="text-muted-foreground text-center py-8">
          {searchTerm ? 'No members found matching your search' : 'No members yet'}
        </p>
      )}
    </div>
  );
}
