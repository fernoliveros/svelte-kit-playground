
import { connectToDatabase } from '$lib/db';
const LIST_ITEMS_SET_NAME = 'svernList'

const errRet = {
	status: 500,
	body: {
		error: 'Every error possible'
	}
}

export const GET = async () => {
	console.log('GET START!')
	try {
		const redisClient = await connectToDatabase()
		let listExists = await redisClient.exists(LIST_ITEMS_SET_NAME, (err: any, _: any) => {
			if (err) throw err
		})
		if (listExists) {
			const resp = await redisClient.LRANGE(LIST_ITEMS_SET_NAME, 0, -1, (err: any, _: any) => {
				if (err) throw err
			})
			const todos = []
			for (let e of resp) {
				todos.push(JSON.parse(e))
			}
			console.log('WHAT IS THIS M8', todos)
			return { body: { todos } }
		}
		return { body: { todos: [] } }
	}
	catch (err) {
		console.error('ERROR...!', err)
		return errRet
	}
};

export const POST = async ({ request }: any) => {
	console.log(`\n =============== POST ====================\n`)
	const { newItem } = await request.json()
	const item = {
		id: crypto.randomUUID(),
		label: newItem,
		completed: false
	}
	try {
		const redisClient = await connectToDatabase()
		console.log(`PUSH PUSH PUSH`, redisClient.RPUSH)
		const resp = await redisClient.RPUSH(LIST_ITEMS_SET_NAME, JSON.stringify(item), (err: any, _: any) => {
			console.error('what the hoo ha?')
			if (err) throw err
		})
		console.log(`EH??\n`)
		return { body: { item: resp } }
	}
	catch (err) {
		console.error('ERROR...!', err)
		return errRet
	}
};

// export const PATCH = async ({ request }: any) => {
// 	const { itemId, patchObj } = await request.json()
// 	try {
// 		const dbConnection = await connectToDatabase()
// 		const db = dbConnection.db
// 		const collection = db.collection('todos')


// 		const resp = await collection.updateOne(
// 			{ _id: new ObjectId(itemId) },
// 			{ $set: { ...patchObj } }
// 		)
// 		return { body: { resp } }
// 	}
// 	catch (err) {
// 		return {
// 			status: 500,
// 			body: {
// 				error: 'Every error possible'
// 			}
// 		}
// 	}
// };

// export const DELETE = async ({ request }: any) => {
// 	const { itemId } = await request.json()
// 	try {
// 		const dbConnection = await connectToDatabase()
// 		const db = dbConnection.db
// 		const collection = db.collection('todos')
// 		const resp = await collection.deleteOne(
// 			{ _id: new ObjectId(itemId) },
// 		)
// 		return { body: { resp } }
// 	}
// 	catch (err) {
// 		return {
// 			status: 500,
// 			body: {
// 				error: 'Every error possible'
// 			}
// 		}
// 	}
// };