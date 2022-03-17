import { Route, Routes, Link } from "react-router-dom";
import { useReducer, useEffect } from "react";
// import * as communityService from '../../api/community.service';
import CommunityJoin from '../../components/Community/CommunityJoin';
import CommunityCreate from '../../components/Community/CommunityCreate';
import EventView from "../../components/Event/EventView";
import UpdateUserProfile from "../../components/UserProfile/UserProfileUpdate";
import PostCreate from "../../components/Posts/PostCreate";
import EventCreate from "../../components/Event/EventCreate";
import * as authService from "../../api/auth.service";

import Comment from "../../components/Comment/CommentView";
import NavBar from "../../components/NavBar";
import Welcome from "../../components/Welcome";


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
                    path="post/new"
                    element={<PostCreate />}></Route>
                <Route
                    path="event/new"
                    element={<EventCreate />}></Route>
                     <Route
                    path="/comment"
                    element={<Comment />}></Route>
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