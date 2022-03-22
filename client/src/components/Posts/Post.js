import { string } from 'prop-types';
import * as postService from "../../api/post.service"


function showPost( { post }) {

    const handleSubmitDelete = async () => {
        let res = await postService.destroy()
            .then(() => {
                window.location.href = "/post";
            });
        
         if ( !res === 201 ) {
             alert(`Post error. Please submit again. ${res.status}`) 
         } 
    }        

//     const handleSubmitEdit = async () => {
//         // window.location.href = `/${post}/${id}`;
    
//      if ( !res === 201 ) {
//          alert(`Post error. Please submit again. ${res.status}`) 
//      } 
// }  
     return (
         <>
         <div className="pastEventPosts">
            <img className="smallPost" src={post.content} />
            <p>{post.User_Comment}</p>
         </div>
         <div>
             {/* <button onClick={handleSubmitEdit}>Edit</button> */}
             {/* <button onClick={handleSubmitDelete}>Delete</button> */}
         </div>
         </>
        
     )
}

export default showPost; 