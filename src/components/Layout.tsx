
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Calendar, 
  GraduationCap, 
  CreditCard, 
  LogOut, 
  Menu, 
  X,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

type SidebarItem = {
  icon: React.ElementType;
  label: string;
  href: string;
};

const sidebarItems: SidebarItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Calendar,
    label: "Attendance",
    href: "/attendance",
  },
  {
    icon: GraduationCap,
    label: "CGPA",
    href: "/cgpa",
  },
  {
    icon: CreditCard,
    label: "Fees",
    href: "/fees",
  },
  {
    icon: User,
    label: "Profile",
    href: "/profile",
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { student, logout } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: isMobile ? -280 : 0 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed z-40 h-full w-64 flex-shrink-0 bg-white shadow-sm",
          "flex flex-col justify-between border-r"
        )}
      >
        {/* Logo */}
        <div className="px-6 py-8">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="rounded-lg bg-primary p-2 text-primary-foreground">FL</div>
            <h1 className="text-xl font-semibold text-foreground">FL University</h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                  "hover:bg-muted",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground"
                )}
              >
                <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User profile */}
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="" alt={student?.name || ""} />
              <AvatarFallback>{student ? getInitials(student.name) : "FL"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium text-foreground">{student?.name}</p>
              <p className="text-xs text-muted-foreground">{student?.studentId}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Mobile overlay */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          <div className="flex-1 lg:ml-64">
            <h1 className="text-lg font-medium">
              {sidebarItems.find(item => item.href === location.pathname)?.label || "Dashboard"}
            </h1>
          </div>
        </header>

        {/* Page content */}
        <main
          className={cn(
            "flex-1 overflow-auto",
            "transition-all duration-300 ease-in-out",
            isMobile ? "ml-0" : (sidebarOpen ? "ml-64" : "ml-0")
          )}
        >
          <div className="container mx-auto p-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
