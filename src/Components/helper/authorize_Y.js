
import { deleteCookie } from "./cookie";
function authorize(permission,value,navigate,role,type = 1){
    if(type == 1){
        if(permission.includes(value) == false && role != "admin"){
            navigate("/auth/login");
            return
        }
    }else if(type == 2){
        if(role != "admin"){
            navigate("/auth/login");
            return
    }
}
}


export default authorize