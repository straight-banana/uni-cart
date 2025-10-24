import { Home, Heart, GitCompare, Settings, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "favorites", label: "Favorites", icon: Heart },
  { id: "compare", label: "Compare List", icon: GitCompare },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "help", label: "Help", icon: HelpCircle },
];

export const Sidebar = ({ activeItem, onItemClick }: SidebarProps) => {
  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 gradient-sidebar border-r border-border/50 shadow-lg">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                "hover:bg-white/50 hover:shadow-md",
                isActive && "bg-white shadow-lavender border-l-4 border-secondary"
              )}
            >
              <Icon className={cn(
                "h-5 w-5",
                isActive ? "text-secondary" : "text-muted-foreground"
              )} />
              <span className={cn(
                "font-medium text-sm",
                isActive ? "text-secondary" : "text-foreground"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
