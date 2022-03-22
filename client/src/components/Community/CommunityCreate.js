import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as communityService from "../../api/community.service"
import * as authService from "../../api/auth.service"

/*
NOTE:
Have to pass in user as a prop in order to use user._id as the facilitator value in the hidden input in the form. Figure this out later
*/


export default function CommunityCreate (props) {
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

    const contentStyle = {
        display: (props.active)
    }

    return (
        <div className="libraryComponent" style={contentStyle}>
            <h2>Create a new Community</h2>
            <form className="formSpacing">
                <label className="formInput">Name your Community</label>
                    <input 
                        className = "input"
                        type="text"
                        name="communityName"
                        onChange={((e) => setCommunityName(e.target.value))}
                        placeholder="Name your Community"
                    /> 
                
                <label className="formInput">Create a unique keyword so your participants can find you. Make sure you remember your keyword!</label>
                    <input
                        className = "input"
                        type="text" 
                        name="keyword" 
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="Create a unique keyword to give to your participants"
                    />
               {/*redirect can be change to into the community once index controller is  completed. */}
                <Link to="/user/"> <button className="standardButton" onClick={handleSubmit}>Create Community</button></Link>
            </form>
        </div>
    )    
}