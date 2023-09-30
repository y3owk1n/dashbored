"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import type { OAuthProviders } from "@dashbored/auth";
import { useToast } from "@dashbored/hooks";
import { Button, DropdownMenuItem, Icons } from "@dashbored/ui";
import { signIn, signOut } from "next-auth/react";

export function SignIn() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  const handleSignIn = async (provider: OAuthProviders) => {
    setIsLoading(true);

    try {
      await signIn(provider, {
        callbackUrl: callbackUrl ?? "/console/onboarding",
      });
    } catch (e) {
      if (e instanceof Error) {
        toast({
          variant: "destructive",
          title: e.name,
          description: e.message,
        });
      }
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    }

    setIsLoading(false);
  };

  return (
    <Button
      onClick={() => handleSignIn("google")}
      variant="outline"
      type="button"
      disabled={isLoading}
    >
      {isLoading ? (
        <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.google className="mr-2 h-4 w-4" />
      )}{" "}
      Continue with Google
    </Button>
  );
}

export function SignOut() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const handleSignOut = async () => {
    setIsLoading(true);

    try {
      await signOut();
    } catch (e) {
      if (e instanceof Error) {
        toast({
          variant: "destructive",
          title: e.name,
          description: e.message,
        });
      }
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    }

    setIsLoading(false);
  };

  return (
    <DropdownMenuItem onClick={() => handleSignOut()} disabled={isLoading}>
      {isLoading ? (
        <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        "Log Out"
      )}
    </DropdownMenuItem>
  );
}
