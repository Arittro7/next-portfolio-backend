import { Prisma, User } from "@prisma/client";
import AppError from "../../errorHandler/appError"
import { prisma } from "../../config/db";
import bcryptjs from "bcryptjs"
import { Response } from "express";

const loginWithEmailAndPassword = async (res: Response, payload: Partial<User>) => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findUnique({   
    where:{email }
  });

  if (!isUserExist) {
    throw new AppError(401, "Email does not exist");
  }

  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );

  if (!isPasswordMatched) {
    throw new AppError(401, "Incorrect Password");
  }


  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: pass, ...rest } = isUserExist

  return {
    rest,
  };
};

const authWithGoogle = async (data: Prisma.UserCreateInput) => {
    let user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })

    if (!user) {
        user = await prisma.user.create({
            data
        })
    }

    return user;
}


export const AuthServices = {
  loginWithEmailAndPassword,
  authWithGoogle
}