"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { client } from "@/lib/auth/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FoldersIcon } from "@/components/ui/icons/folders"
import { AtSignIcon } from "@/components/ui/icons/at-sign"
import { UserIcon } from "@/components/ui/icons/user"
import { LoaderPinwheelIcon } from "@/components/ui/icons/loader-pinwheel"
import { toast } from "@/components/ui/sonner";

interface Invitation {
  id: string;
  email: string;
  role: string;
  organization: {
    id: string;
    name: string;
    logo?: string;
  };
  inviter: {
    user: {
      name: string;
      email: string;
    };
  };
}

interface AcceptInvitationFormProps {
  invitation: Invitation;
}

export function AcceptInvitationForm({ invitation }: AcceptInvitationFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleAccept = async () => {
    setLoading(true);
    setError("");

    try {
      await client.organization.acceptInvitation({
        invitationId: invitation.id,
      });
      
      router.push("/console/profile");
      toast.success('Invitation accepted successfully!')
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to accept invitation"
      setError(errorMessage);
      toast.error('Failed to accept invitation')
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    setError("");

    try {
      await client.organization.rejectInvitation({
        invitationId: invitation.id,
      });
      
      toast.success('Invitation declined')
      router.push("/console");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to reject invitation"
      setError(errorMessage);
      toast.error('Failed to decline invitation')
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 p-4 rounded-full">
            <FoldersIcon size={12} />
          </div>
        </div>
        <CardTitle>Organization Invitation</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join an organization
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-md space-y-3">
            <div className="flex items-center gap-3">
              <FoldersIcon size={12} />
              <div>
                <p className="font-medium">{invitation.organization.name}</p>
                <p className="text-sm text-muted-foreground">Organization</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <UserIcon size={12} />
              <div>
                <p className="font-medium">{invitation.inviter.user.name}</p>
                <p className="text-sm text-muted-foreground">Invited by</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <AtSignIcon size={12} />
              <div>
                <p className="font-medium capitalize">{invitation.role}</p>
                <p className="text-sm text-muted-foreground">Role</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleReject}
            variant="outline"
            className="flex-1"
            disabled={loading}
          >
            {loading ? <LoaderPinwheelIcon size={12} /> : 'Decline'}
          </Button>
          <Button
            onClick={handleAccept}
            className="flex-1"
            disabled={loading}
          >
            {loading ? (
              <>
                <LoaderPinwheelIcon size={12} />
                Accepting...
              </>
            ) : (
              'Accept Invitation'
            )}
          </Button>
        </div>

        <div className="text-center border-t pt-4">
          <p className="text-xs text-muted-foreground">
            By accepting, you&apos;ll be able to collaborate with the {invitation.organization.name} team.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}