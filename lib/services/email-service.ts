import { EmailVerificationTemplate } from "@/components/email/email-verification"
import { OrganizationInvitationTemplate } from "@/components/email/organization-invitation"
import { OTPVerificationTemplate } from "@/components/email/otp-verification"
import { PasswordResetTemplate } from "@/components/email/password-reset"
import { AUTH_MESSAGES, EMAIL_MESSAGES } from "@/lib/constants"
import { render } from "@react-email/render"
import { ReactElement } from "react"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const sendEmail = async ({
  to,
  from,
  subject,
  template,
  errorMessage,
}: {
  to: string
  from: string
  subject: string
  template: ReactElement
  errorMessage: string
}) => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY environment variable is required")
  }

  const emailHtml = await render(template)

  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    html: emailHtml,
  })

  if (error) {
    console.error(`Error sending email: ${errorMessage}`, error)
    throw new Error(errorMessage)
  }
}

export const sendVerificationEmail = async ({
  user,
  url,
}: {
  user: { email: string; name: string }
  url: string
  token: string
}) => {
  await sendEmail({
    to: user.email,
    from: "dataatmos.ai <verify@dataatmos.ai>",
    subject: EMAIL_MESSAGES.SUBJECTS.VERIFY_EMAIL,
    template: EmailVerificationTemplate({
      userFirstName: user.name || AUTH_MESSAGES.DEFAULT_USER_NAME,
      verificationUrl: url,
    }),
    errorMessage: EMAIL_MESSAGES.ERROR_MESSAGES.SEND_VERIFICATION_FAILED,
  })
}

export const sendPasswordResetEmail = async ({
  user,
  url,
}: {
  user: { email: string; name: string }
  url: string
  token: string
}) => {
  await sendEmail({
    to: user.email,
    from: "dataatmos.ai <verify@dataatmos.ai>",
    subject: EMAIL_MESSAGES.SUBJECTS.RESET_PASSWORD,
    template: PasswordResetTemplate({
      userFirstName: user.name || AUTH_MESSAGES.DEFAULT_USER_NAME,
      resetUrl: url,
    }),
    errorMessage: EMAIL_MESSAGES.ERROR_MESSAGES.SEND_RESET_FAILED,
  })
}

export const sendOTPEmail = async ({
  user,
  otp,
}: {
  user: { email: string; name: string }
  otp: string
}) => {
  await sendEmail({
    to: user.email,
    from: "dataatmos.ai <verify@dataatmos.ai>",
    subject: "Your 2FA verification code",
    template: OTPVerificationTemplate({
      userFirstName: user.name || AUTH_MESSAGES.DEFAULT_USER_NAME,
      otp,
    }),
    errorMessage: EMAIL_MESSAGES.ERROR_MESSAGES.SEND_OTP_FAILED,
  })
}

export const sendOrganizationInvitationEmail = async ({
  email,
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  invitationId,
}: {
  email: string
  invitedByUsername: string
  invitedByEmail: string
  organizationName: string
  inviteLink: string
  invitationId: string
}) => {
  await sendEmail({
    to: email,
    from: "dataatmos.ai <invite@dataatmos.ai>",
    subject: `You're invited to join ${organizationName} environment on dataatmos.ai`,
    template: OrganizationInvitationTemplate({
      invitedByUsername,
      invitedByEmail,
      organizationName,
      inviteLink,
      invitationId,
    }),
    errorMessage: EMAIL_MESSAGES.ERROR_MESSAGES.SEND_INVITATION_FAILED,
  })
}
