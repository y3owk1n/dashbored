import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/dashboard/header";
import { api } from "@/utils/server-api";
import { Button, Icons } from "@dashbored/ui";

import { EmptyState } from "./_components/empty-state";

export default async function SpacesPage() {
  const spaces = await api.space.all.query();

  return (
    <div className="grid min-h-full grid-cols-1 grid-rows-[auto,1fr,auto] gap-6 md:grid-cols-2 md:gap-8">
      <Header
        title="Spaces"
        description="Overview of all your spaces."
        actions={
          <Button asChild>
            <Link href="./spaces/create">
              <Icons.plus className="mr-2 h-4 w-4" /> New
            </Link>
          </Button>
        }
      />
      <div className="col-span-full">
        <EmptyState />
      </div>
    </div>
  );
}
