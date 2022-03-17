import React from "react";
import Login from "../Login"
import Register from "../Register"

//define our welcome component
const Welcome = ({ checkUserActive }) => {
	return (
		<div>
			<div>
				<h1>Reaxion</h1>
			</div>
			<div>
				<Login checkUserActive={checkUserActive}/>
			</div>
			<div>
				<Register />
			</div>
		</div>
	);
};

export default Welcome;
