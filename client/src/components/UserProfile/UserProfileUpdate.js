import React, {useState, useEffect} from 'react';
import * as userProfileService from "../../api/userprofile.service";

export default function UpdateUserProfile () {
    const [firstName, setfirstName]= useState("");
    const [lastName, setlastName]= useState("");
    const [description, setdescription]= useState("");
    const [userIcon, setUserIcon]= useState("");

    const [deleteProfile, setDeleteProfile] = useState(null);

    const handleDelete = useEffect(() => {
        async function deleteUser() {
            await userProfileService.destroy();
            setDeleteProfile('User Deleted');
        }
        deleteUser();
    }, []);

 
const handleSubmit = async () => {
    let newUserInfo = {firstName, lastName, description, userIcon};
    let res = await userProfileService.update(newUserInfo).then(() => {
        setfirstName("");
        setlastName("");
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
    <button onClick={handleSubmit}>Update user profile information +</button>
    <p> Would you like to delete {deleteProfile}'s profile?</p>
    <button onClick={handleDelete}>Delete Profile</button>
</div>
);  
};
