import { Alerterror } from "./Alert"
import { deleteCookie } from "../helper/cookie"
function handle_error(respond,navigate){
     if(respond.status == false && respond.error == 100){
         navigate("/auth/login")
         return
     }else if(respond.status == false && respond.error == 500){
        Alerterror("Đã có lỗi hệ thống vui lòng LH admin")
        return
     }
     else if(respond.status == false && respond.error == 300){
        Alerterror("Dữ Liệu Không Hợp Lệ")
        return
     }else if(respond.status == false && respond.error == 400){
      Alerterror("Server Khóa Tạm Thời")
      return

   }else if(respond.status == false && respond.error == 600){
      Alerterror("Server Không Hoạt Dộng")
      return
   }else if(respond.status == false && respond.error == 700){
      Alerterror("Dữ liệu cập nhật không hợp lệ")
      return
   }
}

export default handle_error