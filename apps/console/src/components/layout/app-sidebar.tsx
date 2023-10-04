"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { Icons } from "@dashbored/ui";
import { cn } from "@dashbored/utils";

import { pagesConfig } from "../config/pages";

export function AppSidebar() {
  const pathname = usePathname();
  const params = useParams();

  return (
    <div className="flex h-full flex-col justify-between">
      <ul className="grid gap-1">
        {pagesConfig.map(({ title, href, icon, disabled }) => {
          const Icon = Icons[icon];
          const link = `/console/${params?.workspaceSlug as string}${href}`;
          const isActive = pathname?.startsWith(link);
          return (
            <li key={title} className="w-full">
              <Link
                href={link}
                className={cn(
                  "group flex w-full min-w-[200px] items-center rounded-md border border-transparent px-3 py-1 text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                  isActive && "border-border bg-muted/50 text-foreground", // font-semibold
                  disabled && "pointer-events-none opacity-60",
                )}
              >
                <Icon className={cn("mr-2 h-4 w-4")} />
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
      <ul>
        <li className="w-full">
          <Link
            href={`/console/${params?.workspaceSlug as string}/settings`}
            className={cn(
              "group flex w-full min-w-[200px] items-center rounded-md border border-transparent px-3 py-1 text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              pathname?.startsWith(
                `/console/${params?.workspaceSlug as string}/settings`,
              ) && "border-border bg-muted/50 text-foreground",
            )}
          >
            <Icons.cog className={cn("mr-2 h-4 w-4")} />
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
