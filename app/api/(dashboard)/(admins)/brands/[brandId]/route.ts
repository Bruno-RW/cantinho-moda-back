import { NextResponse } from "next/server";

import db from "@/lib/db";
import { brandFormSchema } from "@/lib/types/forms";

export async function GET(
  req: Request,
  {params}: {params: {brandId: string}}
) {
  try {
    if (!Number(params.brandId)) return new NextResponse("Brand ID must be a number", { status: 400 });
    
    const brand = await db.brand.findUnique({ where: {id: Number(params.brandId)} });

    if (!brand) return NextResponse.json("Invalid brand ID", { status: 400 });

    return NextResponse.json(brand);

  } catch (error) {
    console.log("[BRAND_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {params}: {params: {brandId: string}}
) {
  try {
    const body: unknown = await req.json();
    const { name, manufacturer } = brandFormSchema.parse(body);

    const existingBrandById = await db.brand.findUnique({ where: { id: Number(params.brandId) } });

    if (!existingBrandById) return NextResponse.json("Brand does not exist", { status: 400 });

    const existingBrandByName = await db.brand.findFirst({ where: { name } });

    if (existingBrandByName && existingBrandByName.id !== existingBrandById.id) return NextResponse.json("Name is already taken", { status: 400 });

    await db.brand.update({
      where: { id: Number(params.brandId) },
      data: {
        name,
        manufacturer
      }
    });

    return NextResponse.json("Brand updated successfully", { status: 201 });

  } catch (error) {
    console.log("[BRAND_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {params}: {params: {brandId: string}}
) {
  try {
    if (!Number(params.brandId)) return new NextResponse("Brand ID must be a number", { status: 400 });
    
    const brand = await db.brand.findUnique({ where: {id: Number(params.brandId)} });

    if (!brand) return NextResponse.json("Invalid brand ID", { status: 400 });

    const deletedBrand = await db.brand.delete({ where: {id: Number(params.brandId)} });

    return NextResponse.json(deletedBrand);

  } catch (error) {
    console.log("[BRAND_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}