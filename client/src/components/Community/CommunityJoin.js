import React, { useState } from 'react';
import * as communityService from "../../api/community.service";
import {Link} from "react-router-dom"

export default function CommunityJoin (props) {
    const [keyword, setKeyword] = useState("");
    // console.log("keyword line 6: ",keyword)
    const handleSubmit = async () => {
        let res = await communityService.update(keyword).then(() => {
            setKeyword("");
            // console.log("keyword: ",keyword)
        });

        if (!res === 201) {
            alert('Attempt to join existing community failed. Please refresh and try again: ', res.status)
            
        }
        window.location.href="/user";
    };

    const contentStyle = {
        display: (props.active)
    }

    return (
        <div className="libraryComponent" style={contentStyle}>
            <h2>Join an existing community</h2>
            <form className="formSpacing">
                <label className="formInput">Please enter your community's keyword</label>
                <input 
                    className = "input"
                    type="text"
                    name="keyword"
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Keyword"
                />
                <Link to="/user/"> <button className="standardButton" onClick={handleSubmit}>Join Community</button></Link>
            </form>
        </div>
    )
}