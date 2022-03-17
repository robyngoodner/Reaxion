import { useState } from 'react';
// import { func } from 'prop-types';
import * as commentService from '../../api/comment.service';

const Comment = () => {
  
    const [comment, setComment] = useState("");

    const handleSubmit = async () => {
        let newComment = { comment };
        let res = await commentService.create(newComment)
            .then(() => {
               
                setComment("");
                console.log(newComment);
            });

        if (!res === 201) {
                alert("Your comment failed to save. More information: ", res.status)
        }
    };

    return (
        <div>
            <form>
                <label>Comment:
                <input  
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
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