import { Route, Routes } from "react-router-dom";
// import * as communityService from '../../api/community.service';
import CommunityJoin from '../../components/Community/CommunityJoin';
import CommunityCreate from '../../components/Community/CommunityCreate';
import EventView from "../../components/Event/EventView";
import UpdateUserProfile from "../../components/UserProfile/UserProfileUpdate";
import Register from "../../components/Register";
import PostCreate from "../../components/Posts/PostCreate";


const Home = () => {
    return (
        <>
            
            <Routes>
                <Route  
                    path='/'
                    element={<EventView/>}
                    />
                <Route 
                    path="api/community" 
                    element={<CommunityCreate />}></Route>
                <Route  
                    path="api/community"
                    element={<CommunityJoin />}></Route>
                <Route  
                    path="profile"
                    element={<UpdateUserProfile />}></Route>
                <Route  
                    path="api/register"
                    element={<Register />}></Route>
                <Route  
                    path="post/new"
                    element={<PostCreate />}></Route>
            </Routes>
        </>
    )

}

export default Home;