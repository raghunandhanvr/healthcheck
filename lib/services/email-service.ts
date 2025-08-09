import { Resend } from "resend";
import { EmailVerificationTemplate } from "@/components/email/email-verification";
import { PasswordResetTemplate } from "@/components/email/password-reset";
import { render } from "@react-email/render";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async ({
  user,
  url,
}: {
  user: { email: string; name: string };
  url: string;
  token: string;
}) => {
  const emailHtml = await render(
    EmailVerificationTemplate({
      userFirstName: user.name || "User",
      verificationUrl: url,
    })
  );

  const { error } = await resend.emails.send({
    from: "healthcheck.sh <verify@healthcheck.sh>",
    to: [user.email],
    subject: "Verify your email address",
    html: emailHtml,
  });

  if (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

export const sendPasswordResetEmail = async ({
  user,
  url,
}: {
  user: { email: string; name: string };
  url: string;
  token: string;
}) => {
  const emailHtml = await render(
    PasswordResetTemplate({
      userFirstName: user.name || "User",
      resetUrl: url,
    })
  );

  const { error } = await resend.emails.send({
    from: "healthcheck.sh <verify@healthcheck.sh>",
    to: [user.email],
    subject: "Reset your password",
    html: emailHtml,
  });

  if (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }

};

export const sendOTPEmail = async ({
  user,
  otp,
}: {
  user: { email: string; name: string };
  otp: string;
}) => {
  const { error } = await resend.emails.send({
    from: "healthcheck.sh <verify@healthcheck.sh>",
    to: [user.email],
    subject: "Your 2FA verification code",
    html: `
      <div style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif; padding: 40px 24px; max-width: 560px; margin: 0 auto; background-color: #ffffff;">
        <h2 style="color: #000000; font-size: 24px; font-weight: bold; text-align: center; margin: 40px 0;">Your verification code</h2>
        <p style="color: #000000; font-size: 16px; line-height: 24px; margin: 16px 0;">Hi ${user.name || "User"},</p>
        <p style="color: #000000; font-size: 16px; line-height: 24px; margin: 16px 0;">Your 2FA verification code is:</p>
        <div style="background-color: #f8f9fa; border: 2px solid #e9ecef; border-radius: 8px; padding: 24px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 32px 0; color: #000000; font-family: 'Courier New', monospace;">
          ${otp}
        </div>
        <p style="color: #000000; font-size: 16px; line-height: 24px; margin: 16px 0;">This code will expire in 5 minutes.</p>
        <p style="color: #666666; font-size: 14px; line-height: 20px; margin-top: 32px;">If you didn't request this code, please ignore this email.</p>
      </div>
    `,
  });

  if (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }

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
  const { error } = await resend.emails.send({
    from: "healthcheck.sh <invite@healthcheck.sh>",
    to: [email],
    subject: `You're invited to join ${organizationName} environment on healthcheck.sh`,
    html: `
      <div style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif; padding: 40px 24px; max-width: 560px; margin: 0 auto; background-color: #ffffff;">
        <h2 style="color: #000000; font-size: 24px; font-weight: bold; text-align: center; margin: 40px 0;">You're invited to join ${organizationName} environment</h2>
        <p style="color: #000000; font-size: 16px; line-height: 24px; margin: 16px 0;">Hi there,</p>
        <p style="color: #000000; font-size: 16px; line-height: 24px; margin: 16px 0;">
          ${invitedByUsername} (${invitedByEmail}) has invited you to join the <strong>${organizationName}</strong> environment on healthcheck.sh.
        </p>
        <p style="color: #000000; font-size: 16px; line-height: 24px; margin: 16px 0;">
          This environment will allow you to collaborate on monitoring and health check configurations together.
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${inviteLink}" style="background-color: #007bff; border-radius: 6px; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; display: inline-block; padding: 12px 24px; border: none;">
            Join Environment
          </a>
        </div>
        <p style="color: #000000; font-size: 16px; line-height: 24px; margin: 16px 0;">If you're unable to click the button above, copy and paste this URL into your browser:</p>
        <p style="color: #007bff; font-size: 14px; text-decoration: underline; word-break: break-all; margin: 8px 0;">
          ${inviteLink}
        </p>
        <p style="color: #666666; font-size: 14px; line-height: 20px; margin-top: 32px;">This invitation will expire in 48 hours. If you didn't expect this invitation, you can safely ignore this email.</p>
        <p style="color: #666666; font-size: 12px; line-height: 18px; margin-top: 24px;">Invitation ID: ${invitationId}</p>
      </div>
    `,
  });

  if (error) {
    console.error("Error sending environment invitation email:", error);
    throw new Error("Failed to send environment invitation email");
  }

};
