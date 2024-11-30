import { Request, Response, NextFunction } from "express";
import { DefaultController } from "@AppControllers/defaultController";
import { BadRequestError } from "@AppErrors/bad-request-error";
import { CommonService } from "@AppServices/db/commonService";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
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

    async register(){
        try{
            const { name, email, password } = this.getRequestObj().body
            const saltRounds = 10;


            let hashedPassword= await bcrypt.hash(password,saltRounds)

            console.log(name, email, password, hashedPassword)
            const userModel = this.getAppObj().models.user
            const user = await this._globalService.insertRecord(userModel,{name,email,password: hashedPassword}) as any

            this.setResponseData({
                user: {
                    id: user.dataValues.id,
                    name: user.dataValues.name,
                    email: user.dataValues.email,
                    password: user.dataValues.password
                }
            })
            this.setMessage("User created successfully.");
            this.setSuccess(true);
            this.sendResponse();
        }catch(e){
            throw e
        }

    }

    async login(){
        try{
            const { username, password } = this.getRequestObj().body
            const userModel = this.getAppObj().models.user

            let user = await this._globalService.findOne(userModel,{email:username}) as any

            if(!user){
                throw new BadRequestError("Invalid username")
            }

            let pass = await bcrypt.compare(password,user?.dataValues.password)

            if(!pass){
                throw new BadRequestError("Incorrect Password")
            }

            let token = jwt.sign({id: user.dataValues.id, name: user.dataValues.name, email: user.dataValues.email},"jgdgtfrtkdjahmnhoj")

            console.log("token",token)

            this.setResponseData({
                token
            })
            this.setMessage("User created successfully.");
            this.setSuccess(true);
            this.sendResponse();
        }catch(e){
            throw e
        }

    }

    async addTask(){
        try{
            const { title, description } = this.getRequestObj().body

            const user = this.getRequestObj().body.user

            const taskModel = this.getAppObj().models.taskflow
            const task = await this._globalService.insertRecord(taskModel,{title,description,user_id: user.id}) as any

            this.setResponseData({
                task: {
                    id: task.dataValues.id,
                    title: task.dataValues.title,
                    description: task.dataValues.description,
                    status: task.dataValues.status,
                    createdBy: user.name
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
            const status = this.getRequestObj().query.status
            let user = this.getRequestObj().body.user

            let conditions: any = {
                user_id: user.id.toString()
            }

            if(status){
                conditions["status"] = status
            }

            const tasks = await this._globalService.findAllRecords(taskModel,conditions,undefined,[],["created_at"]) as any

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
            let user = this.getRequestObj().body.user
            if(!id){
                throw new BadRequestError("Id is required")
            }
            const { status } = this.getRequestObj().body
            console.log(id,status)
            let task

            const taskModel = this.getAppObj().models.taskflow
            const updateCount = await this._globalService.updateRecords(taskModel,{status},{id, user_id: user.id})
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
            let user = this.getRequestObj().body.user

            const taskModel = this.getAppObj().models.taskflow
            const deleteCount = await this._globalService.deleteRecords(taskModel,{id, user_id: user.id})
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