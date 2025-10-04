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

const getAllBlogs = async({
  page = 1,
  limit = 10,
  search,
  isFeatured,
  tags,
  sortBy,
  orderBy,
}: {
  page?: number;
  limit?: number;
  search?: string;
  isFeatured?: boolean;
  tags?: string[];
  sortBy?: string;
  orderBy?: string;
}) =>{
  const skip = (page - 1) * limit;

  console.log({ isFeatured });
  const where: any = {
    AND: [
      search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
        ],
      },
      typeof isFeatured === "boolean" && { isFeatured },
      tags && tags.length > 0 && { tags: { hasEvery: tags } },
    ].filter(Boolean),
  };

  const result = await prisma.blog.findMany({
    skip,
    take: limit,
    where,
    orderBy: sortBy
      ? { [sortBy as string]: orderBy === "desc" ? "desc" : "asc" }
      : undefined,
  });

  const total = await prisma.blog.count({ where });

  return {
    data: result,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getBlogById = async (id: number) => {
  return await prisma.$transaction(async (tx) => {
    await tx.blog.update({
      where: { id },
      data: {
        view: {
          increment: 1,
        },
      },
    });

    return await tx.blog.findUnique({
      where: {id},
      include: {
        author:{
          select: {
            id: true,
            name: true
          }
        }
      },
    });
  });
};

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
