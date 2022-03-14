import { useState } from 'react';
import * as authService from "../../api/auth.service";

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (e) => {
        e.PreventDefault();
        await authService.register(email,password);
        setEmail("");
        setPassword("");
        setSuccessMsg("Your Registration was Successful.");

    };

    return (
        <div>
            <form>
                <label htmlFor="email">
            Email
                    <input 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        name="email"
                        placeholder="email"
                    />
                </label>

                <label htmlFor="password">
            Password
                    <input 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="text"
                        name="password"
                        placeholder="password"
                    />
                </label>
            <button onClick={handleSubmit}>
                Register
            </button>
        <h1>{successMsg}</h1>

            </form>
        </div>
    );

};





export default Register;