import * as React from "react";
import Link from "next/link";
import { Header } from "@/components/dashboard/header";
import { DataCard } from "@/components/data-card/spaces/data-card";
import { RefreshOnFocus } from "@/components/refresh-on-focus";
import { api } from "@/utils/server-api";
import { Button, Icons } from "@dashbored/ui";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { EmptyState } from "./_components/empty-state";
import { SpacesCardAction } from "./_components/spaces-card-action";

dayjs.extend(relativeTime);

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

      {spaces?.length > 0 ? (
        <div className="col-span-full">
          {spaces && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {spaces.map((space) => (
                <DataCard
                  key={space.id}
                  {...space}
                  action={<SpacesCardAction spaceSlug={space.slug} />}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="col-span-full">
          <EmptyState />
        </div>
      )}
      <RefreshOnFocus />
    </div>
  );
}
