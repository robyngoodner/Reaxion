import React, { useEffect, useState } from 'react';
import * as commentService from "../../api/comment.service"
import CommentCreate from '../Comment/CommentCreate';

export default function CommentView() {

    const [comment, setComment] = useState([]);
    
    useEffect(() => {
        async function getComment() {
            const comments = await commentService.getAll();
                setComment(comments.data);
        }
        getComment();
    }, [])

    return(
        <>
            <h1>{comment.comment}</h1>
            <CommentCreate />
        </>
    )
}
