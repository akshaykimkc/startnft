export interface NFT {
  id: string | number;
  _id?: string;
  tokenId: number;
  name: string;
  description?: string;
  image?: string;
  imageUrl?: string;
  price: string;
  royalty: string;
  creator: string;
  owner: string;
  status: "pending" | "verified" | "listed" | "sold";
  isListed: boolean;
}

export interface StellarAccount {
  balances: {
    asset_type: string;
    asset_code?: string;
    asset_issuer?: string;
    balance: string;
  }[];
}
