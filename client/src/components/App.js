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
