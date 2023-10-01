import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@dashbored/ui";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface Props {
  title: string;
  description: string;
  updatedAt: Date;
  action?: React.ReactNode;
}

export function DataCard({ title, description, updatedAt, action }: Props) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <div className="flex-1 space-y-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription className="line-clamp-3">
            {description}
          </CardDescription>
        </div>
        {action}
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground flex space-x-4 text-xs">
          <span>Last Updated {dayjs(updatedAt).fromNow()}</span>
        </div>
      </CardContent>
    </Card>
  );
}
