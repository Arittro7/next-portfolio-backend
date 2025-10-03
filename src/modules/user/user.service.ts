import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";

const createUser = async (payload: Prisma.UserCreateInput):Promise<User> => {
  console.log(payload);
  const createUser = await prisma.user.create({
    data:payload
  })
  return createUser
}


export const UserService = {
  createUser
}
