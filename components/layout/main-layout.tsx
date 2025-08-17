interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="main-content-wrapper">
      <div className="main-scrollable-content">{children}</div>
    </main>
  )
}
