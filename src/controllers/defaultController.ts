import { BaseApp } from "../lib/app/baseApp";
import { Request, Response, NextFunction } from "express";
import { GlobalService } from "@AppServices/db/globalService";

type ResponseObj = {
	success: boolean;
	message: string;
	data: any;
};

/**
 * Represents a base controller class for handling HTTP requests and responses in an Express.js application.
 */
export class DefaultController {
	private _request: any;
	private _response: Response;
	private _nextFunction: NextFunction;
	private _statusCode: number = 200;
	private _data: any[] = [];
	private _message: string = '';
	private _success: boolean = true;
	private _appObj: BaseApp;

	protected _globalService: GlobalService;

	/**
	 * Creates an instance of DefaultController.
	 * @param {Request} request - The Express.js request object.
	 * @param {Response} response - The Express.js response object.
	 * @param {NextFunction} next - The Express.js next function.
	 */
	constructor(request: Request, response: Response, next: NextFunction) {
		this._request = request;
		this._response = response;
		this._nextFunction = next;
		this._appObj = EXPRS;
		this._globalService = new GlobalService();
	}

	/**
	 * Get the application object associated with this controller.
	 * @returns {BaseApp} The application object.
	 */
	getAppObj(): BaseApp {
		return this._appObj;
	}

	/**
	 * Get the response object associated with this controller.
	 * @returns {Response} The Express.js response object.
	 */
	getResponseObj(): Response {
		return this._response;
	}

	/**
	 * Get the request object associated with this controller.
	 * @returns {Request} The Express.js request object.
	 */
	getRequestObj(): Request {
		return this._request;
	}

	/**
	 * Get the next function associated with this controller.
	 * @returns {NextFunction} The Express.js next function.
	 */
	getNextFunction(): NextFunction {
		return this._nextFunction;
	}

	/**
	 * Set the HTTP status code to be sent in the response.
	 * @param {number} statusCode - The HTTP status code.
	 */
	setStatusCode(statusCode: number): void {
		this._statusCode = statusCode;
	}

	/**
	 * Send the response to the client with the configured status code and data.
	 */
	async sendResponse(): Promise<void> {
		const response = await this.sendJsonResponse();
		this._response.status(this._statusCode).send(response);
	}

	/**
	 * Assemble and return a JSON response object.
	 * @returns {ResponseObj} A response object containing success status, a message, and data.
	 */
	async sendJsonResponse(): Promise<ResponseObj> {
		const resObj: ResponseObj = {
			success: this._success,
			message: this._message,
			data: this._data || []
		};
		return resObj;
	}

	/**
	 * Set the success status of the response.
	 * @param {boolean} isSuccess - A boolean indicating the success of the response.
	 */
	setSuccess(isSuccess: boolean): void {
		this._success = isSuccess;
	}

	/**
	 * Set the message to be included in the response.
	 * @param {string} message - A string message.
	 */
	setMessage(message: string): void {
		this._message = message;
	}

	/**
	 * Set the response data to be included in the response.
	 * @param {any} data - The response data, which can be of any type.
	 */
	setResponseData(data: any): void {
		this._data = data;
	}
}
