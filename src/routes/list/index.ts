
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
		const list = await redisClient.GET(LIST_ITEMS_SET_NAME, redisCallback)
		return { body: { list: JSON.parse(list) } }
	}
	catch (err) { return errRet }
};

export const POST = async ({ request }: any) => {
	const list = await request.json()
	try {
		const redisClient = await connectToDatabase()
		const resp = await redisClient.SET(LIST_ITEMS_SET_NAME, JSON.stringify(list), redisCallback)
		return { body: { list: resp } }
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
