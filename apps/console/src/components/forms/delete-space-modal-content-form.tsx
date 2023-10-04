import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/client-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { useToast } from "@dashbored/hooks";
import {
  Button,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Icons,
  Input,
  useForm,
} from "@dashbored/ui";

const deleteSpaceSchema = z.object({
  slug: z.string(),
});

type Schema = z.infer<typeof deleteSpaceSchema>;

interface DeleteSpaceModalContentProps {
  spaceSlug: string;
  closeAction: () => void;
}

export function DeleteSpaceModalContentForm({
  spaceSlug,
  closeAction,
}: DeleteSpaceModalContentProps) {
  const form = useForm<Schema>({
    resolver: zodResolver(deleteSpaceSchema),
    defaultValues: {
      slug: "",
    },
  });

  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  function onSubmit(values: Schema) {
    startTransition(async () => {
      if (values.slug !== spaceSlug) {
        form.setError("slug", {
          message: "Slug does not match",
        });
        return;
      }
      try {
        await api.space.deleteBySlug.mutate({
          spaceSlug: values.slug,
        });

        toast({
          title: "Delete Success!",
        });

        closeAction();
        router.refresh();
      } catch (e) {
        if (e instanceof TRPCError) {
          toast({
            title: e.name,
            description: e.message,
            variant: "destructive",
          });
        }
        toast({
          title: "Something went wrong",
          description: "Try again later or contact us",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <DialogHeader>
            <DialogTitle>Delete {spaceSlug}</DialogTitle>
            <DialogDescription>
              To confirm, please type &quot;{spaceSlug}&quot; in the box below.
            </DialogDescription>
          </DialogHeader>
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={spaceSlug} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {!isPending ? "Delete this space" : <Icons.loader />}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
