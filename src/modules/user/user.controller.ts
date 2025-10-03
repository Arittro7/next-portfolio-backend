import { Request, Response } from "express";
import { UserService } from "./user.service";


const createUser = async(req: Request, res:Response) => {
  try {
    const result = await UserService.createUser(req.body)
    console.log(result);
    console.log('Console from user controller');
  } catch (error) {
    console.log(error);
  }
}


export const UserController = {
  createUser
}
