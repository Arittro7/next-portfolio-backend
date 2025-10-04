import { Request, Response } from "express";
import { BlogService } from "./blog.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";


const createBlog = async(req: Request, res: Response) =>{
  try {
    const result = await BlogService.createBlog(req.body)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  try {
    //` query getting zone
    const page = Number(req.query.page) || 1 
    const limit = Number(req.query.limit) || 10
    const search = (req.query.search as string) || ""
    const isFeatured  = req.query.isFeatured ? req.query.isFeatured === 'true' : undefined
    const tags = req.query.tags ? (req.query.tags as string).split(",") : []
    const sortBy = (req.query.sortBy as string) || "createdAt"
    const orderBy = (req.query.orderBy as string) || "desc"
    
    //` query passing area
    const result = await BlogService.getAllBlogs({page, limit, search, isFeatured, tags, sortBy, orderBy});
    
    sendResponse(res, {
    statusCode : 201,
    success : true,
    message : "All Blog retrieve Successful",
    data: result
  })

  } catch (error) {
    res.status(500).send(error);
  }
})

const getBlogById = async(req:Request, res:Response)=>{
  try {
    const result = await BlogService.getBlogById(Number(req.params.id))
    res.status(201).json(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

// update blog
const updateBlog = async(req: Request, res: Response) =>{
  try {
    const result = await BlogService.updateBlog(Number(req.params.id), req.body)
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

// delete blog
const deleteBlog = async(req: Request, res: Response) =>{
  try {
    const result = await BlogService.deleteBlog(Number(req.params.id))
    res.status(201).json(result)
  } catch (error) {
    res.status(500).send(error);
  }
}


export const BlogController = {
  createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog
}
