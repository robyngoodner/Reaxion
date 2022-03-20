import React, { useEffect, useState } from 'react';
import * as postService from '../../api/post.service';
import * as authService from '../../api/auth.service';
import * as eventService from '../../api/event.service';

export default function PostCreate ({ eventId }) {
    const [content, setContent] = useState("");
    const [User_Comment, setUser_Comment] = useState("");
    const [event, setEvent] = useState("");
    const [eventsId, setEventsId] = useState("");
    console.log("eventId: ", eventId)

    const handleSubmit = async () => {
        setEventsId(eventId)
        let newPost = { content, User_Comment, event, eventId};
        let res = await postService.create(newPost)
            .then(() => {
                setContent([]);
                setUser_Comment("");
                setEvent("");
                setEventsId("")
                console.log(newPost)
            });
        
         if ( !res === 201 ) {
             alert(`Post error. Please submit again. ${res.status}`) 
         }    
    }
    const findEvent = async () => {
        await eventService.get(eventId).then((res) => {
            setEvent(res.data.data);
            console.log("found event: ", event)
        })
    }

    // useEffect(() => {
    //     findEvent();
    // }, []);

    const userFind = async () => {
        let res = await authService.currentUser();
        console.log(res)
    }

    return (
        <div>
            <h1>Leave your Reaction</h1>
            <form>
                <div>
                    Reaction:
                    <label htmlFor="happyEmoji">
                        <input 
                            onChange={(e) => setContent(e.target.value)}
                            type="radio"
                            id="happyEmoji"
                            name="content"
                            value="Happy"
                        />
                        <img src="/images/Happy.png" alt="Happy"/>
                    </label>
                    <label htmlFor="sadEmoji">
                        <input 
                            onChange={(e) => setContent(e.target.value)}
                            type="radio"
                            id="sadEmoji"
                            name="content"
                            value="Sad"
                        />
                        <img src="/images/Sad.png" alt="Sad"/>
                    </label>
                    <label htmlFor="contentEmoji">
                        <input 
                            onChange={(e) => setContent(e.target.value)}
                            type="radio"
                            id="contentEmoji"
                            name="content"
                            value="Content"
                        />
                         <img src="/images/Content.png" alt="Content"/>
                    </label>
                    <label htmlFor="angryEmoji">
                        <input 
                            onChange={(e) => setContent(e.target.value)}
                            type="radio"
                            id="angryEmoji"
                            name="content"
                            value="Angry"
                        />
                        <img src="/images/Angry.png" alt="Angry"/>
                    </label>
                    <label htmlFor="excitedEmoji">
                        <input 
                            onChange={(e) => setContent(e.target.value)}
                            type="radio"
                            id="excitedEmoji"
                            name="content"
                            value="Excited"
                        />
                        <img src="/images/Excited.png" alt="Excited"/>
                    </label>
                    <label htmlFor="disinterestedEmoji">
                        <input 
                            onChange={(e) => setContent(e.target.value)}
                            type="radio"
                            id="disinterestedEmoji"
                            name="content"
                            value="Disinterested"
                        />
                        <img src="/images/Disinterested.png" alt="Disinterested"/>
                    </label>
                </div>
                <label>
                    If you would like, please leave an additional comment about your experience (optional):
                    <textarea 
                        onChange={(e) => setUser_Comment(e.target.value)}
                        value={User_Comment}
                        type="text"
                        name="User Comment"
                        placeholder="Additional comment"
                    />
                </label>
               <input 
                    type="hidden"
                    name="Event"
                    value={eventId}
                />

            </form>
            <button onClick={handleSubmit}>Submit Reaction</button>
        </div>
    )
}