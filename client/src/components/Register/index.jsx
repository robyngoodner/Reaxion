import { useState } from 'react';
import * as authService from "../../api/auth.service";
import '../../../src/styles.css'


const Register = () => {

    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit =  async (e) => {
        e.PreventDefault();
         authService.register(email,password,firstName,lastName);
        setEmail("");
        setPassword("");
        setfirstName("");
        setlastName("");
        setSuccessMsg("Your Registration was Successful.");
        console.log("components-->register-->index handlesubmit: ", email, password)

    };

    return (
        <div className="container">
            <form className = "loginForm">
            <h1 className="formTitle">Create an Account</h1>
            <div className="loginContainer">
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
                
                <label htmlFor="email">
            First Name</label>
                    <input 
                        className = "input"
                        onChange={(e) => setfirstName(e.target.value)}
                        value={firstName}
                        type="text"
                        name="firstName"
                        placeholder="first name"
                    />
                
                <label htmlFor="email">
            Last Name</label>
                    <input 
                        className = "input"
                        onChange={(e) => setlastName(e.target.value)}
                        value={lastName}
                        type="text"
                        name="lastName"
                        placeholder="last name"
                    />
                

                <label for="chk" aria-hidden="true" htmlFor="password">
            Password</label>
                    <input 
                        className = "input"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="text"
                        name="password"
                        placeholder="password"
                    />
                </div>
                    <div>
                        <button className = "standardButton" onClick={handleSubmit}>
                            Sign Up
                        </button>
                    </div>
                    {/* <h1>{successMsg}</h1> */}
            </form>
        </div>
    );

};





export default Register;