import React, { useState } from 'react';
import { useLocation, Link}  from 'react-router-dom';
import * as postService from '../../api/post.service';

export default function PostUpdate () {
    const location = useLocation();
    const { postId } = location.state;

    const [content, setContent] = useState("");
    const [User_Comment, setUser_Comment] = useState("");
    const [_id, set_id] = useState( postId )
    
    const handleSubmit = async () => {
        console.log("before res")
        console.log({ postId })

        let updatedPost = { _id, content, User_Comment};
        let res = await postService.update(updatedPost)
        console.log("after res", res)
        .then(() => {
                set_id("")
                setContent([]);
                setUser_Comment("");
                console.log("updated post", updatedPost)
            });
        
         if ( !res === 201 ) {
             alert(`Post error. Please submit again. ${res.status}`) 
         }    
    }

    return (
        <div>
            <h1>Edit your Reaction</h1>
            <form>
                <div>
                    Reaction:
                    <input 
                        onChange={(e) => setContent(e.target.value)}
                        type="radio"
                        id="happyEmoji"
                        name="reaction"
                        value="Happy"
                    />
                    <label for="happyEmoji">Happy</label>
                    <input 
                        onChange={(e) => setContent(e.target.value)}
                        type="radio"
                        id="sadEmoji"
                        name="reaction"
                        value="Sad"
                    />
                    <label for="sadEmoji">Sad</label>
                    <input 
                        onChange={(e) => setContent(e.target.value)}
                        type="radio"
                        id="contentEmoji"
                        name="reaction"
                        value="Content"
                    />
                    <label for="contentEmoji">Content</label>
                    <input 
                        onChange={(e) => setContent(e.target.value)}
                        type="radio"
                        id="angryEmoji"
                        name="reaction"
                        value="Angry"
                    />
                    <label for="angryEmoji">Angry</label>
                    <input 
                        onChange={(e) => setContent(e.target.value)}
                        type="radio"
                        id="excitedEmoji"
                        name="reaction"
                        value="Excited"
                    />
                    <label for="excitedEmoji">Excited</label>
                    <input 
                        onChange={(e) => setContent(e.target.value)}
                        type="radio"
                        id="disinterestedEmoji"
                        name="reaction"
                        value="Disinterested"
                    />
                    <label for="disinterestedEmoji">Disinterested</label>
                </div>
                <label>
                    If you would like, please leavea an additional comment about your experience (optional):
                    <textarea 
                        onChange={(e) => setUser_Comment(e.target.value)}
                        value={ User_Comment }
                        type="text"
                        name="comment"
                        placeholder="Additional comment"
                    />
                </label>
                {/* <input 
                    onChange={() => set_id( { postId } )}
                    type="hidden"
                    name="_id"
                    value={ postId }
                /> */}
            </form>
            <Link to="/user/:id"> <button onClick={handleSubmit}>Submit Reaction</button></Link>
           
        </div>
    )
}