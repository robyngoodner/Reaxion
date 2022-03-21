import React from "react";
import Login from "../Login"
import Register from "../Register"
import '../../../src/styles.css'

//define our welcome component
const Welcome = ({ checkUserActive }) => {
	return (
		<div>
			<div className="center">
			<div>
			<h1 className="title">Reaxion</h1>
				<div className="reactionimgs">
				<img className="resizeReactions" src="../images/angry.png" alt="angry"></img>
				<img className="resizeReactions" src="../images/content.png" alt="content"></img>
				<img className="resizeReactions" src="../images/disinterested.png" alt="disinterested"></img>
				<img className="resizeReactions" src="../images/excited.png" alt="excited"></img>
				<img className="resizeReactions" src="../images/happy.png" alt="happy"></img>
				<img className="resizeReactions" src="../images/sad.png" alt="sad"></img>
				</div>
			</div>
				
				
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
