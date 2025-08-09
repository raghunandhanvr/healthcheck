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
  
  export const PasswordResetTemplate = ({ userFirstName, resetUrl }: PasswordResetTemplateProps) => (
    <Html>
      <Head />
      <Preview>Reset your healthcheck.sh password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Reset your password</Heading>
          <Text style={text}>Hi {userFirstName},</Text>
          <Text style={text}>
            Someone recently requested a password change for your healthcheck.sh account. If this was you, you can set a new
            password by clicking the button below:
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={resetUrl}>
              Reset Password
            </Button>
          </Section>
          <Text style={text}>If you&apos;re unable to click the button above, copy and paste this URL into your browser:</Text>
          <Link href={resetUrl} style={link}>
            {resetUrl}
          </Link>
          <Text style={footer}>
            If you didn&apos;t request this password reset, you can safely ignore this email. Your password will remain
            unchanged.
          </Text>
          <Text style={footer}>This password reset link will expire in 1 hour for security reasons.</Text>
        </Container>
      </Body>
    </Html>
  )
  
  const main = {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  }
  
  const container = {
    margin: "0 auto",
    padding: "40px 24px",
    maxWidth: "560px",
  }
  
  const h1 = {
    color: "#000000",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "40px 0",
    padding: "0",
    textAlign: "center" as const,
  }
  
  const text = {
    color: "#000000",
    fontSize: "16px",
    lineHeight: "24px",
    margin: "16px 0",
  }
  
  const buttonContainer = {
    textAlign: "center" as const,
    margin: "32px 0",
  }
  
  const button = {
    backgroundColor: "#007bff",
    borderRadius: "6px",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px 24px",
    border: "none",
  }
  
  const link = {
    color: "#007bff",
    fontSize: "14px",
    textDecoration: "underline",
    wordBreak: "break-all" as const,
    display: "block",
    margin: "8px 0",
  }
  
  const footer = {
    color: "#666666",
    fontSize: "14px",
    lineHeight: "20px",
    marginTop: "24px",
  }