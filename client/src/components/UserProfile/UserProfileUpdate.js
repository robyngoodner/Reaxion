import React, {useState, useEffect} from 'react';
import * as userProfileService from "../../api/userprofile.service";
import * as postService from "../../api/post.service";
import { Link } from 'react-router-dom';
import * as communityService from "../../api/community.service";
import * as authService from "../../api/auth.service";

export default function UpdateUserProfile(data) {
    const [firstName, setFirstName]= useState("");
    const [lastName, setLastName]= useState("");
    const [description, setDescription]= useState("");
    const [userIcon, setUserIcon]= useState("");
    const [posts, setPosts] = useState([]);
    const [community, setCommunity] = useState([]);

    const handleSubmit = async () => {
        let newUserInfo = { firstName, lastName, description, userIcon };
        let res = await userProfileService.update(newUserInfo).then(() => {
            setFirstName("");
            setLastName("");
            setDescription("");
            setUserIcon("");
            console.log("userprofile newuserinfo: ", newUserInfo)
        });
        if (!res === 201) {
            alert(`Error updating user information, ${res.status}`);
        }
    };

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
    
    const getExistingProfile = async () => {
        let res = await userProfileService.show()
            .then((data) => {
            // console.log("get existing profile: ", data.data.data)
            setFirstName(data.data.data.firstName);
            setLastName(data.data.data.lastName);
            setDescription(data.data.data.description);
            setUserIcon(data.data.data.setUserIcon)
        });
        if ( !res === 201 ) {
            alert("Profile Not Deleted") 
        } 
    }

    const handleLogout = async () => {
        const res = await authService.logout();
        //
        return res;
    }

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
     
}  
    const findPosts = async () => {
        await postService.getAll().then((res) => {
            console.log(res.data.data)
            setPosts(res.data.data);
        });
    }
    
    useEffect(() => {
        findPosts();
        getExistingProfile();
    }, []);

    const findCommunity = async () => {
        await communityService.getCommunities()
            .then((res) => {
           setCommunity(res.data.data)
        });
    }
        useEffect(() => {
            findCommunity();

        }, []);
    


return (
    <div>
        <h1>Update your Public Profile</h1>
    <form>
        <label>
            Would you like to change your First and/or Last name?
            <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                type="text"
                name="firstName"
                placeholder={firstName}
            />
        </label>
        <label>
            <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                type="text"
                name="lastName"
                placeholder="input your new last name"
            />
        </label>
        <label>
            Would you like to change your description?
            <input
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                type="text"
                name="description"
                placeholder="tell everyone a little bit about yourself"
            />
        </label>
        <label>
            Would you like to change your User Icon?
            <textarea
                onChange={(e) => setUserIcon(e.target.value)}
                value={userIcon}
                type="text"
                name="userIcon"
                placeholder="input your new image, please use .jpg or .png"
            />
        </label>
        
    </form>
    <Link to="/user/:id"> <button onClick={handleSubmit}>Update user profile information</button></Link> 
    <p> Would you like to delete your profile?</p>
  <Link to="/logout"><button onClick={() => {handleProfileDelete(); handleLogout();}}>Delete Profile</button></Link> 
        
</div>
);  
        }
