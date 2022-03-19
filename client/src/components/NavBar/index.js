// import { Route, Routes } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import * as authService from '../../api/auth.service';
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
        const handleLogout = async () => {
            const res = await authService.logout();
            checkUserActive();
            return res;
        }

    return (      
        <div>
            <NavLink
                to="/" style={contentStyles}
            >Home</NavLink>
            {/* <NavLink
                to="/new" style={contentStyles}
            >Create new community</NavLink> */}
            <NavLink
                to="/community" style={contentStyles}
            >My Communities</NavLink>
            {/* <NavLink
                to="/join" style={contentStyles}
            >Join a community</NavLink> */}
            <NavLink
                to="/profile" style={contentStyles}
            >Profile</NavLink>
            <NavLink
                to="/post/new" style={contentStyles}
            >New Post</NavLink>
            <NavLink    
                to="event/new" style={contentStyles}
            >New Event</NavLink>
           
            <NavLink
                to='/comment' style={contentStyles}
            >Comment
            </NavLink>

            <NavLink
                to='/event' style={contentStyles}
            >All Events
            </NavLink>

            <NavLink
                to='/' style={contentStyles}
                onClick = {handleLogout}
            >Logout
            </NavLink>
           



               {/*** routes ****/}
{/* 
              <Routes>

                <Route  
                    path='/'
                    element={<EventView />}
                    />

                <Route 
                    path="new" 
                    element={<CommunityCreate />}></Route>

                <Route  
                    path="join"
                    element={<CommunityJoin />}></Route>

                <Route  
                    path="profile"
                    element={<UpdateUserProfile />}></Route>
               
                <Route  
                    path="post/new"
                    element={<PostCreate />}></Route>

                <Route
                    path="event/new"
                    element={<EventCreate />}></Route>

                     <Route
                    path="/comment"
                    element={<Comment />}></Route>

                    <Route
                    path = "login"
                    element = {<Login />}>Log In</Route>

                     <Route  
                    path="register"
                    element={<Register />}></Route>
                   
              
            </Routes> */}
         </div>
        
    )
}

