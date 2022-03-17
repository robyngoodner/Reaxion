import { useState } from 'react';
// import { func } from 'prop-types';
import * as commentService from '../../api/comment.service';

const Comment = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async () => {
        let newEvent = { title, content };
        let res = await commentService.create(newEvent)
            .then(() => {
                setTitle("");
                setContent("");
                console.log(newEvent);
            });

        if (!res === 201) {
                alert("Your event failed to save. More information: ", res.status)
        }
    };

    return (
        <div>
            <form>
                <label>Event Title
                <input  
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    type="text"
                    name="title"
                    placeholder="Date or name of event"
                /></label>
                <label>Event Description
                <input  
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    type="text"
                    name="content"
                    placeholder="Feel free to add a comment"
                /></label>
            </form>
            <button onClick={handleSubmit}>Post Comment</button>
        </div>
    )

}

export default Comment;