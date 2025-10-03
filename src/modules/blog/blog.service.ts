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

const getBlogById = async (id: number) => {
  const result = await prisma.blog.findUnique({
    where:{
      id
    }
  })
  return result
}

const updateBlog = async(id: number, payload:Partial<Blog>) =>{
  const result = await prisma.blog.update({
    where: {
      id
    },
    data: payload
  })
  return result
}

// delete Blog
const deleteBlog = async(id:number) =>{
  await prisma.blog.delete({
    where:{
      id
    }
  })
  return ("Blog deleted Successfully")
}


export const BlogService = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
}
