import React, { useEffect, useState } from 'react';
import * as postService from '../../api/post.service';
import * as authService from '../../api/auth.service';
import * as eventService from '../../api/event.service';
import {Link} from "react-router-dom"
// import PostUpdate from './PostUpdate';
import Angry from "../../images/Angry.png";
import Content from "../../images/Content.png";
import Disinterested from "../../images/Disinterested.png";
import Excited from "../../images/Excited.png";
import Happy from "../../images/Happy.png";
import Sad from "../../images/Sad.png";

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

    const [active, setActive] = useState('flex');

    const toggleActive = () => {
        if(active === 'flex'){
            setActive('none')
        } else {
            setActive('flex')
        }
    }

    const contentStyle = {
        display: (active)
    }

    const onClick = () => {
        toggleActive()
        handleSubmit()
    }

    
    return (
        <div style={contentStyle} className="libraryComponent">
            <h2>Leave your Reaction</h2>
            <form className="formSpacing">
                <div>
                    <label>Reaction:</label>
                    <div className="reactionDisplay">
                    <label className="formInput" htmlFor="happyEmoji">
                        <input 
                            onChange={(e) => setContent(e.target.value)}
                            type="radio"
                            id="happyEmoji"
                            name="content"
                            value={Happy}
                        />
                        <img className="reaction" src="/images/Happy.png" alt="Happy"/>
                    </label>
                    <label className="formInput" htmlFor="sadEmoji">
                        <input 
                            onChange={(e) => setContent(e.target.value)}
                            type="radio"
                            id="sadEmoji"
                            name="content"
                            value={Sad}
                        />
                        <img className="reaction" src="/images/Sad.png" alt="Sad"/>
                    </label>
                    <label className="formInput" htmlFor="contentEmoji">
                        <input 
                            onChange={(e) => setContent(e.target.value)}
                            type="radio"
                            id="contentEmoji"
                            name="content"
                            value={Content}
                        />
                         <img className="reaction" src={Content} alt="Content"/>
                    </label>
                    <label className="formInput" htmlFor="angryEmoji">
                        <input 
                            onChange={(e) => setContent(e.target.value)}
                            type="radio"
                            id="angryEmoji"
                            name="content"
                            value={Angry}
                        />
                        <img className="reaction" src={Angry} alt="Angry"/>
                    </label>
                    <label  className="formInput" htmlFor="excitedEmoji">
                        <input 
                            onChange={(e) => setContent(e.target.value)}
                            type="radio"
                            id="excitedEmoji"
                            name="content"
                            value={Excited}
                        />
                        <img className="reaction" src={Excited} alt="Excited"/>
                    </label >
                    <label  className="formInput" htmlFor="disinterestedEmoji">
                        <input 
                            className="input"
                            onChange={(e) => setContent(e.target.value)}
                            type="radio"
                            id="disinterestedEmoji"
                            name="content"
                            value={Disinterested}
                        />
                        <img className="reaction" src={Disinterested} alt="Disinterested"/>
                    </label>
                    </div>
                </div>
                <label className="formInput" >
                    If you would like, please leave an additional comment about your experience (optional):
                    </label>
                    <textarea 
                        className="input"
                        onChange={(e) => setUser_Comment(e.target.value)}
                        value={User_Comment}
                        type="text"
                        name="User Comment"
                        placeholder="Additional comment"
                    />
               <input 
                    type="hidden"
                    name="Event"
                    value={eventId}
                />

            </form>
            {/*redirects to user profile can be changed to community later on */}
           <Link to="/user/"> <button className="standardButton" onClick={onClick}>SUBMIT REACTION</button></Link>
        </div>
    )
}