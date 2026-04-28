"use server";

import dbConnect from "@/lib/mongodb";
import NFTModel from "@/models/NFT";
import { NFT } from "@/types";

export async function createNFTAction(data: Partial<NFT>) {
  try {
    await dbConnect();
    const nft = await NFTModel.create(data);
    return { success: true, data: JSON.parse(JSON.stringify(nft)) };
  } catch (error: unknown) {
    console.error("Server Action Error:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}
