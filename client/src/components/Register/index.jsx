import { useState } from 'react';
import * as authService from "../../api/auth.service";


const Register = () => {

    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (e) => {
        e.PreventDefault();
        await authService.register(email,password,firstName,lastName);
        setEmail("");
        setPassword("");
        setSuccessMsg("Your Registration was Successful.");
        console.log("components-->register-->index handlesubmit: ", email, password)

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
                <label htmlFor="email">
            First Name
                    <input 
                        onChange={(e) => setfirstName(e.target.value)}
                        value={firstName}
                        type="text"
                        name="firstName"
                        placeholder="firstName"
                    />
                </label>
                <label htmlFor="email">
            Last Name
                    <input 
                        onChange={(e) => setlastName(e.target.value)}
                        value={lastName}
                        type="text"
                        name="lastName"
                        placeholder="lastName"
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