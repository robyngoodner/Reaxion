import { Route, Routes } from "react-router-dom";
// import * as communityService from '../../api/community.service';
import CommunityJoin from '../../components/Community/CommunityJoin';
import CommunityCreate from '../../components/Community/CommunityCreate';
import NavBar from '../../components/NavBar';
import EventView from "../../components/Event/EventView";



const Home = () => {
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
            </Routes>
        </>
    )

}

export default Home;