import { Route, Routes, Link } from "react-router-dom";
import { useReducer, useEffect } from "react";
// import * as communityService from '../../api/community.service';
// import CommunityJoin from '../../components/Community/CommunityJoin';
// import CommunityCreate from '../../components/Community/CommunityCreate';
import Community from '../../components/Community/index';
import EventView from "../../components/Event/EventView";
import UpdateUserProfile from "../../components/UserProfile/UserProfileUpdate";
import PostCreate from "../../components/Posts/PostCreate";
import PostUpdate from "../../components/Posts/PostUpdate"
import EventCreate from "../../components/Event/EventCreate";
import * as authService from "../../api/auth.service";

// import Comment from "../../components/Comment/CommentView";
import NavBar from "../../components/NavBar";
import Welcome from "../../components/Welcome";
import EventsIndex from "../../components/Event/EventsIndex";
import UserIndex from "../../components/UserProfile";
import CommunityCreate from "../../components/Community/CommunityCreate";
import CommunityJoin from "../../components/Community/CommunityJoin";

const reducer = (prevState, action) => {
    switch(action.type) {
        case 'setIsLoggedIn':
            return {...prevState, isLoggedIn: action.payload};
        default:
            return prevState
    }
}

const initialState = {
    isLoggedIn: false,
}


const Home = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { isLoggedIn } = state;

    const userActive = () => {
        if (authService.currentUser()) {
            dispatch({type: 'setIsLoggedIn', payload: true})
        }else{
            dispatch({type: 'setIsLoggedIn', payload: false})
        }
    }

    useEffect(() => {
        userActive();
    }, []);

    if (isLoggedIn) {

    return (
        <>

        <div>
    
  <NavBar 
              checkUserActive={() => userActive()}
          />
        </div>
        {/* <h1>Successful Sign In</h1> */}

            <Routes>
                <Route  
                    path='/'
                    element={<Community/>}
                    />
                <Route  
                    path='/user/edit'
                    element={<UpdateUserProfile />}
                    />
                <Route 
                    path="community" 
                    element={<Community />}></Route>
                <Route 
                    path="community/:id" 
                    element={<EventsIndex />}></Route>
                {/* <Route 
                    path="community/:id/event/:id" 
                    element={<EventsIndex />}></Route> */}
                <Route 
                    path="/community/new" 
                    element={<CommunityCreate />}></Route>
                <Route  
                    path="/community/join"
                    element={<CommunityJoin />}></Route>
                <Route  
                    path="user/"
                    element={<UserIndex />}></Route>
                <Route  
                    path="post/new"
                    element={<PostCreate />}></Route>
                <Route  
                    path="post/:id"
                    element={<PostUpdate />}></Route>
                <Route
                    path="event/new"
                    element={<EventCreate />}></Route>
                {/* <Route
                    path="/comment"
                    element={<Comment />}></Route> */}
                <Route
                    path="/event/:id"
                    element={<EventView />}></Route>
                <Route
                    path="/event"
                    element={<EventsIndex />}></Route>
                
                {/* <Route
                    path="/events/"
                    element={<EventView />}></Route> */}
            </Routes>
        </>
    )
    } else {
        return (
            <div>
             	<div>
				        <Welcome checkUserActive={() => dispatch({type: "setIsLoggedIn", payload: true})}/>
			        </div>
            </div>
        )
    }

}

export default Home;