import React from "react";
import Login from "../Login"
import Register from "../Register"
import '../../../src/styles.css'
import Angry from "../../images/Angry.png";
import Content from "../../images/Content.png";
import Disinterested from "../../images/Disinterested.png";
import Excited from "../../images/Excited.png";
import Happy from "../../images/Happy.png";
import Sad from "../../images/Sad.png";

//define our welcome component
const Welcome = ({ checkUserActive }) => {
	return (
		<div>
			<div className="center">
			<div>
			<h1 className="title">Reaxion</h1>
				<div className="reactionimgs">
				<img className="resizeReactions" src={Angry} alt="angry"></img>
				<img className="resizeReactions" src={Content} alt="content"></img>
				<img className="resizeReactions" src={Disinterested} alt="disinterested"></img>
				<img className="resizeReactions" src={Excited} alt="excited"></img>
				<img className="resizeReactions" src={Happy} alt="happy"></img>
				<img className="resizeReactions" src={Sad} alt="sad"></img>
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
