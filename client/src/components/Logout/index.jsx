import { useState } from "react";
import * as authService from "../../api/auth.service";

//**we do not have a CheckUserActive */

const Logout = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] =useState("");

    const handleSubmit = (e) => {
     
         authService.logout()
    }

return (
    <div>
       
            <div>
                <button onClick={handleSubmit}>
                    Logout
                </button>
            </div>
       
    </div>
);
};

export default Logout;