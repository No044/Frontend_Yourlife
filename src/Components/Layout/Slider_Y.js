import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faArrowRightToBracket, faChartBar, faChartPie, faHand, faBook, faPeopleRoof, faHandsHoldingChild, faBox, faGlassWater, faUsers, faBars } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Tooltip } from "antd";
import { selectRole, selectPermission } from "../../Redux/UserRedux_Y";
import { Logout } from "../../service/Login_Y.service";
function Slider({ sidebarCollapsed, onToggleSidebar }) {
  const role = useSelector(selectRole)
  const permission = useSelector(selectPermission)
  const navigate = useNavigate()

  const handle_logout = async () => {
    const respond = await Logout()
    if(respond.status == true){
       navigate("auth/login")
    }
  }
  if (role == null && permission == null) {
    navigate("auth/login")
    return
  }
  return (
    <>
      <nav className={`pc-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="navbar-wrapper">
          <div className="m-header">
            <a href="../dashboard/index.html" className="b-brand text-primary">
              <span className="badge bg-brand-color-2 rounded-pill ms-1 theme-version">Your_Life_Fitness</span>
            </a>
          </div>
          <div className="navbar-content">
            <ul className="pc-navbar admin_header_sider">

              <li className="pc-item pc-caption mb-1">
                <label data-i18n="Application"> Hệ thống</label>
                <i className="ph-duotone ph-buildings" />
              </li>
              {
                (permission.find(item => item === "view_system") || role == "admin") && (
                  <li className="pc-item">
                    <NavLink to="/" className="pc-link">
                      <span className="pc-micon">
                        <FontAwesomeIcon icon={faChartBar} />
                      </span>
                      <span className="pc-mtext" data-i18n="Calender">Tổng Quang Hệ Thống</span>
                    </NavLink>
                  </li>
                )
              }

              {
                (permission.find(item => item === "view_customer") || role == "admin") && (
                  <li className="pc-item">
                    <NavLink to="/list_customer" className="pc-link">
                      <span className="pc-micon">
                        <FontAwesomeIcon icon={faUsers} />
                      </span>
                      <span className="pc-mtext" data-i18n="Calender">Danh Sách Khách Hàng</span>
                    </NavLink>
                  </li>
                )
              }

              {
                (permission.find(item => item === "view_package") || role == "admin") && (
                  <li className="pc-item">
                    <NavLink to="/list_package" className="pc-link">
                      <span className="pc-micon">
                        <FontAwesomeIcon icon={faBox} />
                      </span>
                      <span className="pc-mtext" data-i18n="Calender">Danh Sách Gói Tập</span>
                    </NavLink>
                  </li>
                )
              }


              {
                (permission.find(item => item === "view_service") || role == "admin") && (
                  <li className="pc-item">
                    <NavLink to="/list_service" className="pc-link">
                      <span className="pc-micon">
                        <FontAwesomeIcon icon={faGlassWater} />
                      </span>
                      <span className="pc-mtext" data-i18n="Calender">Dịch Vụ Tiện Nghi</span>
                    </NavLink>
                  </li>
                )
              }
              {
                (permission.find(item => item === "view_manager") || role == "admin") && (
                  <li className="pc-item">
                    <NavLink to="/user" className="pc-link">
                      <span className="pc-micon">
                        <FontAwesomeIcon icon={faPeopleRoof} />
                      </span>
                      <span className="pc-mtext" data-i18n="Calender">Quản Lý Nhân Viên</span>
                    </NavLink>
                  </li>
                )
              }
              {
                (permission.find(item => item === "view_manager") || role == "admin") && (
                  <li className="pc-item">
                    <NavLink to="/role" className="pc-link">
                      <span className="pc-micon">
                        <FontAwesomeIcon icon={faHand} />
                      </span>
                      <span className="pc-mtext" data-i18n="Calender">Quản Lý Chức Vụ</span>
                    </NavLink>
                  </li>
                )
              }
              {
                (role == "admin" && <li className="pc-item">
                  <NavLink to="/Permission_Role" className="pc-link">
                    <span className="pc-micon">
                      <FontAwesomeIcon icon={faHandsHoldingChild} />
                    </span>
                    <span className="pc-mtext" data-i18n="Calender">Phân Quyền Chức Vụ</span>
                  </NavLink>
                </li>)
              }
              {
                (permission.find(item => item === "view_chart") || role == "admin") && (
                  <li className="pc-item">
                    <NavLink to="/chart" className="pc-link">
                      <span className="pc-micon">
                        <FontAwesomeIcon icon={faChartPie} />
                      </span>
                      <span className="pc-mtext" data-i18n="Calender">Biểu Đồ Doanh Thu</span>
                    </NavLink>
                  </li>
                )
              }


              {
                (permission.find(item => item === "view_advise") || role == "admin") && (
                  <li className="pc-item">
                    <NavLink to="/history" className="pc-link">
                      <span className="pc-micon">
                        <FontAwesomeIcon icon={faBook} />
                      </span>
                      <span className="pc-mtext" data-i18n="Calender">Lịch Sử Truy Vấn</span>
                    </NavLink>
                  </li>
                )
              }

            </ul>

          </div>

        </div>
      </nav>

      <header className={`pc-header ${sidebarCollapsed ? 'collapsed' : ''}`} >
        <div className="header-wrapper"> {/* [Mobile Media Block] start */}
          <div className="me-auto pc-mob-drp">
            <ul className="list-unstyled">
              {/* ======= Menu collapse Icon ===== */}
              <li className="pc-h-item pc-sidebar-collapse" style={{ width: "100%" }}>
                <a href="#" className="pc-head-link ms-0" id="sidebar-hide" onClick={onToggleSidebar}>
                  <FontAwesomeIcon icon={faBars} />
                </a>
              </li>
              <li className="pc-h-item pc-sidebar-popup">
                <a href="#" className="pc-head-link ms-0" id="mobile-collapse" onClick={onToggleSidebar}>
                  <FontAwesomeIcon icon={faBars} />
                </a>
              </li>
            </ul>
          </div>

          <div className="header_slider" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ marginRight: "20px" }}>
              <Tooltip title="Đổi Mật Khẩu" color="#FA541C">
                <Link to='user/password'> <FontAwesomeIcon icon={faKey} /></Link>
              </Tooltip>

            </div>

            <div>
             <Tooltip title="Đăng Xuất" color="#FA541C">
                  <FontAwesomeIcon  onClick={handle_logout} icon={faArrowRightToBracket} />
              </Tooltip>

             
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
export default Slider