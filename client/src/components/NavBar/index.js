import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import * as authService from '../../api/auth.service';
import * as communityService from "../../api/community.service";
import * as userProfileService from "../../api/userprofile.service";
// import CommunityJoin from '../../components/Community/CommunityJoin';
// import CommunityCreate from '../../components/Community/CommunityCreate';
// import EventView from "../../components/Event/EventView";
// import UpdateUserProfile from "../../components/UserProfile/UserProfileUpdate";
// import PostCreate from "../../components/Posts/PostCreate";
// import EventCreate from "../../components/Event/EventCreate";
// import Comment from "../../components/Comment";
// import Register from "../Register";
// import Login from "../Login";


const contentStyles = {
	padding: "2px",
	
};

export default function NavBar({checkUserActive}) {

    const [community, setCommunity] = useState();
    const [user, setUser] = useState("");
        const handleLogout = async () => {
            const res = await authService.logout();
            checkUserActive();
            return res;
        }

        const getCommunities = async () => {
            await communityService.getCommunities()
                .then((res) => {

                    setCommunity(res.data)
                    
                    console.log("res.data",res.data.data)
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
        <div>

        {/* need user index to display id */}
            <NavLink
                to={`/user/${user._id}`} style={contentStyles}
            >User Profile</NavLink>
            
            {/* <NavLink
                to="/new" style={contentStyles}>
                Create new community</NavLink> */}

            {/* <NavLink
        to={`/community/${community._id}`} style={contentStyles}
            >All Communities</NavLink> */}

            {/* <NavLink
                to="/join" style={contentStyles}
            >Join a community</NavLink> */}

            {/* <NavLink
                to="/profile" style={contentStyles}
            >Profile</NavLink> */}



{/* need page to show index of single community to nest these links in*/}

            {/* <NavLink
                to="/post/new" style={contentStyles}
            >New Post</NavLink>
            <NavLink    
                to="event/new" style={contentStyles}
            >New Event</NavLink>
            */}
            {/* <NavLink
                to='/comment' style={contentStyles}
            >Comment
            </NavLink> */}

            {/* <NavLink
                to='/events' style={contentStyles}
            >All Events
            </NavLink> */}

            <NavLink
                to='/' style={contentStyles}
                onClick = {handleLogout}
            >Logout
            </NavLink>
           


         </div>
        
    )
}

