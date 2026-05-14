import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {

  try {

    const result = await cloudinary.search
      .expression("folder:wedding")
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    const photos = result.resources.map((photo: any) => ({
      url: photo.secure_url,
      public_id: photo.public_id,
    }));

    return NextResponse.json(photos);

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      error: "讀取失敗"
    });

  }
}
