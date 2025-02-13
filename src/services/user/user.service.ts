import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUser = async (email: string) => {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
};

export const createUser = async (email: string, password: string) => {
  return await prisma.user.create({
    data: {
      email: email,
      password: password,
    },
  });
};
