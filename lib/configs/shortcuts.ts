export interface Shortcut {
  key: string
  metaKey?: boolean
  ctrlKey?: boolean
  description: string
  action: string
  requiresAuth?: boolean
}

export const shortcuts: Shortcut[] = [
  {
    key: "k",
    metaKey: true,
    ctrlKey: true,
    description: "Open command palette",
    action: "OPEN_COMMAND_PALETTE",
    requiresAuth: false,
  },
  {
    key: "b",
    metaKey: true,
    ctrlKey: true,
    description: "Toggle sidebar",
    action: "TOGGLE_SIDEBAR",
    requiresAuth: true,
  },
]
