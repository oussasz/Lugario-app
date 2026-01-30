import { NextResponse } from "next/server";

export const runtime = "nodejs";

const handler = async () =>
  NextResponse.json(
    {
      error: "EdgeStore has been removed. Use POST /api/upload for local uploads.",
    },
    { status: 410 },
  );

export { handler as GET, handler as POST };

export type EdgeStoreRouter = never;
