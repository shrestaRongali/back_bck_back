import { GlobalService } from '@AppServices/db/globalService';
import { Transaction, QueryTypes } from 'sequelize';


export class CommonService extends GlobalService {

    async getFilteredTasks(status: string, transaction?: Transaction): Promise<any[]> {

		let sqlQuery = `
		SELECT T.id, T.title, T.description,T.status
        FROM taskflow as T
        WHERE T.status = '${status}'`;

		try {
			const queryResult = await this.executeCustomQuery(sqlQuery, {
				replacements: [],
				type: QueryTypes.SELECT, // Specify the query type as SELECT
			}, transaction);
			
			return queryResult;
		} catch (error: any) {
			// Handle validation errors if needed
			throw new Error(`${error.message}`);
		}
	}
}

