import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume, faTv, faChartBar, faChartPie, faEnvelopeOpen, faPlus, faPeopleRoof, faHandsHoldingChild, faBox, faGlassWater, faUsers, faBars } from "@fortawesome/free-solid-svg-icons";
import { NavLink,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {  selectRole, selectPermission } from "../../Redux/UserRedux_Y";
function Slider() {
  const role = useSelector(selectRole)
  const permission = useSelector(selectPermission)
  const navigate = useNavigate()

  if(role == null && permission == null){
    navigate("auth/login")
    return
  }
  return (
    <>
      <nav className="pc-sidebar">
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
                    <NavLink to="/list_package" className="pc-link">
                      <span className="pc-micon">
                        <FontAwesomeIcon icon={faPeopleRoof} />
                      </span>
                      <span className="pc-mtext" data-i18n="Calender">Quản Lý Nhân Viên</span>
                    </NavLink>
                  </li>
                )
              }

              {
                (role == "admin" && <li className="pc-item">
                  <NavLink to="/create/role" className="pc-link">
                    <span className="pc-micon">
                      <FontAwesomeIcon icon={faHandsHoldingChild} />
                    </span>
                    <span className="pc-mtext" data-i18n="Calender">Phân Quyền Thành Viên</span>
                  </NavLink>
                </li>)
              }


              {
                (permission.find(item => item === "view_noticed") || role == "admin") && (
                  <li className="pc-item">
                    <NavLink to="/list_package" className="pc-link">
                      <span className="pc-micon">
                        <FontAwesomeIcon icon={faEnvelopeOpen} />
                      </span>
                      <span className="pc-mtext" data-i18n="Calender">Dịch Vụ Thông Báo</span>
                    </NavLink>
                  </li>
                )
              }


              {
                (permission.find(item => item === "view_chart") || role == "admin") && (
                  <li className="pc-item">
                    <NavLink to="/list_package" className="pc-link">
                      <span className="pc-micon">
                        <FontAwesomeIcon icon={faChartPie} />
                      </span>
                      <span className="pc-mtext" data-i18n="Calender">Biểu Đồ Doanh Thu</span>
                    </NavLink>
                  </li>
                )
              }

              {
                (permission.find(item => item === "view_website") || role == "admin") && (
                  <li className="pc-item">
                    <NavLink to="/list_package" className="pc-link">
                      <span className="pc-micon">
                        <FontAwesomeIcon icon={faTv} />
                      </span>
                      <span className="pc-mtext" data-i18n="Calender">Website Hiển Thị</span>
                    </NavLink>
                  </li>
                )
              }
              {
                (permission.find(item => item === "view_advise") || role == "admin") && (
                  <li className="pc-item">
                    <NavLink to="/list_package" className="pc-link">
                      <span className="pc-micon">
                        <FontAwesomeIcon icon={faPhoneVolume} />
                      </span>
                      <span className="pc-mtext" data-i18n="Calender">Tư Vấn Khách Hàng</span>
                    </NavLink>
                  </li>
                )
              }

            </ul>

          </div>

        </div>
      </nav>
      <header className="pc-header">
        <div className="header-wrapper"> {/* [Mobile Media Block] start */}
          <div className="me-auto pc-mob-drp">
            <ul className="list-unstyled">
              {/* ======= Menu collapse Icon ===== */}
              <li className="pc-h-item pc-sidebar-collapse">
                <a href="#" className="pc-head-link ms-0" id="sidebar-hide">
                  <FontAwesomeIcon icon={faBars} />

                </a>
              </li>
              <li className="pc-h-item pc-sidebar-popup">
                <a href="#" className="pc-head-link ms-0" id="mobile-collapse">
                  <FontAwesomeIcon icon={faBars} />

                </a>
              </li>


            </ul>
          </div>
          {/* [Mobile Media Block end] */}
          <div className="ms-auto">
            <ul className="list-unstyled">
              <li className="dropdown pc-h-item d-none d-md-inline-flex">
                <a className="pc-head-link dropdown-toggle arrow-none me-0" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                  <i className="ph-duotone ph-circles-four" />
                </a>
                <div className="dropdown-menu dropdown-qta dropdown-menu-end pc-h-dropdown">
                  <div className="overflow-hidden">
                    <div className="qta-links m-n1">
                      <a href="#!" className="dropdown-item">
                        <i className="ph-duotone ph-shopping-cart" />
                        <span>E-commerce</span>
                      </a>
                      <a href="#!" className="dropdown-item">
                        <i className="ph-duotone ph-lifebuoy" />
                        <span>Helpdesk</span>
                      </a>
                      <a href="#!" className="dropdown-item">
                        <i className="ph-duotone ph-scroll" />
                        <span>Invoice</span>
                      </a>
                      <a href="#!" className="dropdown-item">
                        <i className="ph-duotone ph-books" />
                        <span>Online Courses</span>
                      </a>
                      <a href="#!" className="dropdown-item">
                        <i className="ph-duotone ph-envelope-open" />
                        <span>Mail</span>
                      </a>
                      <a href="#!" className="dropdown-item">
                        <i className="ph-duotone ph-identification-badge" />
                        <span>Membership</span>
                      </a>
                      <a href="#!" className="dropdown-item">
                        <i className="ph-duotone ph-chats-circle" />
                        <span>Chat</span>
                      </a>
                      <a href="#!" className="dropdown-item">
                        <i className="ph-duotone ph-currency-circle-dollar" />
                        <span>Plans</span>
                      </a>
                      <a href="#!" className="dropdown-item">
                        <i className="ph-duotone ph-user-circle" />
                        <span>Users</span>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li className="dropdown pc-h-item d-none d-md-inline-flex">
                <a className="pc-head-link dropdown-toggle arrow-none me-0" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                  <i className="ph-duotone ph-sun-dim" />
                </a>
                <div className="dropdown-menu dropdown-menu-end pc-h-dropdown">
                  <a href="#!" className="dropdown-item" onclick="layout_change('dark')">
                    <i className="ph-duotone ph-moon" />
                    <span>Dark</span>
                  </a>
                  <a href="#!" className="dropdown-item" onclick="layout_change('light')">
                    <i className="ph-duotone ph-sun-dim" />
                    <span>Light</span>
                  </a>
                  <a href="#!" className="dropdown-item" onclick="layout_change_default()">
                    <i className="ph-duotone ph-cpu" />
                    <span>Default</span>
                  </a>
                </div>
              </li>
              <li className="dropdown pc-h-item d-none d-md-inline-flex">
                <a className="pc-head-link head-link-primary dropdown-toggle arrow-none me-0" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                  <i className="ph-duotone ph-translate" />
                </a>
                <div className="dropdown-menu dropdown-menu-end pc-h-dropdown lng-dropdown">
                  <a href="#!" className="dropdown-item" data-lng="en">
                    <span>
                      English
                      <small>(UK)</small>
                    </span>
                  </a>
                  <a href="#!" className="dropdown-item" data-lng="fr">
                    <span>
                      français
                      <small>(French)</small>
                    </span>
                  </a>
                  <a href="#!" className="dropdown-item" data-lng="ro">
                    <span>
                      Română
                      <small>(Romanian)</small>
                    </span>
                  </a>
                  <a href="#!" className="dropdown-item" data-lng="cn">
                    <span>
                      中国人
                      <small>(Chinese)</small>
                    </span>
                  </a>
                </div>
              </li>
              <li className="pc-h-item">
                <a className="pc-head-link pct-c-btn" href="#" data-bs-toggle="offcanvas" data-bs-target="#offcanvas_pc_layout">
                  <i className="ph-duotone ph-gear-six" />
                </a>
              </li>
              <li className="dropdown pc-h-item">
                <a className="pc-head-link dropdown-toggle arrow-none me-0" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                  <i className="ph-duotone ph-diamonds-four" />
                </a>
                <div className="dropdown-menu dropdown-menu-end pc-h-dropdown">
                  <a href="#!" className="dropdown-item">
                    <i className="ph-duotone ph-user" />
                    <span>My Account</span>
                  </a>
                  <a href="#!" className="dropdown-item">
                    <i className="ph-duotone ph-gear" />
                    <span>Settings</span>
                  </a>
                  <a href="#!" className="dropdown-item">
                    <i className="ph-duotone ph-lifebuoy" />
                    <span>Support</span>
                  </a>
                  <a href="#!" className="dropdown-item">
                    <i className="ph-duotone ph-lock-key" />
                    <span>Lock Screen</span>
                  </a>
                  <a href="#!" className="dropdown-item">
                    <i className="ph-duotone ph-power" />
                    <span>Logout</span>
                  </a>
                </div>
              </li>
              <li className="dropdown pc-h-item">
                <a className="pc-head-link dropdown-toggle arrow-none me-0" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                  <i className="ph-duotone ph-bell" />
                  <span className="badge bg-success pc-h-badge">3</span>
                </a>
                <div className="dropdown-menu dropdown-notification dropdown-menu-end pc-h-dropdown">
                  <div className="dropdown-header d-flex align-items-center justify-content-between">
                    <h5 className="m-0">Notifications</h5>
                    <ul className="list-inline ms-auto mb-0">
                      <li className="list-inline-item">
                        <a href="../application/mail.html" className="avtar avtar-s btn-link-hover-primary">
                          <i className="ti ti-link f-18" />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown-body text-wrap header-notification-scroll position-relative" style={{ maxHeight: 'calc(100vh - 235px)' }}>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p className="text-span">Today</p>
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <img src="images/avatar-2.jpg" alt="user-image" className="user-avtar avtar avtar-s" />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <div className="d-flex">
                              <div className="flex-grow-1 me-3 position-relative">
                                <h6 className="mb-0 text-truncate">Keefe Bond added new tags to 💪 Design system</h6>
                              </div>
                              <div className="flex-shrink-0">
                                <span className="text-sm">2 min ago</span>
                              </div>
                            </div>
                            <p className="position-relative mt-1 mb-2"><br /><span className="text-truncate">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</span></p>
                            <span className="badge bg-light-primary border border-primary me-1 mt-1">web design</span>
                            <span className="badge bg-light-warning border border-warning me-1 mt-1">Dashobard</span>
                            <span className="badge bg-light-success border border-success me-1 mt-1">Design System</span>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <div className="avtar avtar-s bg-light-primary">
                              <i className="ph-duotone ph-chats-teardrop f-18" />
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <div className="d-flex">
                              <div className="flex-grow-1 me-3 position-relative">
                                <h6 className="mb-0 text-truncate">Message</h6>
                              </div>
                              <div className="flex-shrink-0">
                                <span className="text-sm">1 hour ago</span>
                              </div>
                            </div>
                            <p className="position-relative mt-1 mb-2"><br /><span className="text-truncate">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</span></p>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <p className="text-span">Yesterday</p>
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <div className="avtar avtar-s bg-light-danger">
                              <i className="ph-duotone ph-user f-18" />
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <div className="d-flex">
                              <div className="flex-grow-1 me-3 position-relative">
                                <h6 className="mb-0 text-truncate">Challenge invitation</h6>
                              </div>
                              <div className="flex-shrink-0">
                                <span className="text-sm">12 hour ago</span>
                              </div>
                            </div>
                            <p className="position-relative mt-1 mb-2"><br /><span className="text-truncate"><strong> Jonny aber </strong> invites to join the challenge</span></p>
                            <button className="btn btn-sm rounded-pill btn-outline-secondary me-2">Decline</button>
                            <button className="btn btn-sm rounded-pill btn-primary">Accept</button>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <div className="avtar avtar-s bg-light-info">
                              <i className="ph-duotone ph-notebook f-18" />
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <div className="d-flex">
                              <div className="flex-grow-1 me-3 position-relative">
                                <h6 className="mb-0 text-truncate">Forms</h6>
                              </div>
                              <div className="flex-shrink-0">
                                <span className="text-sm">2 hour ago</span>
                              </div>
                            </div>
                            <p className="position-relative mt-1 mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                              dummy text ever since the 1500s.</p>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <img src="images/avatar-2.jpg" alt="user-image" className="user-avtar avtar avtar-s" />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <div className="d-flex">
                              <div className="flex-grow-1 me-3 position-relative">
                                <h6 className="mb-0 text-truncate">Keefe Bond added new tags to 💪 Design system</h6>
                              </div>
                              <div className="flex-shrink-0">
                                <span className="text-sm">2 min ago</span>
                              </div>
                            </div>
                            <p className="position-relative mt-1 mb-2"><br /><span className="text-truncate">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</span></p>
                            <button className="btn btn-sm rounded-pill btn-outline-secondary me-2">Decline</button>
                            <button className="btn btn-sm rounded-pill btn-primary">Accept</button>
                          </div>
                        </div>
                      </li>
                      <li className="list-group-item">
                        <div className="d-flex">
                          <div className="flex-shrink-0">
                            <div className="avtar avtar-s bg-light-success">
                              <i className="ph-duotone ph-shield-checkered f-18" />
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <div className="d-flex">
                              <div className="flex-grow-1 me-3 position-relative">
                                <h6 className="mb-0 text-truncate">Security</h6>
                              </div>
                              <div className="flex-shrink-0">
                                <span className="text-sm">5 hour ago</span>
                              </div>
                            </div>
                            <p className="position-relative mt-1 mb-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                              dummy text ever since the 1500s.</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown-footer">
                    <div className="row g-3">
                      <div className="col-6">
                        <div className="d-grid"><button className="btn btn-primary">Archive all</button></div>
                      </div>
                      <div className="col-6">
                        <div className="d-grid"><button className="btn btn-outline-secondary">Mark all as read</button></div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="dropdown pc-h-item header-user-profile">
                <a className="pc-head-link dropdown-toggle arrow-none me-0" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" data-bs-auto-close="outside" aria-expanded="false">
                  <img src="images/avatar-2.jpg" alt="user-image" className="user-avtar" />
                </a>
                <div className="dropdown-menu dropdown-user-profile dropdown-menu-end pc-h-dropdown">
                  <div className="dropdown-header d-flex align-items-center justify-content-between">
                    <h5 className="m-0">Profile</h5>
                  </div>
                  <div className="dropdown-body">
                    <div className="profile-notification-scroll position-relative" style={{ maxHeight: 'calc(100vh - 225px)' }}>
                      <ul className="list-group list-group-flush w-100">
                        <li className="list-group-item">
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0">
                              <img src="images/avatar-2.jpg" alt="user-image" className="wid-50 rounded-circle" />
                            </div>
                            <div className="flex-grow-1 mx-3">
                              <h5 className="mb-0">Carson Darrin</h5>
                              <a className="link-primary" href="mailto:carson.darrin@company.io">carson.darrin@company.io</a>
                            </div>
                            <span className="badge bg-primary">PRO</span>
                          </div>
                        </li>
                        <li className="list-group-item">
                          <a href="#" className="dropdown-item">
                            <span className="d-flex align-items-center">
                              <i className="ph-duotone ph-key" />
                              <span>Change password</span>
                            </span>
                          </a>
                          <a href="#" className="dropdown-item">
                            <span className="d-flex align-items-center">
                              <i className="ph-duotone ph-envelope-simple" />
                              <span>Recently mail</span>
                            </span>
                            <div className="user-group">
                              <img src="images/avatar-1.jpg" alt="user-image" className="avtar" />
                              <img src="images/avatar-2.jpg" alt="user-image" className="avtar" />
                              <img src="images/avatar-3.jpg" alt="user-image" className="avtar" />
                            </div>
                          </a>
                          <a href="#" className="dropdown-item">
                            <span className="d-flex align-items-center">
                              <i className="ph-duotone ph-calendar-blank" />
                              <span>Schedule meetings</span>
                            </span>
                          </a>
                        </li>
                        <li className="list-group-item">
                          <a href="#" className="dropdown-item">
                            <span className="d-flex align-items-center">
                              <i className="ph-duotone ph-heart" />
                              <span>Favorite</span>
                            </span>
                          </a>
                          <a href="#" className="dropdown-item">
                            <span className="d-flex align-items-center">
                              <i className="ph-duotone ph-arrow-circle-down" />
                              <span>Download</span>
                            </span>
                            <span className="avtar avtar-xs rounded-circle bg-danger text-white">10</span>
                          </a>
                        </li>
                        <li className="list-group-item">
                          <div className="dropdown-item">
                            <span className="d-flex align-items-center">
                              <i className="ph-duotone ph-globe-hemisphere-west" />
                              <span>Languages</span>
                            </span>
                            <span className="flex-shrink-0">
                              <select className="form-select bg-transparent form-select-sm border-0 shadow-none">
                                <option value={1}>English</option>
                                <option value={2}>Spain</option>
                                <option value={3}>Arbic</option>
                              </select>
                            </span>
                          </div>
                          <a href="#" className="dropdown-item">
                            <span className="d-flex align-items-center">
                              <i className="ph-duotone ph-flag" />
                              <span>Country</span>
                            </span>
                          </a>
                        </li>
                        <li className="list-group-item">
                          <a href="#" className="dropdown-item">
                            <span className="d-flex align-items-center">
                              <i className="ph-duotone ph-user-circle" />
                              <span>Edit profile</span>
                            </span>
                          </a>
                          <a href="#" className="dropdown-item">
                            <span className="d-flex align-items-center">
                              <i className="ph-duotone ph-star text-warning" />
                              <span>Upgrade account</span>
                              <span className="badge bg-light-success border border-success ms-2">NEW</span>
                            </span>
                          </a>
                          <a href="#" className="dropdown-item">
                            <span className="d-flex align-items-center">
                              <i className="ph-duotone ph-bell" />
                              <span>Notifications</span>
                            </span>
                          </a>
                          <a href="#" className="dropdown-item">
                            <span className="d-flex align-items-center">
                              <i className="ph-duotone ph-gear-six" />
                              <span>Settings</span>
                            </span>
                          </a>
                        </li>
                        <li className="list-group-item">
                          <a href="#" className="dropdown-item">
                            <span className="d-flex align-items-center">
                              <i className="ph-duotone ph-plus-circle" />
                              <span>Add account</span>
                            </span>
                          </a>
                          <a href="#" className="dropdown-item">
                            <span className="d-flex align-items-center">
                              <i className="ph-duotone ph-power" />
                              <span>Logout</span>
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  )
}
export default Slider