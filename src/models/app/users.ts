import { Model, Sequelize, BuildOptions, DataTypes } from 'sequelize';

/**
 * Interface representing the attributes of the taskflow model.
 */
export interface UserAttributes {
	id?: number;
	name: string;
	email: string;
	password: string;
	created_at: string;
}

/**
 * Represents an instance of the taskFlow model.
 */
export interface UserInstance extends Model<UserAttributes>, UserAttributes { }

/**
 * Represents the Taskflow model with associated static methods.
 */
export type UserModel = typeof Model & {
	new(values?: object, options?: BuildOptions): UserInstance;
};

/**
 * Initialize and define the taskflow model using Sequelize.
 * @param sequelize - The Sequelize instance to associate with the model.
 * @returns The initialized TaskflowModel.
 */
export function initUserModel(sequelize: Sequelize): UserModel {
	return <UserModel>sequelize.define<UserInstance>('user', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
	},
	{
        timestamps: false,
        tableName: 'user',
        schema: 'public',
    });
}
