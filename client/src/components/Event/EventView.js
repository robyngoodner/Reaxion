import React, { useEffect, useState } from 'react';
import * as eventService from "../../api/event.service"
import Post from "../Posts/Post"
import * as postService from "../../api/post.service";
import { useLocation } from 'react-router-dom';


export default function EventView() {
    const location = useLocation();
    const [event, setEvent] = useState("");   
    const [post, setPost] = useState([]);
    const [id, setId] = useState("");
   

    const findPost = async () => {
        console.log("hello")
        await postService.showOne().then((res) => {
            setPost(res.data.data);
            console.log("found posts: ", post)
        });
    }
//HAVE TO FIGURE OUT HOW TO PULL EVENT ID FROM EVENTINDEX WHEN YOU CLICK THE LINK
    useEffect(() => {
        findPost();
    }, []);

    const findEvent = async () => {
        setId(location.state);
        const foundEvent = await eventService.get(id);
        setEvent(foundEvent);
        console.log("front end events", event.data.data)
    }

    useEffect(() => {
        findEvent();
    }, [])

    return(
        <>
            <div>
                <h1>Event view </h1>
                <h1>{event.data.data.title}</h1>
                <h2>{event.data.data.description}</h2>
            </div>
            
            <Post post={post}/>
        </>
    )
}
