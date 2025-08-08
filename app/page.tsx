import LandingNavbar from '@/components/layout/landing-navbar'

export default function Home() {
  return (
    <div className="min-h-screen layout-container">
      <LandingNavbar />
      <div className="centered">
        <p>
          A lightweight uptime and performance monitoring tool for your websites, APIs, servers, and even AI models.<br />
          Build trust with status pages. Way cheaper in cost compared to alternatives.
        </p>
      </div>
    </div>
  )
}
