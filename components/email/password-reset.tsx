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

interface PasswordResetTemplateProps {
  userFirstName: string
  resetUrl: string
}

export const PasswordResetTemplate = ({ 
  userFirstName, 
  resetUrl 
}: PasswordResetTemplateProps) => (
  <Html>
    <Head />
    <Preview>Reset your password for Data Atmos</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={logo}>Data Atmos</Text>
        </Section>
        
        <Section style={content}>
          <Heading style={h1}>Reset your password</Heading>
          
          <Text style={text}>
            Hello {userFirstName},
          </Text>
          
          <Text style={text}>
            You recently requested to reset your password for your Data Atmos account. 
            Click the button below to create a new password.
          </Text>
          
          <Section style={buttonSection}>
            <Button style={button} href={resetUrl}>
              Reset Password
            </Button>
          </Section>
          
          <Text style={smallText}>
            If the button above doesn&apos;t work, you can also copy and paste this link into your browser:
          </Text>
          
          <Link href={resetUrl} style={link}>
            {resetUrl}
          </Link>
          
          <Section style={divider} />
          
          <Text style={footer}>
            If you didn&apos;t request a password reset, you can safely ignore this email. 
            Your password won&apos;t be changed until you create a new one using the link above.
            This password reset link will expire in 1 hour for security reasons.
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
  backgroundColor: "#e54b4f",
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
  color: "#e54b4f",
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
  margin: "0 0 24px 0",
}

const signature = {
  color: "#000000",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0",
}