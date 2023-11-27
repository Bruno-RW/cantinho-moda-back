import { NextResponse } from "next/server";

import db from "@/lib/db";
import { brandFormSchema } from "@/lib/types/forms";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const { name, manufacturer } = brandFormSchema.parse(body);

    const existingBrandByName = await db.brand.findFirst({ where: { name } });

    if (existingBrandByName) return NextResponse.json("Brand already exists", { status: 400 });

    await db.brand.create({
      data: {
        name,
        manufacturer,
      }
    });

    return NextResponse.json("Brand created successfully", { status: 201 });

  } catch (error) {
    console.log("[NEWBRAND_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}