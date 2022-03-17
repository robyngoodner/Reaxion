import { NavLink } from 'react-router-dom';
import * as authService from '../../api/auth.service';

export default function NavBar({checkUserActive}) {
        const handleLogout = async () => {
            const res = await authService.logout();
            checkUserActive();
            return res;
        }
    return (
        <div>
            <NavLink
                to="/"
            >Home</NavLink>
            <NavLink
                to="/new"
            >Create new community</NavLink>
            <NavLink
                to="/join"
            >Join a community</NavLink>
            <NavLink
                to="/register"
            >Register</NavLink>
            <NavLink
                to="/profile"
            >Profile</NavLink>
            <NavLink
                to="/post/new"
            >New Post</NavLink>
            <NavLink    
                to="event/new"
            >New Event</NavLink>
            <NavLink
                to='/'
                onClick = {handleLogout}
            >Logout
            </NavLink>
            <NavLink
                to='/login'
            >Login
            </NavLink>
        </div>
    )
}

