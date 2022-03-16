import React, {useState, useEffect} from 'react';
import * as userProfileService from "../../api/userprofile.service";

export default function UpdateUserProfile () {
    const [userName, setuserName]= useState("");
    const [description, setdescription]= useState("");
    const [userIcon, setUserIcon]= useState("");
    //delete userProfile
    

    const handleSubmit = async () => {
        let newUserInfo = {userName, description, userIcon};
        let res = await userProfileService.update(newUserInfo).then(() => {
            setuserName("");
            setdescription("");
            setUserIcon("");
            UpdateUserProfile();
        });
        if (!res === 201) {
            alert(`error updating user information, ${res.status}`);
        }
    };


return (
    <div>
        <h1>Update your Public Profile</h1>
    <form>
        <label>
            Would you like to change your User Name?
            <input
                onChange={(e) => setuserName(e.target.value)}
                value={userName}
                type="text"
                name="User Name"
                placeholder="input your new alias"
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
    <button onClick={handleSubmit}>Update user profile information +</button>
</div>
);  
};
