import React, { useState } from 'react';
import * as communityService from "../../api/community.service"
import * as authService from "../../api/auth.service"

/*
NOTE:
Have to pass in user as a prop in order to use user._id as the facilitator value in the hidden input in the form. Figure this out later
*/


export default function CommunityCreate () {
    const [communityName, setCommunityName] = useState("");
    const [keyword, setKeyword] = useState("");

    const handleSubmit = async () => {
        let newCommunity = { communityName, keyword };
        let res = await communityService.create(newCommunity).then(() => {
            setCommunityName("");
            setKeyword("");
            console.log("components-> Community -> Community Create: New Community: ", newCommunity)
        });

        if (!res ===201) {
            alert('Attempt to create new community failed. Please refresh and try again: ', res.status)
        }
    };

    const userTest = async () => {
        let res = await authService.currentUser();
        console.log(res)
    }

    return (
        <div>
            <h1>Create a new Community</h1>
            <form>
                <label>Name your Community</label>
                <input 
                    type="text"
                    name="communityName"
                    onChange={((e) => setCommunityName(e.target.value))}
                    placeholder="Name your Community"
                /> 
                <br />
                <label>Create a unique keyword so your participants can find you. Make sure you remember your keyword!</label>
                <input
                    type="text" 
                    name="keyword" 
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Create a unique keyword to give to your participants"
                />
                <button onClick={handleSubmit}>Create Community</button>
            </form>
            <button onClick={userTest}>Console log objects</button>
        </div>
    )    
}