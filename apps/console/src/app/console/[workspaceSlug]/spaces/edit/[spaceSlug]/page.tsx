import { notFound } from "next/navigation";
import { Header } from "@/components/dashboard/header";
import { EditSpaceForm } from "@/components/forms/edit-space-form";
import { api } from "@/utils/server-api";

export default async function EditPage({
  params,
}: {
  params: { spaceSlug: string };
}) {
  const space = await api.space.byId.query({
    slug: params.spaceSlug,
  });

  if (!space) return notFound();

  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
      <Header
        title="Update Space"
        description={`Update ${space.title}'s space details.`}
      />
      <div className="col-span-full">
        <EditSpaceForm space={space} />
      </div>
    </div>
  );
}
