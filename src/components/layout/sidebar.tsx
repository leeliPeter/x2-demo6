"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  GalleryVerticalEnd,
  Database,
  LayoutGrid,
  UsersRound,
} from "lucide-react";
import { usePathname } from "next/navigation";

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const links = [
    {
      name: "Data Center",
      href: "/",
      icon: Database,
    },
    {
      name: "Projects",
      href: "/projects",
      icon: LayoutGrid,
    },
  ];

  return (
    <div className={cn("h-screen", className)}>
      <div className="flex flex-col justify-between h-full pt-4">
        <div className="flex flex-col items-center justify-start">
          <GalleryVerticalEnd className="p-3 h-12 w-12 text-background bg-foreground rounded-lg mb-2 " />
          <div className="product-name w-full flex flex-col items-center justify-center mt-2 pt-4 border-t-2 border-border">
            <p className="text-xs text-sidebar-foreground">GeniAltX</p>
            <p className="text-xs  text-orange-400 bg-orange-800 rounded-md px-2 py-1 pt-1.5">
              X2.alpha
            </p>
          </div>
          <div className="flex flex-col  mt-4">
            {links.map((link) => (
              <Link href={link.href} key={link.href}>
                <div
                  className={cn(
                    "flex flex-col gap-1 px-4 py-3 min-h-[84px] items-center justify-center cursor-pointer",
                    pathname === link.href &&
                      "bg-sidebar-accent border-l-4 border-orange-800"
                  )}
                >
                  <link.icon className="h-6 w-6" />
                  <p className="text-xs text-foreground text-center">
                    {link.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="user-icon p-3 flex items-center justify-center  border-t-2 border-border">
          <div className="bg-orange-500 text-background rounded-lg p-3">
            <UsersRound className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
