import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import NewMeetupForm from '../components/meetups/NewMeetupForm'

const NewMeetup = () => {
    const router = useRouter()
    const addMeetupHandler = async (meetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(meetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await response.json()
        router.push('/')
    }
    return <Fragment>
        <Head>
            <title>Add a Meetup</title>
            <meta name='description' content='add a meetup to network' />
        </Head>
        <NewMeetupForm onAddMeetup = {addMeetupHandler} />
    </Fragment>
}

export default NewMeetup
