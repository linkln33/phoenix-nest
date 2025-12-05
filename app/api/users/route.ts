import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateUserSchema = z.object({
  walletAddress: z.string(),
  username: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const walletAddress = searchParams.get("walletAddress");

    if (!walletAddress) {
      return NextResponse.json(
        { error: "walletAddress is required" },
        { status: 400 }
      );
    }

    let user = await prisma.user.findUnique({
      where: { walletAddress },
      include: {
        listings: {
          orderBy: { createdAt: "desc" },
        },
        purchases: {
          include: {
            listing: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    // Create user if doesn't exist
    if (!user) {
      user = await prisma.user.create({
        data: {
          walletAddress,
        },
        include: {
          listings: {
            orderBy: { createdAt: "desc" },
          },
          purchases: {
            include: {
              listing: true,
            },
            orderBy: { createdAt: "desc" },
          },
        },
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = updateUserSchema.parse(body);

    const user = await prisma.user.upsert({
      where: { walletAddress: data.walletAddress },
      update: {
        ...(data.username !== undefined && { username: data.username }),
        ...(data.bio !== undefined && { bio: data.bio }),
        ...(data.avatar !== undefined && { avatar: data.avatar }),
      },
      create: {
        walletAddress: data.walletAddress,
        username: data.username,
        bio: data.bio,
        avatar: data.avatar,
      },
      include: {
        listings: {
          orderBy: { createdAt: "desc" },
        },
        purchases: {
          include: {
            listing: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Error creating/updating user:", error);
    return NextResponse.json(
      { error: "Failed to create/update user" },
      { status: 500 }
    );
  }
}

