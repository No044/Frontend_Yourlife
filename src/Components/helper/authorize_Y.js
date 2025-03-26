
import { deleteCookie } from "./cookie";
function authorize(permission,value,navigate,role){
    if(permission.includes(value) == false && role != "admin"){
        navigate("/auth/login");
        return
    }
}


export default authorize