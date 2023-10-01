"use client";

import { useCallback, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/client-api";
import type { Spaces } from "@dashbored/db/schema/space";
import { insertSpaceSchema } from "@dashbored/db/schema/space";
import { useDebounce, useToast } from "@dashbored/hooks";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icons,
  Input,
  Textarea,
  useForm,
} from "@dashbored/ui";
import { slugify } from "@dashbored/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCError } from "@trpc/server";
import type { z } from "zod";

type Schema = z.infer<typeof insertSpaceSchema>;

interface EditSpaceFormProps {
  space: Spaces;
}

export function EditSpaceForm({ space }: EditSpaceFormProps) {
  // 1. Define your form.
  const form = useForm<Schema>({
    resolver: zodResolver(insertSpaceSchema),
    defaultValues: {
      title: space.title,
      slug: space.slug,
      description: space.description,
    },
  });

  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const watchSlug = form.watch("slug");
  const watchTitle = form.watch("title");
  const debouncedSlug = useDebounce(watchSlug, 1000);

  const checkUniqueSlug = useCallback(async () => {
    if (debouncedSlug === space.slug) return true;

    const isUnique = await api.space.checkUniqueSlug.mutate({
      slug: debouncedSlug,
    });

    return isUnique;
  }, [debouncedSlug, space.slug]);

  useEffect(() => {
    async function watchSlugChanges() {
      const isUnique = await checkUniqueSlug();
      if (!isUnique) {
        form.setError("slug", {
          message: "Already taken. Please select another slug.",
        });
      } else {
        form.clearErrors("slug");
      }
    }

    void watchSlugChanges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkUniqueSlug]);

  useEffect(() => {
    form.setValue("slug", slugify(watchTitle));
  }, [watchTitle, form]);

  // 2. Define a submit handler.
  function onSubmit(values: Schema) {
    startTransition(async () => {
      try {
        await api.space.update.mutate({
          data: values,
          spaceId: space.id,
        });

        toast({
          title: "Update Success!",
        });

        router.push(`../`);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Space Name</FormLabel>
              <FormControl>
                <Input placeholder="Wiki" {...field} />
              </FormControl>
              <FormDescription>
                A space is essentially like a page for a dashboard
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Space Slug</FormLabel>
              <FormControl>
                <Input placeholder="wiki" {...field} />
              </FormControl>
              <FormDescription>Use special or meaningful slug</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Space Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormDescription>
                This is for internal use, use it as a note so that you remembers
                what this space is for.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {!isPending ? "Confirm" : <Icons.loader />}
        </Button>
      </form>
    </Form>
  );
}
