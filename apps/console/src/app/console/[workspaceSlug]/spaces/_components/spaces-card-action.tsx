"use client";

import { useState } from "react";
import Link from "next/link";
import { DeleteSpaceModalContentForm } from "@/components/forms/delete-space-modal-content-form";
import {
  Button,
  Dialog,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Icons,
} from "@dashbored/ui";

interface SpacesCardActionProps {
  spaceSlug: string;
}

export function SpacesCardAction({ spaceSlug }: SpacesCardActionProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-none"
          >
            <Icons.moreVertical className="text-secondary-foreground h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          alignOffset={-5}
          className="w-[200px]"
          forceMount
        >
          <DropdownMenuItem asChild>
            <Link href={`./spaces/edit/${spaceSlug}`}>
              <Icons.edit3 className="mr-2 h-4 w-4" /> Edit Space
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-destructive">
            Danger Zone
          </DropdownMenuLabel>

          <DialogTrigger asChild>
            <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
              <Icons.trash2 className="mr-2 h-4 w-4" /> Delete Space
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteSpaceModalContentForm
        spaceSlug={spaceSlug}
        closeAction={() => setOpen(false)}
      />
    </Dialog>
  );
}
