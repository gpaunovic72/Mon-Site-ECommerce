import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("picture") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier uploadé" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Le fichier doit être une image" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name.replace(/\.[^/.]+$/, "")}.webp`;
    const path = `public/uploads/${fileName}`;

    await sharp(buffer)
      .resize(800, 800, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toFile(path);

    const baseUrl = request.nextUrl.origin;
    const url = `${baseUrl}/uploads/${fileName}`;

    return NextResponse.json({ url: url }, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de l'upload:", error);
    return NextResponse.json(
      { error: "Erreur lors du traitement de l'image" },
      { status: 500 }
    );
  }
}
