import { Prisma} from "@prisma/client";
import AppError from "../../errorHandler/appError"
import { prisma } from "../../config/db";
import bcryptjs from "bcryptjs"
import { envVars } from "../../config/env.config";
import { generateToken } from "../../utils/jwt";

const loginWithEmailAndPassword = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({ where: { email: payload.email } });
  if (!user) {
    throw new AppError(401, "Invalid credentials");
  }

  const isPasswordMatched = await bcryptjs.compare(payload.password, user.password!);
  if (!isPasswordMatched) {
    throw new AppError(401, "Invalid credentials");
  }

  const jwtPayload = { id: user.id, email: user.email, role: user.role };
  const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES);

  return { accessToken };
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