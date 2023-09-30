import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { Session } from "@dashbored/auth";

const securePrefix = `__Secure-`;
const hostPrefix = `__Host-`;
const sessionTokenKey = "next-auth.session-token";
const secureSessionTokenKey = `${securePrefix}${sessionTokenKey}`;
const csrfTokenKey = "next-auth.csrf-token";
const secureCsrfTokenKey = `${hostPrefix}${csrfTokenKey}`;
const callbackUrlKey = "next-auth.callback-url";
const secureCallbackUrlKey = `${securePrefix}${callbackUrlKey}`;

export async function middleware(request: NextRequest) {
  // Getting cookies from the request

  let sessionToken;
  let csrfToken;
  let callbackurl;
  const { origin } = request.nextUrl;
  let requestCookie;

  if (process.env.NODE_ENV === "production" && origin.startsWith("https:")) {
    sessionToken = request.cookies.get(secureSessionTokenKey)?.value;
    csrfToken = request.cookies.get(secureCsrfTokenKey)?.value;
    callbackurl = request.cookies.get(secureCallbackUrlKey)?.value;
    requestCookie =
      (csrfToken ? `${secureCsrfTokenKey}=${csrfToken}; ` : "") +
      (callbackurl ? `${secureCallbackUrlKey}=${callbackurl}; ` : "") +
      (sessionToken ? `${secureSessionTokenKey}=${sessionToken}` : "");
  } else {
    sessionToken = request.cookies.get(sessionTokenKey)?.value;
    csrfToken = request.cookies.get(csrfTokenKey)?.value;
    callbackurl = request.cookies.get(callbackUrlKey)?.value;
    requestCookie =
      (csrfToken ? `${csrfTokenKey}=${csrfToken}; ` : "") +
      (callbackurl ? `${callbackUrlKey}=${callbackurl}; ` : "") +
      (sessionToken ? `${sessionTokenKey}=${sessionToken}` : "");
  }

  const sessionResponse = await fetch(`${origin}/api/auth/session`, {
    headers: {
      cookie: requestCookie,
    },
  });

  const session: Session = (await sessionResponse.json()) as Session;

  if (!session || Object.keys(session).length === 0 || !session.user) {
    return NextResponse.redirect(
      new URL(`/?callbackUrl=${encodeURIComponent(request.url)}`, origin),
    );
  }

  console.log(">>> Found user");

  // If there's workspace for the user, redirect to dashboard
  if (session.user.workspaces.length > 0) {
    console.log(">>> User has workspace");

    const splittedPathName = request.nextUrl.pathname.split("/");

    const slug = splittedPathName[2];

    const isSlugOwner = session.user.workspaces.findIndex(
      (ws) => ws.slug === slug,
    );

    if (isSlugOwner === -1) {
      const workspaceSelection = new URL(
        `/console/${session.user.workspaces[0]?.slug}/monitors`,
        origin,
      );
      console.log(
        `>>> No slug found, redirecting to first found slug: ${workspaceSelection.toString()}`,
      );
      return NextResponse.redirect(workspaceSelection);
    }

    return NextResponse.next();
  }

  if (request.nextUrl.pathname !== "/console/onboarding") {
    // If no workspace, redirect to onboarding
    console.log(`>>> User does not have workspace`);
    console.log(`>>> Redirecting to onboarding`);
    const onboarding = new URL(`/console/onboarding`, origin);
    return NextResponse.redirect(onboarding);
  }
}

export const config = {
  matcher: ["/console/:path*"],
};
