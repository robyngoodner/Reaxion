import UpdateUserProfile from "./UserProfile/UserProfileUpdate";
import CommunityCreate from "./Community/CommunityCreate";
import Register from "./Register";
import CommunityJoin from "./Community/CommunityJoin";
import PostCreate from "./Posts/PostCreate";
import { Link } from "react-router-dom";
import NavBar from './NavBar';
import Home from "../pages/HomePage";

function App() {

  return (
    <div className="App">
      <NavBar />
      
      {/* < UpdateUserProfile/> */}
      <h1>Reaxion</h1>
      <Home />
      {/* <CommunityCreate />
      <Register />
      <CommunityJoin />
      <PostCreate /> */}
    </div>
  );
}

export default App;
