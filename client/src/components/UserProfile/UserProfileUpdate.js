import React, {useState, useEffect} from 'react';
import * as userProfileService from "../../api/userprofile.service";
import * as postService from "../../api/post.service";
import { Link } from 'react-router-dom';

export default function UpdateUserProfile () {
    const [firstName, setfirstName]= useState("");
    const [lastName, setlastName]= useState("");
    const [description, setdescription]= useState("");
    const [userIcon, setUserIcon]= useState("");
    const [posts, setPosts] = useState([]);
    
    const handleProfileDelete = async () => {
        console.log('in handleProfileDelete');
        let res = await userProfileService.destroy()
            .then(() => {
                // window.location.href = "/";
            });
         if ( !res === 201 ) {
             alert("Profile Not Deleted") 
         } 
    }        
    
    const handleSubmit = async () => {
        let newUserInfo = {firstName, lastName, description, userIcon};
        let res = await userProfileService.update(newUserInfo).then(() => {
            setfirstName("");
            setlastName("");
            setdescription("");
            setUserIcon("");
            UpdateUserProfile();
            console.log(newUserInfo)
        });
        if (!res === 201) {
            alert(`error updating user information, ${res.status}`);
        }
    };

    const findPosts = async () => {
        await postService.getAll().then((res) => {
           
            console.log(res);
            setPosts(res.data.data);
        });
    }

    useEffect(() => {
        findPosts();
    }, []);

    const handleSubmitDelete = async () => {
        let res = await postService.destroy()
            .then(() => {
                findPosts();
            });
        
         if ( !res === 201 ) {
             alert(`Post error. Please submit again. ${res.status}`) 
         } 
    }        

    const handleSubmitEdit = (id) => {
        console.log(`/post/${id}`)
        // console.log(`/post/${post.id}`)
    
    //  if ( !res === 201 ) {
    //      alert(`Post error. Please submit again. ${res.status}`) 
    //  } 
}  

    

return (
    <div>
        <h1>Update your Public Profile</h1>
    <form>
        <label>
            Would you like to change your First and/or Last name?
            <input
                onChange={(e) => setfirstName(e.target.value)}
                value={firstName}
                type="text"
                name="first name"
                placeholder="input your new first name"
            />
        </label>
        <label>
            <input
                onChange={(e) => setlastName(e.target.value)}
                value={lastName}
                type="text"
                name="last name"
                placeholder="input your new last name"
            />
        </label>
        <label>
            Would you like to change your description?
            <input
                onChange={(e) => setdescription(e.target.value)}
                value={description}
                type="text"
                name="User Description"
                placeholder="tell everyone a little bit about yourself"
            />
        </label>
        <label>
            Would you like to change your User Icon?
            <textarea
                onChange={(e) => setUserIcon(e.target.value)}
                value={userIcon}
                type="text"
                name="body"
                placeholder="input your new image, please use .jpg or .png"
            />
        </label>
        
    </form>
    <button onClick={handleSubmit}>Update user profile information</button>
    <p> Would you like to delete your profile?</p>
    <button onClick={handleProfileDelete}>Delete Profile</button>
        <h1>Posts</h1>
        <ul>
            {posts.map((post)=> {
                return (
                    <>
                        <li style={{listStyle:"none"}} key={post.index}></li>
                        <li> 
                            Event:{post.event}
                            Reaction:{post.content}
                            User Comment:{post.User_Comment}
                        </li>
                        <div>
                            <Link to={`../../post/${post._id}`} state={{ postId: post._id }} >
                                <button>Edit</button>
                            </Link>
                            <button onClick={handleSubmitDelete}>Delete</button>
                        </div>
                    </>
                )
            })}
        </ul> 
</div>
);  
};
