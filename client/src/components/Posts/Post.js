import { string } from 'prop-types';

function Post(props) {
    return (
        <div>
            <h2>User: {props.User}</h2>
            <p>Reaction: {props.content}</p>
            <p>Comment: {props.User_Comment}</p>
            <p>Comments: {props.Comments}</p>
            <p>UpVotes: {props.upVotes}</p>
        </div>
    )
}

export default Post; 