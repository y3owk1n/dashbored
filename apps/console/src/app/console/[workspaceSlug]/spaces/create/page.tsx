import { Header } from "@/components/dashboard/header";
import { CreateSpaceForm } from "@/components/forms/create-space-form";

export default function CreatePage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:gap-8">
      <Header title="Spaces" description={"Create new space"} />
      <div className="col-span-full">
        <CreateSpaceForm />
      </div>
    </div>
  );
}
