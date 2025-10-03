import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
  console.log(payload);
  const createUser = await prisma.user.create({
    data: payload,
  });
  return createUser;
};

const getAllUser = async () => {
  const result = await prisma.user.findMany({
    select: {
      name: true,
      email: true,
      role: true,
      phone: true,
      picture: true,
      status: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
      blogs: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const getUserById = async (id: number) => {
  const result = await prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      picture: true,
      status: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
      blogs: true,
    },
    where: {
      id,
    },
  });
  return result;
};

// Delete User
const deleteUser = async(id: number) =>{
  const result = await prisma.user.delete({
    where:{
      id
    }
  })
  return result
}

export const UserService = {
  createUser,
  getAllUser,
  getUserById,
  deleteUser
};
