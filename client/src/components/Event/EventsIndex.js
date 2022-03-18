import { useState, useEffect } from 'react';
// import { func } from 'prop-types';
import * as eventService from '../../api/event.service';
import { Link } from 'react-router-dom';


const EventsIndex = () => {
    const [communities, setCommunities] = useState([]);
    const [events, setEvents] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getEventsIndex() {
            const communities = await eventService.index();
            setCommunities(communities.data.data);
            console.log("community data: ",communities.data.data)
        }
        getEventsIndex();
    }, [])

    useEffect(() =>{
        async function findPosts() {
            communities.map((community) => {
                if(community.Events.posts){
                    community.Events.posts.map((post) => {
                        setPosts(post)
                    })
                }
            })
        }
        findPosts();
    }, [])
    
    


    return (
        <div>
            {communities.map((community) => {
                return (
                    <>
                    {/* <Link
                    to={community._id}>{community.communityName}
                    </Link> */}
                    <h1>{community.communityName}</h1>
                    <h4>{community.Events.map((event) => {
                        return event.title
                    })
                    }</h4>
                    {posts.map((post) => {
                        return post.content
                    })}
                    </>
                )
            })}
        </div>
    )

}

export default EventsIndex;

