import { useState, useEffect } from 'react';
import  { Link } from 'react-router-dom';
import * as communityService from '../../api/community.service'
import * as userProfileService from "../../api/userprofile.service";
import EventCreate from '../Event/EventCreate';

export default function CommunityView () {
    const [communities, setCommunities] = useState();
    const [user, setUser] = useState("");

    const getCommunities = async () => {
        await communityService.getCommunities()
            .then((res) => {
                setCommunities(res.data.data)
                console.log(res.data.data);
                // console.log("res.data",res.data.data)
                // console.log("Found communities: ",communities )
            })
    }

    const findUser = async () => {
        await userProfileService.show().then((res) => {
            setUser(res.data.data);
        });
    }
    useEffect(() => {
        getCommunities();
        findUser();
    }, [])

    
    return (
        <>
            {communities?.map((community, index)=> {
                if(user._id === community.Facilitator){
                    
                return (
                    <div> 
                    <li style={{listStyle:"none"}} key={index}><Link to={`/community/${community._id}`}><h3> Facilitator for {community.communityName}</h3></Link></li>
                    <Link to="/event/new"> <button>Create event</button></Link>
                    </div>  
         )
                } 
                if(user._id !== community.Facilitator) {
                    
                    return (
                          
                    <div> 
                    <li style={{listStyle:"none"}} key={index}><Link to={`/community/${community._id}`}><h3>Member of {community.communityName}</h3></Link></li>                  
                    </div>  
                    )
                }
                
                   })}
        
        </>
    )     }