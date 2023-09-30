import type { OAuthProviders } from "@dashbored/auth";
import { CSRF_experimental } from "@dashbored/auth";
import type { ButtonProps } from "@dashbored/ui";
import { Button } from "@dashbored/ui";

export function SignIn({
  provider,
  ...props
}: { provider: OAuthProviders } & ButtonProps) {
  return (
    <form action={`/api/auth/signin/${provider}`} method="post">
      <Button {...props} />
      <CSRF_experimental />
    </form>
  );
}

export function SignOut(props: ButtonProps) {
  return (
    <form action="/api/auth/signout" method="post">
      <Button {...props} />
      <CSRF_experimental />
    </form>
  );
}
