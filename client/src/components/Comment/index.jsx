import { useState } from 'react';
// import { func } from 'prop-types';
import * as commentService from '../../api/comment.service';

const Comment = () => {
  
    const [content, setContent] = useState("");

    const handleSubmit = async () => {
        let newComment = { content };
        let res = await commentService.create(newComment)
            .then(() => {
               
                setContent("");
                console.log(newComment);
            });

        if (!res === 201) {
                alert("Your event failed to save. More information: ", res.status)
        }
    };

    return (
        <div>
            <form>
                <label>Comment:
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