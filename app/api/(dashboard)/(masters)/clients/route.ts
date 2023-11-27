import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(req: Request) {
  try {
    const clients = await db.client.findMany();

    return NextResponse.json(clients);

  } catch (error) {
    console.log("[CLIENTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}