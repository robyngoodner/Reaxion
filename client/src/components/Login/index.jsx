import { useState } from "react";
import * as authService from "../../api/auth.service";
import '../../../src/styles.css'

//**we do not have a CheckUserActive */


const Login = ( {checkUserActive} ) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] =useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
      await authService.login(email, password).then((res) =>{
          //allows redirect after sign in dont delete
         {checkUserActive();}
            setEmail("");
            setPassword("");
        });
    };

return (
    <div className = "container">
        <form className = "loginForm">
        <h1 className="formTitle">Login</h1>
            <div className = "loginContainer">
            <label htmlFor="email">
                Email</label>
                <input
                    className = "input"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    name="email"
                    placeholder="email"
                />
            <label  htmlFor="password">
                Password</label>
                <input
                    className = "input"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    name="password"
                    placeholder="password"
                />
            </div>
            <div >
                <button className = "standardButton" onClick={handleSubmit}>
                    Login
                </button>
            </div>
        </form>
    </div>
);
};

export default Login;