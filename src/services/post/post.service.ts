import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllPosts = async ({ search }: { search?: string }) => {
  return await prisma.post.findMany({
    where: {
      OR: [{ title: { contains: search } }, { content: { contains: search } }],
    },
  });
};

export const getPost = async (id: number) => {
  return await prisma.post.findUnique({
    where: {
      id,
    },
  });
};

export const updatePost = async (
  id: number,
  data: { title?: string; content?: string }
) => {
  return await prisma.post.update({
    where: {
      id: id,
    },
    data: { ...data },
  });
};

export const createPost = async (data: {
  title: string;
  content: string;
  userId: string;
}) => {
  return await prisma.post.create({
    data: { ...data, userId: Number(data.userId) },
  });
};

export const deletePost = async (id: number) => {
  return await prisma.post.delete({
    where: {
      id,
    },
  });
};
