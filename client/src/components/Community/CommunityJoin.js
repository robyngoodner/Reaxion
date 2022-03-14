import React, { useState } from 'react';
import * as communityService from "../../api/community.service"

export default function CommunityJoin () {
    const [keyword, setKeyword] = useState("");

    const handleSubmit = async () => {
        let existingCommunity = { keyword };
        let res = await communityService.update(existingCommunity).then(() => {
            setKeyword("");
            console.log("components-> Community -> Community Join: Existing Community: ", existingCommunity)
        });

        if (!res === 201) {
            alert('Attempt to join existing community failed. Please refresh and try again: ', res.status)
        }
    };
    return (
        <div>
            <h1>Join an existing community</h1>
            <form>
                <label>Please enter your community's keyword</label>
                <input 
                    type="text"
                    name="keyword"
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Keyword"
                />
                <button onClick={handleSubmit}>Join Community</button>
            </form>
        </div>
    )
}