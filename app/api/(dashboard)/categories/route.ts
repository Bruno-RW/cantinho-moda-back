import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET(req: Request) {
  try {
    const categories = await db.category.findMany();

    return NextResponse.json(categories);

  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}