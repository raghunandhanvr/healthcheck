import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AcceptInvitationForm } from "./_components/accept-invitation-form";

export default async function AcceptInvitationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  try {
    const response = await fetch(`/api/auth/get-invitation?id=${id}`, {
      headers: Object.fromEntries(await headers()),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch invitation');
    }
    
    const invitation = await response.json();

    if (!invitation) {
      redirect("/auth");
    }

    return (
      <div className="layout-container centered pt-24">
        <div className="w-full max-w-md mx-auto">
          <AcceptInvitationForm 
            invitation={{
              id: invitation.id,
              email: invitation.email,
              role: invitation.role,
              organization: {
                id: invitation.organizationId,
                name: invitation.organizationName,
                logo: undefined,
              },
              inviter: {
                user: {
                  name: invitation.inviterEmail.split('@')[0],
                  email: invitation.inviterEmail,
                },
              },
            }}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to get invitation:", error);
    redirect("/auth");
  }
}