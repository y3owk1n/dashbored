import * as React from "react";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dashbored/ui";
import { cn } from "@dashbored/utils";

dayjs.extend(relativeTime);

interface Props {
  title: string;
  description: string;
  slug: string;
  updatedAt: Date;
  action?: React.ReactNode;
}

export function DataCard({
  title,
  slug,
  description,
  updatedAt,
  action,
}: Props) {
  return (
    <div className="relative">
      <Link href={`./${slug}`}>
        <Card
          className={cn(
            "flex h-full flex-col justify-between transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:shadow-md",
            action && "pr-14",
          )}
        >
          <CardHeader className="flex flex-row items-start gap-4 space-y-0">
            <div className="flex-1 space-y-1">
              <CardTitle>{title}</CardTitle>
              <CardDescription className="line-clamp-3">
                {description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 text-xs text-muted-foreground">
              <span>Last Updated {dayjs(updatedAt).fromNow()}</span>
            </div>
          </CardContent>
        </Card>
      </Link>

      <span className="absolute right-0 top-0 mr-6 mt-6">{action}</span>
    </div>
  );
}
