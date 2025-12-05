import { prisma } from "@/lib/prisma";

/**
 * Get or create a user by wallet address
 */
export async function getOrCreateUser(walletAddress: string) {
  let user = await prisma.user.findUnique({
    where: { walletAddress },
  });

  if (!user) {
    user = await prisma.user.create({
      data: { walletAddress },
    });
  }

  return user;
}

