import { NextResponse } from "next/server";

import db from "@/lib/db";
import { categoryFormSchema } from "@/lib/types/forms";

export async function GET(
  req: Request,
  {params}: {params: {categoryId: string}}
) {
  try {
    if (!Number(params.categoryId)) return new NextResponse("Category ID must be a number", { status: 400 });
    
    const category = await db.category.findUnique({ where: {id: Number(params.categoryId)} });

    if (!category) return NextResponse.json("Invalid category ID", { status: 400 });

    return NextResponse.json(category);

  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {params}: {params: {categoryId: string}}
) {
  try {
    const body: unknown = await req.json();
    const { name, description } = categoryFormSchema.parse(body);

    const existingCategoryById = await db.category.findUnique({ where: { id: Number(params.categoryId) } });

    if (!existingCategoryById) return NextResponse.json("Category does not exist", { status: 400 });

    const existingCategoryByName = await db.category.findFirst({ where: { name } });

    if (existingCategoryByName && existingCategoryByName.id !== existingCategoryById.id) return NextResponse.json("Name is already taken", { status: 400 });

    await db.category.update({
      where: { id: Number(params.categoryId) },
      data: {
        name,
        description
      }
    });

    return NextResponse.json("Category updated successfully", { status: 201 });

  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {params}: {params: {categoryId: string}}
) {
  try {
    if (!Number(params.categoryId)) return new NextResponse("Category ID must be a number", { status: 400 });
    
    const category = await db.category.findUnique({ where: {id: Number(params.categoryId)} });

    if (!category) return NextResponse.json("Invalid category ID", { status: 400 });

    const deletedCategory = await db.category.delete({ where: {id: Number(params.categoryId)} });

    return NextResponse.json(deletedCategory);

  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}