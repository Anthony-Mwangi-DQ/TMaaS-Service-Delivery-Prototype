import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileStack,
  FolderOpen,
  MessageSquare,
  Bell,
  ChevronRight,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  { name: "Dashboard", href: "/console", icon: LayoutDashboard },
  { name: "Active Deliveries", href: "/console/deliveries", icon: FileStack },
  { name: "Notifications", href: "/console/notifications", icon: Bell },
  { name: "Documents", href: "/console/documents", icon: FolderOpen },
  { name: "Messages", href: "/console/messages", icon: MessageSquare },
];

export function ConsoleSidebar() {
  const location = useLocation();
  const { profile, signOut } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#001035]">
          <span className="text-lg font-bold text-white">DQ</span>
        </div>
        <div>
          <span className="text-base font-semibold text-foreground">TMaaS</span>
          <p className="text-xs text-muted-foreground">Delivery Console</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== "/console" && location.pathname.startsWith(item.href));
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#001035]/10 text-[#001035]"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 flex-shrink-0",
                isActive ? "text-[#001035]" : "text-muted-foreground group-hover:text-foreground"
              )} />
              <span>{item.name}</span>
              {isActive && (
                <ChevronRight className="ml-auto h-4 w-4 text-[#001035]" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="border-t border-sidebar-border p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start p-0 h-auto hover:bg-transparent">
              <div className="flex items-center gap-3 w-full">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#001035]/10">
                  <span className="text-sm font-medium text-[#001035]">
                    {profile ? getInitials(profile.display_name) : '??'}
                  </span>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-foreground truncate">
                    {profile?.display_name || 'Loading...'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    Supplier Delivery Lead • {profile?.organization || '...'}
                  </p>
                </div>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
