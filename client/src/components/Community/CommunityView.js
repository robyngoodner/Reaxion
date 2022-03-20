import { useState, useEffect } from 'react';
import  { Link } from 'react-router-dom';
import * as communityService from '../../api/community.service'

export default function CommunityView () {
    const [communities, setCommunities] = useState();

    const getCommunities = async () => {
        await communityService.getCommunities()
            .then((res) => {
                setCommunities(res.data.data)
                // console.log("res.data",res.data.data)
                // console.log("Found communities: ",communities )
            })
    }

    useEffect(() => {
        getCommunities();
    }, [])

    return (
        <>
            {communities?.map((community, index)=> {
                return (
                    <div>
                    <li style={{listStyle:"none"}} key={index}><Link to={`/community/${community._id}`}><h3>{community.communityName}</h3></Link></li>
                    
                    </div>
                   
                    
                )
            })}
        </>
    )
}