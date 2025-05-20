import { Alerterror } from "./Alert"
import { deleteCookie } from "../helper/cookie"
function handle_error(respond, navigate, type) {

   if (respond.status == false && respond.error == 100) {
      navigate("/auth/login")
      return
   }
   else if (respond.status == false && respond.error == 300) {
      Alerterror(type != null ? type : "Dữ Liệu Không Hợp Lệ Để Thực Hiện Thao Tác")
      return
   } else if (respond.status == false && respond.error == 400) {
      Alerterror("Server Khóa Tạm Thời")
      return
   }
   else if (respond.status == false && respond.error == 500) {
      Alerterror(type != null ? type : "Đã Có Lỗi Hệ Thống Vui Lòng LH ADMIN")
      return
   } else if (respond.status == false && respond.error == 600) {
      Alerterror("Server Không Hoạt Dộng")
      return
   } else if (respond.status == false && respond.error == 800) {
      Alerterror("Tài Khoản Của Bạn Đã Bị Khóa")
      return
   }
}

export default handle_error