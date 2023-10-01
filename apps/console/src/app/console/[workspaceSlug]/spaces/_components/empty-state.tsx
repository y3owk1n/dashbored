import Link from "next/link";
import { EmptyState as DefaultEmptyState } from "@/components/dashboard/empty-state";
import { Button, Icons } from "@dashbored/ui";

export function EmptyState() {
  return (
    <DefaultEmptyState
      icon="orbit"
      title="No spaces"
      description="Create your first space"
      action={
        <Button asChild>
          <Link href="./spaces/create">
            <Icons.plus className="mr-2 h-4 w-4" /> New
          </Link>
        </Button>
      }
    />
  );
}
