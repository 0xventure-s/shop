"use server"

import { prisma } from "@/lib/prisma";

export const deleteUsers = async ( userId: string) => {
  try {
    const userAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    if (userAddress) {
      const deleteUsers = await prisma.userAddress.delete({
        where: { userId },
      });

      return deleteUsers;
    }
  } catch (error) {
    console.log(error);
  }
};
