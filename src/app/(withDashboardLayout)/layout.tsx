"use client";

import type React from "react";

import { useUser } from "@/components/context/UserContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  CalendarRange,
  LayoutDashboard,
  Loader,
  MessageSquareDiff,
  X,
} from "lucide-react";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const sidebarItemsUser = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: CalendarRange, label: "Add Project", href: "/dashboard/add-project" },
  {
    icon: MessageSquareDiff,
    label: "Manage Projects",
    href: "/dashboard/manage-projects",
  },
  { icon: CalendarRange, label: "Add Blog", href: "/dashboard/add-blog" },
  {
    icon: MessageSquareDiff,
    label: "Manage Blogs",
    href: "/dashboard/manage-blogs",
  },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useUser();

  // console.log({ user });
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);

  //   console.log(process.env.NEXT_PUBLIC_USER_EMAIL1);
  // Update active path when route changes
  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  // Handle responsive sidebar
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div>
      <div className="flex min-h-screen bg-gray-50 overflow-y-hidden">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}

        {user?.email === process.env.NEXT_PUBLIC_USER_EMAIL && (
          <div
            className={cn(
              "fixed inset-y-0 left-0 z-50 w-64 transform  h-screen transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:z-0",
              sidebarOpen ? "translate-x-0" : "-translate-x-full "
            )}
          >
            <div className="flex h-16 items-center justify-between px-4  border-b">
              <span className="text-lg font-semibold flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                {"Dashboard"}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close sidebar</span>
              </Button>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid gap-1 px-2">
                {/* check if user is admin then map sidebarItemsAdmin, and if the user is normal user then map over sidebarItemsUser */}
                {user?.email === process.env.NEXT_PUBLIC_USER_EMAIL &&
                  sidebarItemsUser?.map((item, index) => {
                    const isActive = activePath === item.href;

                    return (
                      <Link
                        key={index}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                          isActive
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                        onClick={() => isMobile && setSidebarOpen(false)}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    );
                  })}
              </nav>
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col min-w-0 max-h-screen overflow-y-auto">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <BarChart3 className="h-5 w-5" />
              <span className="sr-only">Open sidebar</span>
            </Button>
            <div className="w-full">
              <h1 className="text-lg font-semibold flex justify-end items-center py-4 bg-gray-50" >
                Dashboard
              </h1>
            </div>
          </header>
          <Suspense
            fallback={
              <div className="w-full h-[100vh] flex items-center justify-center">
                <Loader className="w-[80px] h-12 animate-spin" />
              </div>
            }
          >
            {children}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
