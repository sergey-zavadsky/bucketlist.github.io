import { RequestHandler } from 'express';
import { connectToDatabase, dbCollection } from '../../db/dbConnection';
import { ObjectId } from 'mongodb';
import { RequestWithDatabase } from '../../middleware/database';

interface RequestWithUserAndDatabase extends RequestWithDatabase {
	userId?: string;
}

interface TodoParams {
	ids: string;
}

const validateParams = (params: TodoParams) => {
	if (!params.ids) {
		throw new Error('IDs are required');
	}
};

export const deleteTodoMany: RequestHandler = async (req, res, next) => {
	try {
		const { db } = await connectToDatabase();
		const typedReq = req as RequestWithUserAndDatabase;

		const { ids } = req.params as unknown as TodoParams;
		validateParams({ ids });

		const objectIds = ids.split(',').map((id) => new ObjectId(id));
		const query = { _id: { $in: objectIds }, userId: typedReq.userId };

		await db.collection(dbCollection).deleteMany(query);

		return res.status(200).json({ message: 'Todos have been deleted', ids });
	} catch (error) {
		console.error('Error in deleteTodoMany controller:', error);
		if (error instanceof Error) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: 'Internal server error' });
	}
};
