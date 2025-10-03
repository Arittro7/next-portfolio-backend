import { Request, Response } from "express";
import { BlogService } from "./blog.service";


const createBlog = async(req: Request, res: Response) =>{
  try {
    const result = await BlogService.createBlog(req.body)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

const getAllBlogs = async (req: Request, res: Response) =>{
  try {
    const result = await BlogService.getAllBlogs()
    res.status(201).json(result)
  } catch (error) {
    res.status(500).send(error)
  }
}

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
