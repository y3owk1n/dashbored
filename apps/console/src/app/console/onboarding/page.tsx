import { Header } from "@/components/dashboard/header";
import { CreateWorkspaceForm } from "@/components/forms/create-workspace-form";

import { Description } from "./_components/description";

export default function Onboarding() {
  return (
    <div className="flex h-full w-full flex-col gap-6 md:gap-8">
      <Header
        title="Let's Get Started!"
        description="Create your first workspace."
      />
      <div className="grid h-full w-full gap-6 md:grid-cols-3 md:gap-8">
        <div className="md:col-span-2">
          <CreateWorkspaceForm />
        </div>
        <div className="hidden h-full md:col-span-1 md:block">
          <Description />
        </div>
      </div>
    </div>
  );
}
