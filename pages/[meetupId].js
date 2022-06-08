import Head from 'next/head'
import { Fragment } from 'react'
import { MongoClient, ObjectId } from 'mongodb'
import MeetupDetail from '../components/meetups/MeetupDetail'
import { MONGODB_URL } from './index'

const MeetupDetails = (props) => {
    return <Fragment>
        <Head>
            <title>{props.meetupData.title}</title>
            <meta name='description' content={props.meetupData.description} />
        </Head>
        <MeetupDetail 
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
    </Fragment>
}


export async function getStaticPaths() {
    // we need a list of ids

    let allMeetups

    try {
        const client = await MongoClient.connect(MONGODB_URL)
        const db = client.db()

        const meetups = db.collection('meetup')
        allMeetups = await meetups.find({}, {_id: 1}).toArray()
        client.close()
    } catch (e) {
        console.log(e)
    }

    return {
        fallback: 'blocking',
        paths: allMeetups.map((meetup) => {
            return {
                params: {
                    meetupId: meetup._id.toString()
                }
            }
        })
    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId
    console.log(meetupId)
    // get details
    let meetup

    try {
        const client = await MongoClient.connect(MONGODB_URL)
        const db = client.db()

        const meetups = db.collection('meetup')
        meetup = await meetups.findOne({_id: ObjectId(meetupId)})
        client.close()
    } catch (e) {
        console.log(e)
    }

    return {
        props: {
            meetupData: {
                id: meetup._id.toString(),
                title: meetup.title,
                description: meetup.description,
                address: meetup.address,
                image: meetup.image
            }
        }
    }
}

export default MeetupDetails
