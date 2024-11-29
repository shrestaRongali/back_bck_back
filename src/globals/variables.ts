/**
 * A TypeScript module that provides a configuration loader for app-global variables.
 * @module appGlobalVariablesConfigLoader
 */
import { BaseApp } from "../lib/app/baseApp";

/**
 * Interface for global variables used throughout the application.
 */
export interface GlobalVariablesInterface {
	/**
	 * The version of the API being used by the application.
	*/
	API_VERSION: string;
		
	WEBSITE_URL: string;
	
	APP_PORT: number;

}

/**
 * Function for loading global variables configuration.
 * @param {BaseApp} appObj - The application object used for configuration.
 * @returns {GlobalVariablesInterface} An object containing global variables for the application.
 */
function configLoader(appObj: BaseApp): GlobalVariablesInterface {
	return {
		API_VERSION: 'v1',
		WEBSITE_URL: 'http://localhost:3000/',
		APP_PORT: 3000 ,
	};
}

export { configLoader as appGlobalVariablesConfigLoader };
