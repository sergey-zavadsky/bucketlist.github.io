import { Request, Response, NextFunction } from 'express';
import { Db } from 'mongodb';
import { connectToDatabase } from '../db/dbConnection';

export interface RequestWithDatabase extends Request {
	database?: Db;
}

export const ensureDatabaseConnection = async (
	req: RequestWithDatabase,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { db } = await connectToDatabase();
		req.database = db;
		next();
	} catch (error) {
		console.error('Database connection error in middleware:', error);
		res
			.status(503)
			.json({ message: 'Database connection error. Please try again later.' });
	}
};
