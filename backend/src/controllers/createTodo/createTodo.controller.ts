import { RequestHandler } from 'express';
import { connectToDatabase, dbCollection } from '../../db/dbConnection';
import { Todo } from '../../models/todo';
import { validateIsDone, validateText } from '../validations';
import { TodoRequestBody } from '../interfaces/todo.requestBody.interface';
import { RequestWithDatabase } from '../../middleware/database';

interface RequestWithUserAndDatabase extends RequestWithDatabase {
	userId?: string;
}

const validateRequestBody = (body: TodoRequestBody) => {
	validateText(body.text);

	if (body.isDone !== undefined) {
		validateIsDone(body.isDone);
	}
};

export const createTodo: RequestHandler = async (req, res, next) => {
	try {
		const { db } = await connectToDatabase();
		const typedReq = req as RequestWithUserAndDatabase;

		const { text, isDone } = req.body as TodoRequestBody;

		try {
			validateRequestBody({ text, isDone });
		} catch (error) {
			const message = (error as Error).message;
			return res.status(400).json({ message: message });
		}

		const date = new Date().toISOString();
		const userId = typedReq.userId;
		const newTodo = new Todo(date, text, isDone, userId);

		const result = await db.collection(dbCollection).insertOne(newTodo);
		const responseTodo = {
			_id: result.insertedId,
			date: newTodo.createdAt,
			text: newTodo.text,
			isDone: newTodo.isDone,
		};

		return res.status(201).json(responseTodo);
	} catch (error) {
		console.error('Error in createTodo controller:', error);
		if (error instanceof Error) {
			return res.status(400).json({ message: error.message });
		}
		return res.status(500).json({ message: 'Internal server error' });
	}
};
