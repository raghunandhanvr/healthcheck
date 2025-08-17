import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface OTPVerificationTemplateProps {
  userFirstName: string
  otp: string
}

export const OTPVerificationTemplate = ({ 
  userFirstName, 
  otp 
}: OTPVerificationTemplateProps) => (
  <Html>
    <Head />
    <Preview>Your 2FA verification code for Data Atmos</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={logo}>Data Atmos</Text>
        </Section>
        
        <Section style={content}>
          <Heading style={h1}>Your verification code</Heading>
          
          <Text style={text}>
            Hello {userFirstName},
          </Text>
          
          <Text style={text}>
            Your 2FA verification code is:
          </Text>
          
          <Section style={otpSection}>
            <Text style={otpCode}>{otp}</Text>
          </Section>
          
          <Text style={expiryText}>
            This code will expire in 5 minutes for security reasons.
          </Text>
          
          <Section style={divider} />
          
          <Text style={footer}>
            If you didn&apos;t request this code, please ignore this email. Your account remains secure.
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

const otpSection = {
  backgroundColor: "#fcfcfc",
  border: "1px solid #e4e4e4",
  borderRadius: "8px",
  padding: "32px 24px",
  textAlign: "center" as const,
  margin: "32px 0",
}

const otpCode = {
  color: "#000000",
  fontSize: "36px",
  fontWeight: "700",
  letterSpacing: "8px",
  margin: "0",
  fontFamily: "Geist Mono, 'Courier New', monospace",
}

const expiryText = {
  color: "#525252",
  fontSize: "14px",
  lineHeight: "1.5",
  margin: "0 0 32px 0",
  textAlign: "center" as const,
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
