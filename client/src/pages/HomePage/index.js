import { Route, Routes } from "react-router-dom";
// import * as communityService from '../../api/community.service';
import CommunityJoin from '../../components/Community/CommunityJoin';
import CommunityCreate from '../../components/Community/CommunityCreate';
import EventView from "../../components/Event/EventView";
import UpdateUserProfile from "../../components/UserProfile/UserProfileUpdate";
import Register from "../../components/Register";
import PostCreate from "../../components/Posts/PostCreate";
import EventCreate from "../../components/Event/EventCreate";
import * as authService from "../../api/auth.service";




const Home = ({checkUserActive}) => {
    return (
        <>
            
            <Routes>
                <Route  
                    path='/'
                    element={<EventView/>}
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
                    path="register"
                    element={<Register />}></Route>
                <Route  
                    path="post/new"
                    element={<PostCreate />}></Route>
                <Route
                    path="event/new"
                    element={<EventCreate />}></Route>
            </Routes>
        </>
    )

}

export default Home;