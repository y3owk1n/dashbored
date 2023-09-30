import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/dashboard/header";

export default function SpacesPage({
  params,
}: {
  params: { workspaceSlug: string };
}) {
  return (
    <div className="grid min-h-full grid-cols-1 grid-rows-[auto,1fr,auto] gap-6 md:grid-cols-2 md:gap-8">
      <Header title="Monitors" description="Overview of all your monitors." />
    </div>
  );
}
