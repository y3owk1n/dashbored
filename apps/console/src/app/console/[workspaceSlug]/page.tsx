import { redirect } from "next/navigation";

export default function DashboardRedirect({
  params,
}: {
  params: { workspaceSlug: string };
}) {
  return redirect(`/console/${params.workspaceSlug}/spaces`);
}
