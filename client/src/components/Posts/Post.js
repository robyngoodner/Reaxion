import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import * as postService from "../../api/post.service"


function ShowPost() {

    const [post, setPost] = useState([]);

    const findPost = async () => {
        
        // console.log("findPost function happening")
        await postService.showOne().then((res) => {
            console.log("res.data.data" + res.data.data)
            setPost(res.data.data);
            // console.log("found posts: ", post)
        });
    }


    const handleSubmitDelete = async () => {


        let res = await postService.destroy()
            .then(() => {
                window.location.href = "/post";
            });
        
         if ( !res === 201 ) {
             alert(`Post error. Please submit again. ${res.status}`) 
         } 
    }        


    // useEffect(() => {
    //     findPost();

    // },[])

//     const handleSubmitEdit = async () => {
//         // window.location.href = `/${post}/${id}`;
    
//      if ( !res === 201 ) {
//          alert(`Post error. Please submit again. ${res.status}`) 
//      } 
// }  
     return (
         <>
         <div>
         <h1>{post.User}</h1>
         <h2>{post.Event}</h2>
         <img className="reaction" src={`..${post.content}`} alt="content"/> 
         </div>
         <div>
             {/* <button onClick={handleSubmitEdit}>Edit</button> */}
             {/* <button onClick={handleSubmitDelete}>Delete</button> */}
         </div>
         </>
        
     )
}

export default ShowPost; 