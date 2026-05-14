import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: 1,
      url: "https://picsum.photos/500/700?random=1",
    },
    {
      id: 2,
      url: "https://picsum.photos/500/700?random=2",
    },
    {
      id: 3,
      url: "https://picsum.photos/500/700?random=3",
    },
  ]);
}