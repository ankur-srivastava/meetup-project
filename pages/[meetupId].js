import { useRouter } from 'next/router'
import MeetupDetail from '../components/meetups/MeetupDetail'

const MeetupDetails = () => {
    const router = useRouter()

    return <MeetupDetail 
                image='https://www.sample-videos.com/img/Sample-jpg-image-50kb.jpg'
                title='First Meetup'
                address='Sec 49, Gurgaon'
                description='Sample Meetup'
            />
}


export function getStaticPaths() {
    return {
        fallback: false,
        paths: [
            {
                params: {
                    meetupId: '1'
                }
            },
            {
                params: {
                    meetupId: '2'
                }
            },
        ]
    }
}

export function getStaticProps(context) {
    const meetupId = context.params.meetupId
    console.log(meetupId)
    // get details
    return {
        props: {
            meetupData: {
                image: 'https://www.sample-videos.com/img/Sample-jpg-image-50kb.jpg',
                id: meetupId,
                title: 'First Meetup',
                description: 'To be held at Ggn',
                address: 'Emerald Hills'
            }
        }
    }
}

export default MeetupDetails
