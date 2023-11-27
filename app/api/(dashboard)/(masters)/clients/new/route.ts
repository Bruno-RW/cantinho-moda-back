import { NextResponse } from "next/server";
import { hash } from "bcrypt";

import db from "@/lib/db";
import { clientFormSchema } from "@/lib/types/forms";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    const { name, email, password } = clientFormSchema.parse(body);

    const existingClientByEmail = await db.client.findUnique({ where: { email } });

    if (existingClientByEmail) return NextResponse.json("E-mail already exists", { status: 400 });

    const hashedPassword = await hash(password, 10);

    await db.client.create({
      data: {
        password: hashedPassword,
        name,
        email,
      }
    });

    return NextResponse.json("Client user created successfully", { status: 201 });

  } catch (error) {
    console.log("[NEWCLIENT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}