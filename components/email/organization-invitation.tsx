import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface OrganizationInvitationTemplateProps {
  invitedByUsername: string
  invitedByEmail: string
  organizationName: string
  inviteLink: string
  invitationId: string
}

export const OrganizationInvitationTemplate = ({ 
  invitedByUsername,
  invitedByEmail,
  organizationName,
  inviteLink,
  invitationId
}: OrganizationInvitationTemplateProps) => (
  <Html>
    <Head />
    <Preview>You&apos;re invited to join {organizationName} environment on Data Atmos</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={logo}>Data Atmos</Text>
        </Section>
        
        <Section style={content}>
          <Heading style={h1}>You&apos;re invited to join {organizationName} environment</Heading>
          
          <Text style={text}>
            Hello there,
          </Text>
          
          <Text style={text}>
            <strong>{invitedByUsername}</strong> ({invitedByEmail}) has invited you to join the <strong>{organizationName}</strong> environment on Data Atmos.
          </Text>
          
          <Text style={text}>
            This environment will allow you to collaborate on data platform configurations and workloads together.
          </Text>
          
          <Section style={buttonSection}>
            <Button style={button} href={inviteLink}>
              Join Environment
            </Button>
          </Section>
          
          <Text style={smallText}>
            If the button above doesn&apos;t work, you can also copy and paste this link into your browser:
          </Text>
          
          <Link href={inviteLink} style={link}>
            {inviteLink}
          </Link>
          
          <Section style={divider} />
          
          <Text style={footer}>
            This invitation will expire in 48 hours. If you didn&apos;t expect this invitation, you can safely ignore this email.
          </Text>
          
          <Text style={invitationIdText}>
            Invitation ID: {invitationId}
          </Text>
          
          <Text style={signature}>
            Best regards,<br />
            The Data Atmos Team
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

const main = {
  backgroundColor: "#f8f9fa",
  fontFamily: "Geist, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
  margin: "0",
  padding: "0",
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0",
  maxWidth: "600px",
  width: "100%",
  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.09)",
}

const header = {
  backgroundColor: "#000000",
  padding: "24px",
  textAlign: "center" as const,
}

const logo = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "600",
  margin: "0",
  letterSpacing: "-0.5px",
}

const content = {
  padding: "48px 32px",
}

const h1 = {
  color: "#000000",
  fontSize: "28px",
  fontWeight: "600",
  lineHeight: "1.3",
  margin: "0 0 24px 0",
  letterSpacing: "-0.5px",
}

const text = {
  color: "#525252",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 24px 0",
}

const smallText = {
  color: "#525252",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0 0 16px 0",
}

const buttonSection = {
  margin: "32px 0",
  textAlign: "center" as const,
}

const button = {
  backgroundColor: "#0969da",
  borderRadius: "8px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "1",
  padding: "14px 28px",
  textDecoration: "none",
  textAlign: "center" as const,
  border: "none",
  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.09)",
}

const link = {
  color: "#0969da",
  fontSize: "14px",
  textDecoration: "underline",
  wordBreak: "break-all" as const,
  margin: "0 0 24px 0",
  display: "block",
}

const divider = {
  borderTop: "1px solid #e4e4e4",
  margin: "40px 0 32px 0",
}

const footer = {
  color: "#525252",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0 0 16px 0",
}

const invitationIdText = {
  color: "#a4a4a4",
  fontSize: "12px",
  lineHeight: "1.5",
  margin: "0 0 24px 0",
}

const signature = {
  color: "#000000",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0",
}
