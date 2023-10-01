import type { Session } from "@dashbored/auth";
import { auth } from "@dashbored/auth";
import { db, eq } from "@dashbored/db";
import { usersToWorkspaces, workspaces } from "@dashbored/db/schema/workspace";

export async function GET() {
  let currentWorkspaces: Session["user"]["workspaces"] = [];

  const session = await auth();

  if (!session) return Response.json(null);

  const userWithWorkspace = await db
    .select()
    .from(usersToWorkspaces)
    .leftJoin(workspaces, eq(usersToWorkspaces.workspaceId, workspaces.id))
    .where(eq(usersToWorkspaces.userId, session.user.id));

  if (userWithWorkspace.length === 0) {
    currentWorkspaces = [];
  } else {
    currentWorkspaces = userWithWorkspace.map((ws) => {
      return {
        id: ws.workspace!.id,
        slug: ws.workspace!.slug,
      };
    });
  }

  return Response.json({
    ...session,
    user: {
      ...session.user,
      workspaces: currentWorkspaces,
    },
  });
}
