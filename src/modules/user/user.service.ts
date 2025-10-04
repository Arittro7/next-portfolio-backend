import  bcryptjs  from 'bcryptjs';
import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";
import { envVars } from "../../config/env.config";

const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
  let hashedPassword: string | undefined = undefined;

  if (payload.password) {
    hashedPassword = await bcryptjs.hash(
      payload.password,
      Number(envVars.BCRYPT_SALT_ROUND)
    );
  }

  const newUser = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });

  return newUser;
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

// Update User 
const updateUser = async(id: number, payload: Partial<User>) =>{
  const result = await prisma.user.update({
    where:{
      id
    },
    data: payload
  })
  return result
}


export const UserService = {
  createUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser
};
