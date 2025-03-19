import { RequestHandler } from 'express';
import { connectToDatabase, dbCollection } from '../../db/dbConnection';
import { ObjectId } from 'mongodb';
import { TodoParams } from '../interfaces/todo.requestParams.interface';
import { RequestWithDatabase } from '../../middleware/database';

interface RequestWithUserAndDatabase extends RequestWithDatabase {
	userId?: string;
}

const validateParams = (params: TodoParams) => {
	if (!params.id) {
		throw new Error('ID is required');
	}
};

export const deleteTodo: RequestHandler = async (req, res, next) => {
	try {
		const { db } = await connectToDatabase();
		const typedReq = req as RequestWithUserAndDatabase;

		const { id } = req.params as unknown as TodoParams;
		validateParams({ id });

		const objectId = new ObjectId(id);
		const query = { _id: objectId, userId: typedReq.userId };
		const item = db.collection(dbCollection);
		const findItem = await item?.findOne(query);

		if (!findItem) {
			return res.status(404).json({ message: 'Todo not found' });
		}

		await item?.deleteOne(query);

		return res.status(200).json({ id: id, text: findItem.text });
	} catch (error) {
		console.error('Error in deleteTodo controller:', error);
		if (error instanceof Error) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: 'Internal server error' });
	}
};
