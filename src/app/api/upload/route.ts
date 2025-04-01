import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("picture") as File;
  if (!file)
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name}`;
  const path = `public/uploads/${fileName}`;
  await writeFile(path, buffer);

  const baseUrl = request.nextUrl.origin;
  const url = `${baseUrl}/uploads/${fileName}`;
  return NextResponse.json({ url: url }, { status: 201 });
}
