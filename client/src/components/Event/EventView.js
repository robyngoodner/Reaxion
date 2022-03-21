import React, { useEffect, useState } from 'react';
import * as eventService from "../../api/event.service"
import Post from "../Posts/Post"
import * as postService from "../../api/post.service";
import { useLocation } from 'react-router-dom';
import PostCreate from '../Posts/PostCreate';


export default function EventView() {
    const location = useLocation();
    const [event, setEvent] = useState("");   
    const [post, setPost] = useState([]);
    const [posts, setPosts] = useState([]);
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [isEventRecent, setIsEventRecent] = useState(false);
    const [counter, setCounter] = useState(0);
    const [currentTime, setCurrentTime] = useState("")
    const { eventId } = location.state;
    // console.log("line 14: ",eventId)

    const findPost = async () => {
        // console.log("findPost function happening")
        await postService.showOne().then((res) => {
            setPost(res.data.data);
            // console.log("found posts: ", post)
        });
    }
//HAVE TO FIGURE OUT HOW TO PULL EVENT ID FROM EVENTINDEX WHEN YOU CLICK THE LINK
   

    const findEvent = async () => {
        // console.log("eventsViewID before set: ",id)
        setId(eventId);
        // console.log("eventsView ID after set: ",id)
        try {
        const foundEvent = await eventService.get(id);
        setEvent(foundEvent);
        // console.log("foundEvent with posts??: ", foundEvent.data.data.posts)
        // console.log("front end events", event)
        setTitle(event.data.data.title)
        setDescription(event.data.data.description)
        setEventTime(event.data.data.createdAt)
        setCurrentTime(new Date().getTime());
        // console.log(event.data.data)
        setPosts(foundEvent.data.data.posts)
        const checkEventTime = () => {
            //event limit set to 20 minutes
            if (currentTime < (eventTime+1200000)) 
            setIsEventRecent(true)
            else setIsEventRecent(false)
        }
        checkEventTime();
        // console.log("posts: ",posts)
        } catch(err) {
            console.log(err)
        }
    }
    useEffect(() => {
        findPost();
        findEvent();
    },[])

    useEffect(() => {
        if(counter<10){
        const interval = setInterval(() => {
            setCounter(counter + 1)
            findPost();
            findEvent();
        }, 100)
        return () => clearInterval(interval)
        }
    }, [counter])


    return(
        <>
            <div>
                {/* <h1>Event view </h1> */}
                <h1>{title}</h1>
                <h2>{description}</h2>
            </div>
            <div>
                <div>
                {!isEventRecent ? posts.map((post, index) => {
                        return (
                        <li style={{listStyle:"none"}} key={index}>
                            <Post post={post}/>
                            {/* {console.log(post)}  */}
                        </li>
                        )
                    }) : <PostCreate eventId={eventId}/> }
                    {/* <Post post={post}/> */}
                </div>
            </div>
            <div>
                
            </div>
            
        </>
    )
}
