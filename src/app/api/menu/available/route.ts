import { NextResponse } from "next/server";
import { connectToDatabase } from "@/services/database";
import { MenuItemModel } from "@/lib/models";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    
    // Find all menu items that are available
    const menuItems = await MenuItemModel.find({ isAvailable: true });
    
    return NextResponse.json({
      data: menuItems || []
    });
  } catch (error: any) {
    console.error("Failed to fetch available menu items:", error);
    // Return empty data on failure so the frontend falls back to demo items gracefully
    return NextResponse.json({
      data: [],
      error: error?.message || "Internal server error"
    });
  }
}
