import { NextResponse } from "next/server";

import db from "@/lib/db";
import { categoryFormSchema } from "@/lib/types/forms";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const { name, description } = categoryFormSchema.parse(body);

    const existingCategoryByName = await db.category.findFirst({ where: { name } });

    if (existingCategoryByName) return NextResponse.json("Category already exists", { status: 400 });

    await db.category.create({
      data: {
        name,
        description,
      }
    });

    return NextResponse.json("Category created successfully", { status: 201 });

  } catch (error) {
    console.log("[NEWCATEGORY_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}