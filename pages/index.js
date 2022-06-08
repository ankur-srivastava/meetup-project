import { Fragment } from 'react'
import Head from 'next/head'
import { MongoClient } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList'

export const MONGODB_URL = 'mongodb+srv://test:BMUMVXQJxd9aiB5I@cluster0.jrdex.mongodb.net/meetups?retryWrites=true&w=majority'


const HomePage = (props) => {
    return <Fragment>
        <Head>
            <title>Home Page</title>
            <meta name='description' content='Meetup List' />
        </Head>
        <MeetupList meetups={ props.meetups } />
    </Fragment>
}

// Runs on server side
// export const getServerSideProps = (context) => {
//     const req = context.req
//     const res = context.res

//     // fetch data
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

// Runs during build process
export const getStaticProps = async () => {
    // fetch data from filesystem, db, api
    let allMeetups

    try {
        const client = await MongoClient.connect(MONGODB_URL)
        const db = client.db()

        const meetups = db.collection('meetup')
        allMeetups = await meetups.find().toArray()
        client.close()
    } catch (e) {
        console.log(e)
    }

    // this will run first
    return {
        props: {
            meetups: allMeetups.map((meetup) => {
                return {
                    title: meetup.title,
                    address: meetup.address,
                    description: meetup.description,
                    image: meetup.image,
                    id: meetup._id.toString()
                }
            })
        }
    }
}

export default HomePage
