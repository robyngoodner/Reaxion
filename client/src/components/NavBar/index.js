import { Link, NavLink } from 'react-router-dom';

export default function NavBar() {
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
        </div>
    )
}