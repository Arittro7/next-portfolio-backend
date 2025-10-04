import { Request, Response } from "express";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";

const loginWithEmailAndPassword = catchAsync(async (req:Request, res: Response) => {
  const result = await AuthServices.loginWithEmailAndPassword(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User login successful",
    data: result,
  });
});


const authWithGoogle = catchAsync(async(req:Request, res:Response) => {
  const result = await AuthServices.authWithGoogle(req.body)

  sendResponse(res, {
    statusCode : 201,
    success : true,
    message : "User login through Google",
    data: result
  })
})

export const AuthControllers = {
  loginWithEmailAndPassword,
  authWithGoogle
}