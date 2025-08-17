export interface Alias {
  alias: string
  target: string
}

export const aliases: Alias[] = [
  { alias: "login", target: "/auth" },
  { alias: "signin", target: "/auth" },
  { alias: "signup", target: "/auth" },
  { alias: "register", target: "/auth" },
  { alias: "dashboard", target: "/console" },
  { alias: "settings", target: "/console/profile" },
  { alias: "profile", target: "/console/profile" },
  { alias: "billing", target: "/console/organization/billing" },
  { alias: "team", target: "/console/organization/people" },
  { alias: "projects", target: "/console/organization/projects" },
]
