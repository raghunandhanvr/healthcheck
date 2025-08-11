export interface SideIconProps {
  size?: number;
  className?: string;
}

export type SideIcon = React.ComponentType<SideIconProps>;

export interface SidebarMenuItem {
  id: string;
  label: string;
  icon: SideIcon;
  href: string;
}

export interface SidebarContextType {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  menuItems: SidebarMenuItem[];
  currentPath: string;
  isConsoleRoute: boolean;
}

export interface SidebarProviderProps {
  children: React.ReactNode;
}

export interface SidebarConfig {
  [route: string]: SidebarMenuItem[];
}
