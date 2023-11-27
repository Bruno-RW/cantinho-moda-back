import { NextResponse } from "next/server";
import { compare, hash } from "bcrypt";

import db from "@/lib/db";
import { clientFormSchema } from "@/lib/types/forms";

export async function GET(
  req: Request,
  {params}: {params: {clientId: string}}
) {
  try {
    if (!Number(params.clientId)) return new NextResponse("Client ID must be a number", { status: 400 });
    
    const client = await db.client.findUnique({ where: {id: Number(params.clientId)} });

    if (!client) return NextResponse.json("Invalid client ID", { status: 400 });

    return NextResponse.json(client);

  } catch (error) {
    console.log("[CLIENT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {params}: {params: {clientId: string}}
) {
  try {
    const body: unknown = await req.json();
    const { name, email, password } = clientFormSchema.parse(body);

    const existingClientById = await db.client.findUnique({ where: { id: Number(params.clientId) } });

    if (!existingClientById) return NextResponse.json("Client does not exist", { status: 400 });

    const existingClientByEmail = await db.client.findUnique({ where: { email } });

    if (existingClientByEmail && existingClientByEmail.id !== existingClientById.id) return NextResponse.json("E-mail is already taken", { status: 400 });

    const isSamePassword = await compare(password, existingClientById.password);
    const newHashedPassword = await hash(password, 10);
  
    await db.client.update({
      where: { email },
      data: {
        name,
        email,
        password: isSamePassword ? password : newHashedPassword,
      }
    });

    return NextResponse.json("Client user updated successfully", { status: 201 });

  } catch (error) {
    console.log("[CLIENT_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {params}: {params: {clientId: string}}
) {
  try {
    if (!Number(params.clientId)) return new NextResponse("Client ID must be a number", { status: 400 });
    
    const client = await db.client.findUnique({ where: {id: Number(params.clientId)} });

    if (!client) return NextResponse.json("Invalid client ID", { status: 400 });

    const deletedClient = await db.client.delete({ where: {id: Number(params.clientId)} });

    return NextResponse.json(deletedClient);

  } catch (error) {
    console.log("[CLIENT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}