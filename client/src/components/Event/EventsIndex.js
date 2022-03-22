import { useState, useEffect } from 'react';
// import { func } from 'prop-types';
import * as eventService from '../../api/event.service';
//import { Link } from 'react-router-dom';

import { Link } from 'react-router-dom'


const EventsIndex = (props) => {
    const [communities, setCommunities] = useState([]);
    const [events, setEvents] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getEventsIndex() {
            const communities = await eventService.index();
            setCommunities(communities.data.data);
            console.log("community data: ", communities.data.data)
        }
        getEventsIndex();
    }, [])

    useEffect(() =>{
        async function findPosts() {
            communities.map((community) => {
                if(community.Events.posts){
                    community.Events.posts.map((post) => {
                        return setPosts(post)
                    })
                }
                else return null
            })
        }
        findPosts();
    }, [communities])
    
    const contentStyle = {
        display: (props.active)
    }

    return (
        <div style={contentStyle} className="libraryComponent">
            <h2 className="black">Events</h2>
            <div className="indexComponent">
                {communities?.map((community, index) => {
                    return (
                        <>
                        <li style={{listStyle:"none"}} key={index}>
                        {/* <Link
                        to={community._id}>{community.communityName}
                        </Link> */}
                        
                        <h3>{community.communityName}</h3>
                        <h4>{community?.Events?.map((event, index) => {
                            return (
                                <li style={{listStyle:"none"}} key={index}>
                                <Link to={`/event/${event._id}`} state={{ eventId : event._id }} ><p>{event.title}</p></Link>
                                </li>
                                )
                            })
                        }</h4>
                        {posts.map((post, index) => {
                            return (
                                <li style={{listStyle:"none"}} key={index}>{post.content}</li>
                            )
                        })}
                        </li>
                        </>
                    )
                })}
            </div>
        </div>
    )

}

export default EventsIndex;

