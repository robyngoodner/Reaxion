import CommunityCreate from "./Community/CommunityCreate";
import Register from "./Register";
import CommunityJoin from "./Community/CommunityJoin";


function App() {

  return (
    <div className="App">
      <h1>Reaxion</h1>
      <CommunityCreate />
      <Register />
      <CommunityJoin />
    </div>
  );
}

export default App;
