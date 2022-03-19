import React, { useState } from 'react';
import * as postService from '../../api/post.service';

export default function PostUpdate () {
    const [reaction, setReaction] = useState("");
    const [comment, setComment] = useState("");
    const [User, setUser] = useState("");

    const handleSubmit = async () => {
        let newPost = { reaction, comment};
        let res = await postService.update(newPost)
            .then(() => {
                setReaction([]);
                setComment("");
                console.log(newPost)
            });
        
         if ( !res === 201 ) {
             alert(`Post error. Please submit again. ${res.status}`) 
         }    
    }

    return (
        <div>
            <h1>Leave your Reaction</h1>
            <form>
                <div>
                    Reaction:
                    <input 
                        onChange={(e) => setReaction(e.target.value)}
                        type="radio"
                        id="happyEmoji"
                        name="reaction"
                        value="happy"
                    />
                    <label htmlFor="happyEmoji">Happy</label>
                    <input 
                        onChange={(e) => setReaction(e.target.value)}
                        type="radio"
                        id="sadEmoji"
                        name="reaction"
                        value="sad"
                    />
                    <label htmlFor="sadEmoji">Sad</label>
                    <input 
                        onChange={(e) => setReaction(e.target.value)}
                        type="radio"
                        id="contentEmoji"
                        name="reaction"
                        value="content"
                    />
                    <label htmlFor="contentEmoji">Content</label>
                    <input 
                        onChange={(e) => setReaction(e.target.value)}
                        type="radio"
                        id="angryEmoji"
                        name="reaction"
                        value="angry"
                    />
                    <label htmlFor="angryEmoji">Angry</label>
                    <input 
                        onChange={(e) => setReaction(e.target.value)}
                        type="radio"
                        id="excitedEmoji"
                        name="reaction"
                        value="excited"
                    />
                    <label htmlFor="excitedEmoji">Excited</label>
                    <input 
                        onChange={(e) => setReaction(e.target.value)}
                        type="radio"
                        id="disinterestedEmoji"
                        name="reaction"
                        value="disinterested"
                    />
                    <label htmlFor="disinterestedEmoji">Disinterested</label>
                </div>
                <label>
                    If you would like, please leavea an additional comment about your experience (optional):
                    <textarea 
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        type="text"
                        name="comment"
                        placeholder="Additional comment"
                    />
                </label>
                <input
                type="hidden"
                name="User"
                value={ user._id }
                /> 
            </form>
            <button onClick={handleSubmit}>Submit Reaction</button>
        </div>
    )
}