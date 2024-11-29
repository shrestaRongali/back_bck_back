import express, { Request, Response, NextFunction } from "express";
import * as taskflowValidation from "../validations/taskflowValidation";
import validate from "../modules/validate/validate.middleware";
import { taskflowController } from "@AppControllers/taskFlowController";

const router = express.Router();

// post a task
router.post(
	"/tasks",
	validate(taskflowValidation.addTask),
	addTask
);

async function addTask(req: Request, res: Response, next: NextFunction): Promise<void> {
	const taskFlowController = new taskflowController(req, res, next);
	await taskFlowController.addTask();
}

// get all tasks
router.get(
	"/tasks",
	getAllTask
);

async function getAllTask(req: Request, res: Response, next: NextFunction): Promise<void> {
	const taskFlowController = new taskflowController(req, res, next);
	await taskFlowController.getAllTask();
}

// update a task
router.put(
	"/tasks/:id",
    validate(taskflowValidation.updateTask),
	updateTask
);

async function updateTask(req: Request, res: Response, next: NextFunction): Promise<void> {
	const taskFlowController = new taskflowController(req, res, next);
	await taskFlowController.updateTask();
}

// delete a task
router.delete(
	"/tasks/:id",
	deleteTask
);

async function deleteTask(req: Request, res: Response, next: NextFunction): Promise<void> {
	const taskFlowController = new taskflowController(req, res, next);
	await taskFlowController.deleteTask();
}

// get tasks by filter
router.get(
	"/tasks/status/:status",
	getFilteredTasks
);

async function getFilteredTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
	const taskFlowController = new taskflowController(req, res, next);
	await taskFlowController.getFilteredTasks();
}

export { router as taskflowRouter };
