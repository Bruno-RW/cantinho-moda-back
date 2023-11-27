import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(req: Request) {
  try {
    const brands = await db.brand.findMany();

    return NextResponse.json(brands);

  } catch (error) {
    console.log("[BRANDS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}