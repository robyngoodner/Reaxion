import React from "react";
import Login from "../Login"
import Register from "../Register"
import '../../../src/styles.css'

//define our welcome component
const Welcome = ({ checkUserActive }) => {
	return (
		<div>
			<div className="center">
				<h1 className="title">Reaxion</h1>
			</div>
			<div className="login-page">
				<div className="login-container">
					<Login checkUserActive={checkUserActive}/>
				</div>
				<div className="login-container">
					<Register />
				</div>
			</div>	
		</div>
	);
};

export default Welcome;
