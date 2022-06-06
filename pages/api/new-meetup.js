import { MongoClient } from 'mongodb'

const MONGODB_URL = 'mongodb+srv://test:2J9D7lIGt1eHHJBM@cluster0.jrdex.mongodb.net/meetups?retryWrites=true&w=majority'

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
