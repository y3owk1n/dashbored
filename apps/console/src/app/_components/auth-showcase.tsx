import { SignIn, SignOut } from "@/components/auth";
import { auth } from "@dashbored/auth";

export async function AuthShowcase() {
  const session = await auth();

  if (!session) {
    return <SignIn provider="google">Sign in with Google</SignIn>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl ">
        {session && <span>Logged in as {session.user.name}</span>}
      </p>

      <SignOut>Sign out</SignOut>
    </div>
  );
}
