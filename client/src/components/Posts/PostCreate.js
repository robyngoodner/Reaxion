import React, { useEffect, useState } from 'react';
import * as postService from '../../api/post.service';
import * as authService from '../../api/auth.service';
import * as eventService from '../../api/event.service';
import {Link} from "react-router-dom"

export default function PostCreate ({ eventId }) {
    const [content, setContent] = useState("");
    const [User_Comment, setUser_Comment] = useState("");
    const [event, setEvent] = useState("");
    const [eventsId, setEventsId] = useState("");
    // console.log("eventId: ", eventId)

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
        <div className="libraryComponent">
            <h2>Leave your Reaction</h2>
            <form className="formSpacing">
                <div>
                    <p>Reaction:</p>
                    <label className="formInput" htmlFor="happyEmoji"></label>
                        <input 
                            onChange={(e) => setContent(e.target.value)}
                            type="radio"
                            id="happyEmoji"
                            name="content"
                            value="/images/Happy.png"
                        />
                        <img className="reaction" src="/images/Happy.png" alt="Happy"/>
                
                    <label className="formInput" htmlFor="sadEmoji">
                        <input 
                            onChange={(e) => setContent(e.target.value)}
                            type="radio"
                            id="sadEmoji"
                            name="content"
                            value="/images/Sad.png"
                        />
                        <img className="reaction" src="/images/Sad.png" alt="Sad"/>
                    </label>
                    <label className="formInput" htmlFor="contentEmoji">
                        <input 
                            onChange={(e) => setContent(e.target.value)}
                            type="radio"
                            id="contentEmoji"
                            name="content"
                            value="/images/Content.png"
                        />
                         <img className="reaction" src="/images/Content.png" alt="Content"/>
                    </label>
                    <label className="formInput" htmlFor="angryEmoji">
                        <input 
                            onChange={(e) => setContent(e.target.value)}
                            type="radio"
                            id="angryEmoji"
                            name="content"
                            value="/images/Angry.png"
                        />
                        <img className="reaction" src="/images/Angry.png" alt="Angry"/>
                    </label>
                    <label  className="formInput" htmlFor="excitedEmoji">
                        <input 
                            onChange={(e) => setContent(e.target.value)}
                            type="radio"
                            id="excitedEmoji"
                            name="content"
                            value="/images/Excited.png"
                        />
                        <img className="reaction" src="/images/Excited.png" alt="Excited"/>
                    </label >
                    <label  className="formInput" htmlFor="disinterestedEmoji">
                        <input 
                            className="input"
                            onChange={(e) => setContent(e.target.value)}
                            type="radio"
                            id="disinterestedEmoji"
                            name="content"
                            value="/images/Disinterested.png"
                        />
                        <img className="reaction" src="/images/Disinterested.png" alt="Disinterested"/>
                    </label>
                </div>
                <label className="formInput" >
                    If you would like, please leave an additional comment about your experience (optional):
                    <textarea 
                        className="input"
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
            {/*redirects to user profile can be changed to community later on */}
           <Link to="/user/"> <button className="standardButton" onClick={handleSubmit}>SUBMIT REACTION</button></Link>
        </div>
    )
}