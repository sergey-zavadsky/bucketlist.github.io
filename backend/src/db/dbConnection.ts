import { MongoClient, Db } from 'mongodb';
import '../loadEnvironment';

const connectionString = process.env.MONGODB_URI;
const dbCollection = process.env.DB_COLLECTION || '';
const dbName = process.env.DB_NAME || '';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

async function connectToDatabase() {
	if (cachedClient && cachedDb) {
		return { client: cachedClient, db: cachedDb };
	}

	if (!connectionString) {
		throw new Error('MONGODB_URI environment variable is not set');
	}

	const options = {
		maxPoolSize: 10,
		serverSelectionTimeoutMS: 10000,
		socketTimeoutMS: 45000,
		connectTimeoutMS: 10000,
		keepAlive: true,
		keepAliveInitialDelay: 300000,
	};

	try {
		const client = new MongoClient(connectionString, options);
		await client.connect();

		const db = client.db(dbName);

		cachedClient = client;
		cachedDb = db;

		console.log('Connected to MongoDB');
		return { client, db };
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		throw error;
	}
}

let db: Db;
(async () => {
	try {
		const { db: database } = await connectToDatabase();
		db = database;
	} catch (error) {
		console.error('Initial MongoDB connection failed:', error);
	}
})();

export { db, dbCollection, connectToDatabase };
