import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import NFT from "@/models/NFT";

export async function GET() {
  try {
    await dbConnect();
    const nfts = await NFT.find({}).sort({ createdAt: -1 });
    return NextResponse.json(nfts);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    console.log("POST /api/nfts body:", body);
    const nft = await NFT.create(body);
    return NextResponse.json(nft, { status: 201 });
  } catch (error: unknown) {
    console.error("POST /api/nfts error:", error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : String(error),
      stack: process.env.NODE_ENV === "development" && error instanceof Error ? error.stack : undefined 
    }, { status: 500 });
  }
}
