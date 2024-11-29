import { Request, Response, NextFunction } from "express";
import { DefaultController } from "@AppControllers/defaultController";
import { BadRequestError } from "@AppErrors/bad-request-error";
import { CommonService } from "@AppServices/db/commonService";

/**
 * Controller class for handling user sign-up.
 * @extends DefaultController
 */
export class taskflowController extends DefaultController {
    private _commonService: CommonService;
	/**
	 * Creates an instance of SignupController.
	 * @param {Request} request - The Express.js request object.
	 * @param {Response} response - The Express.js response object.
	 * @param {NextFunction} next - The Express.js next function.
	 */
	constructor(request: Request, response: Response, next: NextFunction) {
		super(request, response, next);
        this._commonService = new CommonService();
	}

    async addTask(){
        try{
            const { title, description } = this.getRequestObj().body

            const taskModel = this.getAppObj().models.taskflow
            const task = await this._globalService.insertRecord(taskModel,{title,description}) as any

            console.log(task.dataValues)

            this.setResponseData({
                task: {
                    id: task.dataValues.id,
                    title: task.dataValues.title,
                    description: task.dataValues.description,
                    status: task.dataValues.status
                }
            })
            this.setMessage("Task created successfully.");
            this.setSuccess(true);
            this.sendResponse();
        }catch(e){
            throw e
        }

    }

    async getAllTask(){
        try{
            const taskModel = this.getAppObj().models.taskflow
            const tasks = await this._globalService.findAllRecords(taskModel,{},undefined,[],["created_at"]) as any

            this.setResponseData({
                tasks
            })
            this.setMessage("Tasks fetched successfully.");
            this.setSuccess(true);
            this.sendResponse();
        }catch(e){
            throw e
        }

    }

    async updateTask(){
        try{
            const id = this.getRequestObj().params.id
            if(!id){
                throw new BadRequestError("Id is required")
            }
            const { status } = this.getRequestObj().body
            console.log(id,status)
            let task

            const taskModel = this.getAppObj().models.taskflow
            const updateCount = await this._globalService.updateRecords(taskModel,{status},{id})
            if(updateCount == 0){
                throw new BadRequestError("Task not found")
            }else{
                task = await this._globalService.findOne(taskModel,{id})
            }

            this.setResponseData({
                task: {
                    id: task?.dataValues.id,
                    title: task?.dataValues.title,
                    description: task?.dataValues.description,
                    status: task?.dataValues.status
                }
            })
            this.setMessage("Task updated successfully.");
            this.setSuccess(true);
            this.sendResponse();
        }catch(e){
            throw e
        }

    }

    async deleteTask(){
        try{
            const id = this.getRequestObj().params.id
            if(!id){
                throw new BadRequestError("Id is required")
            }

            const taskModel = this.getAppObj().models.taskflow
            const deleteCount = await this._globalService.deleteRecords(taskModel,{id})
            if(deleteCount["row-deleted"] == 0){
                throw new BadRequestError("Task not found")
            }
               
            this.setMessage("Task deleted successfully.");
            this.setSuccess(true);
            this.sendResponse();
            
        }catch(e){
            throw e
        }

    }

    async getFilteredTasks(){
        try{
            const status = this.getRequestObj().params.status
            if(!status){
                throw new BadRequestError("Status is required")
            }
            if(status!= "pending" && status!= "completed"){
                throw new BadRequestError("Invalid Status")
            }

            const tasks = await this._commonService.getFilteredTasks(status)

            this.setResponseData(tasks)   
            this.setMessage("Tasks fetched successfully.");
            this.setSuccess(true);
            this.sendResponse();
            
        }catch(e){
            throw e
        }

    }
}