import Link from "next/link";
import { auth } from "@dashbored/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icons,
  Skeleton,
} from "@dashbored/ui";
import { ArrowUpRight } from "lucide-react";

import { socialsConfig } from "../config/socials";
import { Shell } from "../dashboard/shell";

export async function AppHeader() {
  const session = await auth();

  return (
    <header className="border-border sticky top-3 z-50 w-full md:top-6">
      <Shell className="bg-background/70 flex w-full items-center justify-between px-3 py-3 backdrop-blur-lg md:px-6 md:py-3">
        <Link
          href={`/${session ? "app" : ""}`}
          className="text-muted-foreground hover:text-foreground text-lg font-extrabold"
        >
          DashBored
        </Link>
        <div className="flex items-center gap-4">
          <ul className="flex gap-2">
            <li className="w-full">
              <Button variant="link" asChild>
                <Link href="https://docs.dashbored.dev" target="_blank">
                  Docs
                  <ArrowUpRight className="ml-1 h-4 w-4 flex-shrink-0" />
                </Link>
              </Button>
            </li>
            {socialsConfig.map(({ title, href, icon }) => {
              const Icon = Icons[icon];
              return (
                <li key={title} className="w-full">
                  <Button size="icon" variant="ghost" asChild>
                    <a href={href} target="_blank" rel="noreferrer">
                      <Icon className="h-5 w-5" />
                    </a>
                  </Button>
                </li>
              );
            })}
          </ul>
          <div className="relative">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="absolute inset-0">
              {session && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="rounded-full">
                    <Avatar className="h-8 w-8 rounded-full">
                      <AvatarImage src={session.user.image ?? undefined} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </Shell>
    </header>
  );
}
