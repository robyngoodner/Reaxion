import React, { useEffect, useState } from 'react';
import { useLocation, Link}  from 'react-router-dom';
import * as postService from '../../api/post.service';
import * as eventService from '../../api/event.service';

export default function PostUpdate (props) {
    const location = useLocation();
    // const { postId } = location.state;

    const [content, setContent] = useState("");
    const [User_Comment, setUser_Comment] = useState("");
    const [Event, setEvent] = useState("");
    const [events, setEvents] = useState([]);

    // const [_id, set_id] = useState( postId )
    
    const handleSubmit = async () => {
        console.log("before res")
        // console.log({ postId })

        // needs _id 
        let updatedPost = { content, User_Comment, Event };
        let res = await postService.update(updatedPost)
        console.log("after res", res)
        .then(() => {
                // set_id("")
                setContent([]);
                setUser_Comment("");
                setEvent("")
                console.log("updated post", updatedPost)
            });
        
         if ( !res === 201 ) {
             alert(`Post error. Please submit again. ${res.status}`) 
         }    
    }

    const contentStyle = {
        display: (props.active)
    }


    const findEvents = async () => {
        await eventService.get().then((res) => {
            setEvents(res.data.data);
            console.log("found events: ", events)
            setEvent(res.data.data[0]._id)
        });

    }

    useEffect(() => {
        findEvents();
    }, []);

    return (
        <div style={contentStyle} className="libraryComponent">
            <h2>Edit your Reaction</h2>
            <form className="formSpacing">
                <div>
                    <p>Event</p>
                    <select className="formInput" onChange={(e) => setEvent(e.target.value)}>
                    {events.map((event)=> {
                        return (
                            <option 
                            value={event._id} key={event.keyword}
                            name="event">{event.title}</option>
                        )
                    })}
                    </select> 
                    <label >Reaction:</label>
                    
                    <div className="reactionDisplay">
                    <label className="formInput" htmlFor="happyEmoji">
                        <input 
                            onChange={(e) => setContent(e.target.value)}
                            type="radio"
                            id="happyEmoji"
                            name="reaction"
                            value="Happy"
                        />
                        <img className="reaction" src="/images/Happy.png" alt="Happy"/>
                    </label>
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
                </div>
                <label className="formInput">
                    If you would like, please leavea an additional comment about your experience (optional):
                    </label>
                    <textarea 
                        className="input"
                        onChange={(e) => setUser_Comment(e.target.value)}
                        value={ User_Comment }
                        type="text"
                        name="comment"
                        placeholder="Additional comment"
                    />
                {/* <input 
                    onChange={() => set_id( { postId } )}
                    type="hidden"
                    name="_id"
                    value={ postId }
                /> */}
            </form>
             {/*redirect can be change to into the community once index controller is  completed. */}
            <Link to="/user/"> <button className="standardButton" onClick={handleSubmit}>Update</button></Link>
        </div>
    )
}