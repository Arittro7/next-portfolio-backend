import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { ProjectService } from "./project.service";
import { sendResponse } from "../../utils/sendResponse";

// Create
const createProject = async (req: Request, res: Response) => {
  try {
    const result = await ProjectService.createProject(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Project Create Successful",
      data: result,
    });
  } catch (error: any) {
    res.status(500).send(error);
  }
};

// Get All
const getAllProjects = async (req: Request, res: Response) => {
  try {
    const result = await ProjectService.getAllProjects();

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "All Project Retrieve Successful",
      data: result,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get Single
const getProjectById = async (req: Request, res: Response) => {
  try {
    const result = await ProjectService.getProjectById(Number(req.params.id));

     sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Project Retrieve Successful",
      data: result,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update
const updateProject = async (req: Request, res: Response) => {
  try {
    const result = await ProjectService.updateProject(Number(req.params.id), req.body);

     sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Project Update Successful",
      data: result,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete
const deleteProject = async (req: Request, res: Response) => {
  try {
    const result = await ProjectService.deleteProject(Number(req.params.id));

     sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Project Deleted Successful",
      data: result,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const ProjectController = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
