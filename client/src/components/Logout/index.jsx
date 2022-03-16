import * as authService from "../../api/auth.service";

//**we do not have a CheckUserActive */

const Logout = () => {

    const handleSubmit = (e) => {
         authService.logout()
         console.log("im outta here,log out")
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