import { Model, Sequelize, BuildOptions, DataTypes } from 'sequelize';

/**
 * Interface representing the attributes of the taskflow model.
 */
export interface taskflowAttributes {
	id?: number;
	title: string;
	description: string;
	status: string;
	created_at: string;
}

/**
 * Represents an instance of the taskFlow model.
 */
export interface taskflowInstance extends Model<taskflowAttributes>, taskflowAttributes { }

/**
 * Represents the Taskflow model with associated static methods.
 */
export type taskflowModel = typeof Model & {
	new(values?: object, options?: BuildOptions): taskflowInstance;
};

/**
 * Initialize and define the taskflow model using Sequelize.
 * @param sequelize - The Sequelize instance to associate with the model.
 * @returns The initialized TaskflowModel.
 */
export function inittaskflowModel(sequelize: Sequelize): taskflowModel {
	return <taskflowModel>sequelize.define<taskflowInstance>('taskflow', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: false,
            defaultValue: "pending"
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	},
	{
        timestamps: false,
        tableName: 'taskflow',
        schema: 'public',
    });
}
