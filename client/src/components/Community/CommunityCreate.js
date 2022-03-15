import React, { useState } from 'react';
import * as communityService from "../../api/community.service"

/*
NOTE:
Have to pass in user as a prop in order to use user._id as the facilitator value in the hidden input in the form. Figure this out later
*/


export default function CommunityCreate () {
    const [communityName, setCommunityName] = useState("");
    const [Facilitator, setFacilitator] = useState("");
    const [keyword, setKeyword] = useState("");

    const handleSubmit = async () => {
        let newCommunity = { communityName, Facilitator, keyword };
        let res = await communityService.create(newCommunity).then(() => {
            setCommunityName("");
            setFacilitator("");
            setKeyword("");
            console.log("components-> Community -> Community Create: New Community: ", newCommunity)
        });

        if (!res ===201) {
            alert('Attempt to create new community failed. Please refresh and try again: ', res.status)
        }
    };

    return (
        <div>
            <form>
            {/* <input
                type="hidden"
                name="Facilitator"
                value={ user._id}
            /> */}
                <label>Name your Community</label>
                <input 
                    type="text"
                    name="communityName"
                    onChange={((e) => setCommunityName(e.target.value))}
                    placeholder="Name your Community"
                /> 
                <br />
                <label>Create a unique keyword to give to your participants</label>
                <input
                    type="text" 
                    name="keyword" 
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Create a unique keyword to give to your participants"
                />
                <button onClick={handleSubmit}>Create Community</button>
            </form>
        </div>
    )    
}