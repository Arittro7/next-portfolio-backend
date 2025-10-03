import { Blog, Prisma } from "@prisma/client"
import { prisma } from "../../config/db"


const createBlog = async(payload: Prisma.BlogCreateInput): Promise<Blog> =>{
  const result = await prisma.blog.create({
    data:payload,
    include:{
      author:{
        select:{
          id:true,
          name:true,
          email:true
        }
      }
    }
  })
  return result
}

const getAllBlogs = async() =>{
  const result = await prisma.blog.findMany({
    select:{
    id:true,
    title: true,
    content:true,
    thumbnail:true,
    tags:true,
    isFeatured:true,
    view:true
    },
    orderBy:{
      createdAt: "desc"
    }
  })
  return result
}


export const BlogService = {
  createBlog,
  getAllBlogs
}
