import React, { useEffect, useState } from 'react';
import * as eventService from "../../api/event.service"
import Post from "../Posts/Post"
import * as postService from "../../api/post.service"

export default function EventView() {

    const [event, setEvent] = useState([]);   
    const [post, setPost] = useState([]);
    
    const findPost = async () => {
        console.log("hello")
        await postService.showOne().then((res) => {
            setPost(res.data.data);
            console.log("found posts: ", post)
        });
    }

    useEffect(() => {
        findPost();
    }, []);

    useEffect(() => {
        async function getEvent() {
            const events = await eventService.get();
                setEvent(events);
        }
        getEvent();
    }, [])

    return(
        <>
            <h1>{event.title}</h1>
            <Post post={post}/>
        </>
    )
}
