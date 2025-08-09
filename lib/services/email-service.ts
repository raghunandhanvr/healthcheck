import { Resend } from "resend";
import { EmailVerificationTemplate } from "@/components/email/email-verification";
import { PasswordResetTemplate } from "@/components/email/password-reset";
import { OTPVerificationTemplate } from "@/components/email/otp-verification";
import { OrganizationInvitationTemplate } from "@/components/email/organization-invitation";
import { render } from "@react-email/render";
import { ReactElement } from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({
  to,
  from,
  subject,
  template,
  errorMessage,
}: {
  to: string;
  from: string;
  subject: string;
  template: ReactElement;
  errorMessage: string;
}) => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY environment variable is required");
  }

  const emailHtml = await render(template);

  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    html: emailHtml,
  });

  if (error) {
    console.error(`Error sending email: ${errorMessage}`, error);
    throw new Error(errorMessage);
  }
};

export const sendVerificationEmail = async ({
  user,
  url,
}: {
  user: { email: string; name: string };
  url: string;
  token: string;
}) => {
  await sendEmail({
    to: user.email,
    from: "healthcheck.sh <verify@healthcheck.sh>",
    subject: "Verify your email address",
    template: EmailVerificationTemplate({
      userFirstName: user.name || "User",
      verificationUrl: url,
    }),
    errorMessage: "Failed to send verification email",
  });
};

export const sendPasswordResetEmail = async ({
  user,
  url,
}: {
  user: { email: string; name: string };
  url: string;
  token: string;
}) => {
  await sendEmail({
    to: user.email,
    from: "healthcheck.sh <verify@healthcheck.sh>",
    subject: "Reset your password",
    template: PasswordResetTemplate({
      userFirstName: user.name || "User",
      resetUrl: url,
    }),
    errorMessage: "Failed to send password reset email",
  });
};

export const sendOTPEmail = async ({
  user,
  otp,
}: {
  user: { email: string; name: string };
  otp: string;
}) => {
  await sendEmail({
    to: user.email,
    from: "healthcheck.sh <verify@healthcheck.sh>",
    subject: "Your 2FA verification code",
    template: OTPVerificationTemplate({
      userFirstName: user.name || "User",
      otp: otp,
    }),
    errorMessage: "Failed to send OTP email",
  });
};

export const sendOrganizationInvitationEmail = async ({
  email,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  invitationId,
}: {
  email: string;
  invitedByUsername: string;
  invitedByEmail: string;
  organizationName: string;
  inviteLink: string;
  invitationId: string;
}) => {
  await sendEmail({
    to: email,
    from: "healthcheck.sh <invite@healthcheck.sh>",
    subject: `You're invited to join ${organizationName} environment on healthcheck.sh`,
    template: OrganizationInvitationTemplate({
      invitedByUsername,
      invitedByEmail,
      organizationName,
      inviteLink,
      invitationId,
    }),
    errorMessage: "Failed to send environment invitation email",
  });
};
