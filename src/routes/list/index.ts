
import { connectToDatabase } from '$lib/db';
import { ObjectId } from 'mongodb';

export const GET = async () => {
	try {
		const dbConnection = await connectToDatabase()
		const db = dbConnection.db
		const collection = db.collection('todos')
		const todos = await collection.find().sort({ _id: -1 }).toArray();

		return {
			status: 200,
			body: { todos }
		}
	}
	catch (err) {
		return {
			status: 500,
			body: {
				error: 'Every error possible'
			}
		}
	}
};

export const POST = async ({ request }: any) => {
	const { newItem } = await request.json()
	try {
		const dbConnection = await connectToDatabase()
		const db = dbConnection.db
		const collection = db.collection('todos')

		const item = {
			label: newItem,
			completed: false
		}
		await collection.insertOne(item)

		return { body: { item } }
	}
	catch (err) {
		return {
			status: 500,
			body: {
				error: 'Every error possible'
			}
		}
	}
};

export const PATCH = async ({ request }: any) => {
	const { itemId, patchObj } = await request.json()
	try {
		const dbConnection = await connectToDatabase()
		const db = dbConnection.db
		const collection = db.collection('todos')


		const resp = await collection.updateOne(
			{ _id: new ObjectId(itemId) },
			{ $set: { ...patchObj } }
		)
		return { body: { resp } }
	}
	catch (err) {
		return {
			status: 500,
			body: {
				error: 'Every error possible'
			}
		}
	}
};

export const DELETE = async ({ request }: any) => {
	const { itemId } = await request.json()
	try {
		const dbConnection = await connectToDatabase()
		const db = dbConnection.db
		const collection = db.collection('todos')
		const resp = await collection.deleteOne(
			{ _id: new ObjectId(itemId) },
		)
		return { body: { resp } }
	}
	catch (err) {
		return {
			status: 500,
			body: {
				error: 'Every error possible'
			}
		}
	}
};