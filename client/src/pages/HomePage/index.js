import { Route, Routes } from "react-router-dom";
import { useReducer, useEffect } from "react";
// import * as communityService from '../../api/community.service';
import CommunityJoin from '../../components/Community/CommunityJoin';
import CommunityCreate from '../../components/Community/CommunityCreate';
import EventView from "../../components/Event/EventView";
import UpdateUserProfile from "../../components/UserProfile/UserProfileUpdate";
import Register from "../../components/Register";
import PostCreate from "../../components/Posts/PostCreate";
import EventCreate from "../../components/Event/EventCreate";
import * as authService from "../../api/auth.service";
import Login from "../../components/Login";

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

    const checkLogin = () => {
        if (authService.currentUser()) {
            dispatch({type: 'setIsLoggedIn', payload: true})
        }else{
            dispatch({type: 'setIsLoggedIn', payload: false})
        }
    }

    useEffect(() => {
        checkLogin();
    }, []);

    if (isLoggedIn) {

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
    }else{
        return (
            <div>
                <h1>LOG IN!!!</h1>
                <Routes>
                    <Route
                    path = "login"
                    element = {<Login />}>Log In</Route>
                </Routes>
            </div>
        )
    }

}

export default Home;