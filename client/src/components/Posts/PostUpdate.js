import React, { useState } from 'react';
import * as postService from '../../api/post.service';

export default function PostUpdate () {
    const [content, setContent] = useState("");
    const [User_Comment, setUser_Comment] = useState("");

    const handleSubmit = async () => {
        let updatedPost = { content, User_Comment};
        let res = await postService.update(updatedPost)
        console.log("hello", res)

        .then(() => {

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
            </form>
            <button onClick={handleSubmit}>Submit Reaction</button>
        </div>
    )
}