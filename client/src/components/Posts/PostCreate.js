import React, { useState } from 'react';
import * as postService from '../../api/post.service';

export default function PostCreate () {
    const [reaction, setReaction] = useState([]);
    const [comment, setComment] = useState("");

    const handleSubmit = async () => {
        let newPost = { reaction, comment};
        let res = await postService.create(newPost)
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
                <label>
                    Reaction:
                    <input 
                        onChange={(e) => setReaction(e.target.value)}
                        value={reaction}
                        type="radio"
                        id="happyEmoji"
                        name="reaction"
                        value="happy"
                    />
                    <label for="happyEmoji">Happy</label>
                    <input 
                        onChange={(e) => setReaction(e.target.value)}
                        value={reaction}
                        type="radio"
                        id="sadEmoji"
                        name="reaction"
                        value="sad"
                    />
                    <label for="sadEmoji">Sad</label>
                    <input 
                        onChange={(e) => setReaction(e.target.value)}
                        value={reaction}
                        type="radio"
                        id="contentEmoji"
                        name="reaction"
                        value="content"
                    />
                    <label for="contentEmoji">Content</label>
                    <input 
                        onChange={(e) => setReaction(e.target.value)}
                        value={reaction}
                        type="radio"
                        id="angryEmoji"
                        name="reaction"
                        value="angry"
                    />
                    <label for="angryEmoji">Angry</label>
                    <input 
                        onChange={(e) => setReaction(e.target.value)}
                        value={reaction}
                        type="radio"
                        id="excitedEmoji"
                        name="reaction"
                        value="excited"
                    />
                    <label for="excitedEmoji">Excited</label>
                    <input 
                        onChange={(e) => setReaction(e.target.value)}
                        value={reaction}
                        type="radio"
                        id="disinterestedEmoji"
                        name="reaction"
                        value="disinterested"
                    />
                    <label for="disinterestedEmoji">disinterested</label>
                </label>
                <lable>
                    If you would like, please leavea an additional comment about your experience (optional):
                    <textarea 
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        type="text"
                        name="comment"
                        placeholder="Additional comment"
                    />
                </lable>
            </form>
            <button onClick={handleSubmit}>Submit Reaction</button>
        </div>
    )
}