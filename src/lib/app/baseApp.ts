import { Express } from "express";
import { Sequelize } from "sequelize";
import { DB } from "../app/helpers/db";
import { appGlobalVariablesConfigLoader, GlobalVariablesInterface } from "@AppGlobals/variables";
import { inittaskflowModel } from "@AppModels/app/taskflow";
import { initUserModel } from "@AppModels/app/users";

// Define your model modules
const modelModules = [
	{ initModel: inittaskflowModel },
	{ initModel: initUserModel },
];
/**
 * A collection of helper classes and objects for the application.
 */
export interface Helpers {
	DB_CLASS_OBJ: DB<any>;
}

/**
 * The base application class.
 */
export class BaseApp {
	/**
	 * The Express application instance.
	 */
	public app: Express;

	/**
	 * The current NODE_ENV (e.g., 'local', 'staging', or undefined for production).
	 */
	public NODE_ENV: string | undefined;

	/**
	 * Helper classes and objects for the application.
	 */
	public helpers: Helpers | undefined;

	/**
	 * Models for the application.
	 */
	public models: any;

	/**
	 * Global variables for the application.
	 */
	public globalVariables: GlobalVariablesInterface;

	/**
	 * Sequelize database object.
	 */
	public dBObject: Sequelize | undefined;

	/**
	 * Constructs a new BaseApp instance.
	 * @param {Express} appObj - The Express application instance.
	 */
	constructor(appObj: Express) {
		this.app = appObj;
		this.models = {};

		// Set NODE_ENV variable.
		this.NODE_ENV = process.env.NODE_ENV;
		this.globalVariables = appGlobalVariablesConfigLoader(this);
	}

	/**
	 * Initializes the base application by loading helper classes.
	 */
	async initialize() {
		await this.loadAppHelperClasses();
	}

	/**
	 * Load all helper classes and create their objects and put them in the helpers property.
	 */
	async loadAppHelperClasses() {
		this.helpers = {} as Helpers;

		// Load DB helper.
		this.helpers.DB_CLASS_OBJ = new DB(this, modelModules);
		await this.helpers.DB_CLASS_OBJ.initialize().catch((error) => {
			throw error;
		});

	}
}
