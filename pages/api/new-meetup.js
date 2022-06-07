import { MongoClient } from 'mongodb'
import { MONGODB_URL } from '../index'

// POST API route - /api/new-meetup
const handler = async (req, res) => {
    const data = req.body

    try {
        const client = await MongoClient.connect(MONGODB_URL)
        const db = client.db()

        const meetups = db.collection('meetup')
        await meetups.insertOne(data)
        client.close()
    } catch (e) {
        console.log(e)
    }
    res.status(201).json({
        message: 'Meetup Added'
    })
}

export default handler
