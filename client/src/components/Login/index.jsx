import { useState } from "react";
import * as authService from "../../api/auth.service";

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
    <div>
        <form>
            <label  htmlFor="email">
                Email
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    name="email"
                    placeholder="email"
                />
            </label>
            <label  htmlFor="password">
                Password
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    name="password"
                    placeholder="password"
                />
            </label>
            <div >
                <button onClick={handleSubmit}>
                    Login
                </button>
            </div>
        </form>
    </div>
);
};

export default Login;