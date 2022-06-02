import MeetupList from '../components/meetups/MeetupList'

const DUMMY_MEETUPS = [
    {
        id: '1',
        title: 'Meetup 1',
        description: 'Sample Meetup',
        image: 'https://www.sample-videos.com/img/Sample-jpg-image-50kb.jpg'
    },
    {
        id: '2',
        title: 'Meetup 2',
        description: 'Sample Second Meetup',
        image: 'https://www.sample-videos.com/img/Sample-jpg-image-50kb.jpg'
    },
    {
        id: '3',
        title: 'Meetup 3',
        description: 'Sample Third Meetup',
        image: 'https://www.sample-videos.com/img/Sample-jpg-image-50kb.jpg'
    }
]
const HomePage = () => {
    return <MeetupList meetups={ DUMMY_MEETUPS } />
}

export default HomePage
