import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createListingSchema = z.object({
  sellerId: z.string(),
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.number().positive(),
  category: z.string().optional(),
  images: z.array(z.string()).min(1),
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sellerId = searchParams.get("sellerId");
    const category = searchParams.get("category");
    const sold = searchParams.get("sold");
    const search = searchParams.get("search");

    const where: any = {};
    
    if (sellerId) {
      // sellerId should be a user ID, not wallet address
      where.sellerId = sellerId;
    }
    
    if (category) {
      where.category = category;
    }
    
    if (sold !== null) {
      where.sold = sold === "true";
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const listings = await prisma.listing.findMany({
      where,
      include: {
        seller: {
          select: {
            walletAddress: true,
            username: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = createListingSchema.parse(body);

    // Convert price to BigInt (assuming 9 decimals)
    const priceInTokens = BigInt(Math.floor(data.price * Math.pow(10, 9)));

    const listing = await prisma.listing.create({
      data: {
        sellerId: data.sellerId,
        title: data.title,
        description: data.description,
        price: priceInTokens,
        category: data.category,
        images: data.images,
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

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error creating listing:", error);
    return NextResponse.json(
      { error: "Failed to create listing" },
      { status: 500 }
    );
  }
}

