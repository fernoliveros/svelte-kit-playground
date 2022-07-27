
import { connectToDatabase } from '$lib/db';
const LIST_ITEMS_SET_NAME = 'svernList'

const errRet = {
	status: 500,
	body: {
		error: 'Every error possible'
	}
}

const redisCallback = (err: any, _: any) => { if (err) throw err }

export const GET = async () => {
	try {
		const redisClient = await connectToDatabase()
		let listExists = await redisClient.exists(LIST_ITEMS_SET_NAME, (err: any, _: any) => {
			if (err) throw err
		})
		if (listExists) {
			const resp = await redisClient.LRANGE(LIST_ITEMS_SET_NAME, 0, -1, redisCallback)
			const todos = []
			for (let e of resp) {
				todos.push(JSON.parse(e))
			}
			return { body: { todos } }
		}
		return { body: { todos: [] } }
	}
	catch (err) { return errRet }
};

export const POST = async ({ request }: any) => {
	const { newItem } = await request.json()
	const item = {
		id: crypto.randomUUID(),
		label: newItem,
		completed: false
	}
	try {
		const redisClient = await connectToDatabase()
		const resp = await redisClient.RPUSH(LIST_ITEMS_SET_NAME, JSON.stringify(item), redisCallback)
		return { body: { item: resp } }
	}
	catch (err) { return errRet }
};

export const PATCH = async ({ request }: any) => {
	const { item, index } = await request.json()
	try {
		const redisClient = await connectToDatabase()
		const resp = await redisClient.LSET(LIST_ITEMS_SET_NAME, index, JSON.stringify(item), redisCallback)
		return { body: { item: resp } }
	}
	catch (err) { return errRet }
};

export const DELETE = async ({ request }: any) => {
	const { item } = await request.json()
	try {
		const redisClient = await connectToDatabase()
		const resp = await redisClient.LREM(LIST_ITEMS_SET_NAME, 0, JSON.stringify(item), redisCallback)
		return { body: { item: resp } }
	}
	catch (err) { return errRet }
};