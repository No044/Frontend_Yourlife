import 'bootstrap/dist/css/bootstrap.min.css';
import "../../Styles/Admin/Login/style.css"
import logoYourlife from "../../Styles/Admin/Login/image/logo.jpg"
import { PostLogin } from '../../service/Login_Y.service';
import { useNavigate } from 'react-router-dom';
import { Alerterror, AlertSuccess } from '../../Components/Piece/Alert';
import handle_error from '../../Components/Piece/handle_error';
function Login_Y(){
    const navigate = useNavigate()
    const handle_auth_login = async (e) => {
        e.preventDefault();
        const auth = {
           email : e.target[0].value,
           password : e.target[1].value
        }
        const respond = await PostLogin(auth)
        console.log(respond)
        if(respond.status == true && respond.type == "Login"){
          AlertSuccess("Đăng Nhập Thành Công")
          setTimeout(() => {
            navigate("/")
          },1000)
        }else if(respond.status == false && respond.error == 200){
          Alerterror("Sai Tài Khoản Hoặc Mật Khẩu")
        }
        handle_error(respond,navigate)
    }
    return (
      <section className=" fxt-template-layout21">
      {/* Animation Start Here */}
      <div id="particles-js" />
      {/* Animation End Here */}
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-6 col-lg-7 col-sm-12 col-12 fxt-bg-color">
            <div className="fxt-content">
              <div className="fxt-header">
              <img style={{width : "150px",height : "120px"}} src={logoYourlife} alt="Logo" />
              <p style={{marginTop : "16px", color : "#30C2EC"}}>Đăng nhập bằng tài khoản của bạn</p>
              </div>
              <div className="fxt-form">
                <form onSubmit={handle_auth_login} method="POST">
                  <div className="form-group">
                    <div className="fxt-transformY-50 fxt-transition-delay-1">
                      <input type="input" id="input" className="form-control" name="input" placeholder="input" required="required" />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="fxt-transformY-50 fxt-transition-delay-2">
                      <input id="password" type="password" className="form-control" name="password" placeholder="********" required="required" />
                      <i toggle="#password" className="fa fa-fw fa-eye toggle-password field-icon" />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="fxt-transformY-50 fxt-transition-delay-3">
                      <div className="fxt-checkbox-area">
                        <div className="checkbox">
                         
                        </div>
                        <a href="forgot-password-21.html" className="switcher-text">Forgot Password</a>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="fxt-transformY-50 fxt-transition-delay-4">
                      <button type="submit" style={{background : "#30C2EC"}} className="fxt-btn-fill">Log in</button>
                    </div>
                  </div>
                </form>
              </div>
          
      
            </div>
          </div>
        </div>
      </div>
    </section>
    )
}

export default Login_Y