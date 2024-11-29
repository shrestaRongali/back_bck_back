import { Sequelize, Dialect } from "sequelize";
import { BaseApp } from "@AppLib/app/baseApp";
import { BaseHelper } from "@AppLib/app/helperBaseClass";

/**
 * A helper class for managing database connections and models.
 */
export class DB<T extends { initModel: (sequelize: Sequelize) => any }> extends BaseHelper {
	/**
	 * Creates an instance of the DB helper.
	 * @param {BaseApp} _appObj - The BaseApp instance.
	 */
	constructor(_appObj: BaseApp, private modelModules: T[]) {
		super(_appObj);
	}

	/**
	 * Initializes the DB helper by establishing a Sequelize connection and registering models.
	 */
	async initialize() {
		await this.initializeSequelize();
	}

	/**
	 * Initializes the Sequelize connection and registers models.
	 */
	async initializeSequelize() {
		try {
				const dialect: Dialect = 'postgres';

				try {
					const sequelize = new Sequelize(
						process.env.DB!, process.env.SERVERLESS_DB_USERNAME!, process.env.SERVERLESS_DB_PASSWORD!, {
							host: process.env.SERVERLESS_DB_HOST_URL!, 
							dialect: dialect,
							port: +process.env.SERVERLESS_DB_HOST_PORT!,
							logging: console.log,
							dialectOptions: {
								ssl: {
									require: true,
									rejectUnauthorized: false, 
								},
								connectTimeout: 60000, 
							} 
						});

					this._appObj.dBObject = sequelize;
					await sequelize.authenticate();

					this._registerModels(sequelize);

					console.log('MySQL connection has been established successfully.');
				} catch (error) {
					console.error('Unable to connect to the database:', error);
				}
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Registers models by loading them from files in the specified directory.
	 * @param {Sequelize} sequelize - The Sequelize instance.
	 * @private
	 */
	private _registerModels(sequelize: Sequelize) {
		for (const modelModule of this.modelModules) {
			const { initModel } = modelModule;
			const modelInit = initModel(sequelize);
			const modelName = modelInit.name;
			const schema = 
			this._appObj.models[modelName] = modelInit;
		}
		console.log(`this._appObj.models`, this._appObj.models);
	}
}

