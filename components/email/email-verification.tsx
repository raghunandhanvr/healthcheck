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
  
  interface EmailVerificationTemplateProps {
    userFirstName: string
    verificationUrl: string
  }
  
  export const EmailVerificationTemplate = ({ userFirstName, verificationUrl }: EmailVerificationTemplateProps) => (
    <Html>
      <Head />
      <Preview>Verify your email address to complete your healthcheck.sh account setup</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Verify your email address</Heading>
          <Text style={text}>Hi {userFirstName},</Text>
          <Text style={text}>
            Thank you for creating an account with healthcheck.sh. To complete your account setup, please verify your email
            address by clicking the button below:
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={verificationUrl}>
              Verify Email Address
            </Button>
          </Section>
          <Text style={text}>If you&apos;re unable to click the button above, copy and paste this URL into your browser:</Text>
          <Link href={verificationUrl} style={link}>
            {verificationUrl}
          </Link>
          <Text style={footer}>If you didn&apos;t create an account with healthcheck.sh, you can safely ignore this email.</Text>
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
    marginTop: "32px",
  }