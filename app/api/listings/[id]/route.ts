import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            walletAddress: true,
            username: true,
            bio: true,
            avatar: true,
          },
        },
      },
    });

    if (!listing) {
      return NextResponse.json(
        { error: "Listing not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Error fetching listing:", error);
    return NextResponse.json(
      { error: "Failed to fetch listing" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const listing = await prisma.listing.update({
      where: { id },
      data: {
        ...(body.sold !== undefined && { sold: body.sold }),
        ...(body.buyerId !== undefined && { buyerId: body.buyerId }),
      },
      include: {
        seller: {
          select: {
            walletAddress: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Error updating listing:", error);
    return NextResponse.json(
      { error: "Failed to update listing" },
      { status: 500 }
    );
  }
}

