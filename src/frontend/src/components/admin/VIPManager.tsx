import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useGetVIPMembers, useUpdateVIPStatus } from '../../hooks/useQueries';
import { toast } from 'sonner';
import { Loader2, Crown, UserCheck, UserX } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';
import { Principal } from '@dfinity/principal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

export default function VIPManager() {
  const { data: members, isLoading } = useGetVIPMembers();
  const updateMutation = useUpdateVIPStatus();
  const [principalInput, setPrincipalInput] = useState('');
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    principal: string;
    action: 'grant' | 'revoke';
  }>({ open: false, principal: '', action: 'grant' });

  const handleUpdateStatus = async (principalStr: string, isVIP: boolean) => {
    try {
      const principal = Principal.fromText(principalStr);
      await updateMutation.mutateAsync({ principal, isVIP });
      toast.success(
        isVIP ? 'VIP access granted successfully' : 'VIP access revoked successfully'
      );
      setPrincipalInput('');
      setConfirmDialog({ open: false, principal: '', action: 'grant' });
    } catch (error: any) {
      if (error.message?.includes('Invalid principal')) {
        toast.error('Invalid principal ID format');
      } else {
        toast.error('Failed to update VIP status');
      }
      console.error(error);
    }
  };

  const openConfirmDialog = (principal: string, action: 'grant' | 'revoke') => {
    setConfirmDialog({ open: true, principal, action });
  };

  const handleGrantVIP = () => {
    if (!principalInput.trim()) {
      toast.error('Please enter a principal ID');
      return;
    }
    openConfirmDialog(principalInput, 'grant');
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const vipMembers = members?.filter((m) => m.isVIP) || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">VIP Access Manager</h2>
        <p className="text-muted-foreground">
          Grant or revoke VIP access for members
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            Grant VIP Access
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="principal-input">Principal ID</Label>
              <Input
                id="principal-input"
                value={principalInput}
                onChange={(e) => setPrincipalInput(e.target.value)}
                placeholder="Enter principal ID"
              />
            </div>
            <Button
              onClick={handleGrantVIP}
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <UserCheck className="mr-2 h-4 w-4" />
                  Grant VIP Access
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-xl font-semibold mb-4">VIP Members</h3>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : vipMembers.length > 0 ? (
          <div className="space-y-3">
            {vipMembers.map((member) => (
              <Card key={member.principalId.toString()}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Crown className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                        <Badge variant="secondary">VIP</Badge>
                      </div>
                      <p className="text-sm font-mono break-all">
                        {member.principalId.toString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Joined: {formatDate(member.joinDate)}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        openConfirmDialog(member.principalId.toString(), 'revoke')
                      }
                      disabled={updateMutation.isPending}
                    >
                      <UserX className="mr-2 h-4 w-4" />
                      Revoke
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No VIP members yet</p>
        )}
      </div>

      <AlertDialog
        open={confirmDialog.open}
        onOpenChange={(open) =>
          setConfirmDialog({ ...confirmDialog, open })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmDialog.action === 'grant'
                ? 'Grant VIP Access'
                : 'Revoke VIP Access'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDialog.action === 'grant'
                ? 'Are you sure you want to grant VIP access to this user?'
                : 'Are you sure you want to revoke VIP access from this user?'}
              <br />
              <span className="font-mono text-xs break-all">
                {confirmDialog.principal}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                handleUpdateStatus(
                  confirmDialog.principal,
                  confirmDialog.action === 'grant'
                )
              }
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
