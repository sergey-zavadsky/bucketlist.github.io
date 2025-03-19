import { RequestHandler } from 'express';
import { connectToDatabase, dbCollection } from '../../db/dbConnection';
import { RequestWithDatabase } from '../../middleware/database';

interface RequestWithUserAndDatabase extends RequestWithDatabase {
	userId?: string;
}

export const getTodos: RequestHandler = async (req, res, next) => {
	try {
		const { db } = await connectToDatabase();
		const typedReq = req as RequestWithUserAndDatabase;

		const result = await db
			.collection(dbCollection)
			.find({ userId: typedReq.userId })
			.limit(50)
			.toArray();

		return res.status(200).json(result);
	} catch (error) {
		console.error('Error in getTodos controller:', error);
		if (error instanceof Error) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: 'Internal server error' });
	}
};
