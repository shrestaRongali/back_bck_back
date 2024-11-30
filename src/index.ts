import express, { Express, NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import 'module-alias/register';
import path from "path";
import { configDotenv } from "dotenv";
import { BaseApp } from "./lib/app/baseApp";
import { NotFoundError } from "@AppErrors/not-found-error";
import { errorHandler } from "@AppMiddleWares/error-handler";

/**
 * Create an instance of an Express application.
 * @type {Express}
 */
const appObj: Express = express();

// Enable Cross-Origin Resource Sharing (CORS) middleware.
appObj.use(cors({
    origin: '*'
}));

// Parse incoming JSON requests with a size limit of 50MB.
appObj.use(express.json({ limit: "500mb" }));

/**
 * Global variables to store the Express application instance, project folder path, and source directory path.
 * @global
 * @var {BaseApp} EXPRS - The Express application instance.
 * @var {string} projectFolderPath - The absolute path to the project folder.
 * @var {string} rootSourceDirectoryPath - The absolute path to the root source directory.
*/
configDotenv()

declare global {
    var EXPRS: BaseApp;
}

console.log("Environment",process.env.NODE_ENV)

// Create a new instance of the BaseApp class and initialize it.
global.EXPRS = new BaseApp(appObj);
try{
    global.EXPRS.initialize();
}catch(error){
    console.error('Initialization error:', error);
}

// Check if globalVariables are defined in the BaseApp instance.
if (EXPRS.globalVariables) {
    // Define the port to listen on (either from environment variable or from globalVariables).
    const PORT = process.env.PORT || 3000;

    /**
     * Function to start the Express application and listen on the specified port.
     * @async
     */
    const start = async () => {
        appObj.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    };
    start();
}

// Import application routes.
import { AppRoutes } from "@AppRoutes/index";
import { CustomError } from "@AppErrors/custom-error";

try {
    AppRoutes.initializeAppMiddleWares();
    AppRoutes.initializeAppRoutes();
} catch (error) {
    console.error('Initialization error:', error);
}

// Handle all unmatched routes with a NotFoundError.
EXPRS.app.all('*', async (req: Request, res: Response) => {
    throw new NotFoundError();
});

// Use the errorHandler middleware to handle errors.
EXPRS.app.use(errorHandler as unknown as (err: Error | CustomError, req: Request, res: Response, next: NextFunction) => void);
