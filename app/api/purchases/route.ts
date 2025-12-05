import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createPurchaseSchema = z.object({
  listingId: z.string(),
  buyerId: z.string(),
  transactionSignature: z.string(),
  amount: z.number().positive(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createPurchaseSchema.parse(body);

    // Convert amount to BigInt (assuming 9 decimals)
    const amountInTokens = BigInt(Math.floor(data.amount * Math.pow(10, 9)));

    // Create purchase and update listing in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Check if listing exists and is not sold
      const listing = await tx.listing.findUnique({
        where: { id: data.listingId },
      });

      if (!listing) {
        throw new Error("Listing not found");
      }

      if (listing.sold) {
        throw new Error("Listing already sold");
      }

      if (listing.sellerId === data.buyerId) {
        throw new Error("Cannot purchase your own listing");
      }

      // Create purchase record
      const purchase = await tx.purchase.create({
        data: {
          listingId: data.listingId,
          buyerId: data.buyerId,
          transactionSignature: data.transactionSignature,
          amount: amountInTokens,
        },
        include: {
          listing: true,
          buyer: {
            select: {
              walletAddress: true,
              username: true,
            },
          },
        },
      });

      // Update listing as sold
      await tx.listing.update({
        where: { id: data.listingId },
        data: {
          sold: true,
          buyerId: data.buyerId,
        },
      });

      return purchase;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error creating purchase:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create purchase" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const buyerId = searchParams.get("buyerId");

    const where: any = {};
    if (buyerId) {
      where.buyerId = buyerId;
    }

    const purchases = await prisma.purchase.findMany({
      where,
      include: {
        listing: {
          include: {
            seller: {
              select: {
                walletAddress: true,
                username: true,
              },
            },
          },
        },
        buyer: {
          select: {
            walletAddress: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(purchases);
  } catch (error) {
    console.error("Error fetching purchases:", error);
    return NextResponse.json(
      { error: "Failed to fetch purchases" },
      { status: 500 }
    );
  }
}

