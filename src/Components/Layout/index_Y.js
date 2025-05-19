import { Outlet } from "react-router-dom"
import Slider from "../Layout/Slider_Y"
import { useState } from "react"
import "../../Styles/Admin/Layout/style.css"
import "../../Styles/Admin/Layout/style-preset.css"
import "../../Styles/Admin/Layout/style_1.css"
import "../../Styles/Admin/Layout/style_additional.css"
import 'bootstrap/dist/css/bootstrap.min.css';

function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Toggle Sidebar
  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  }

  return (
    <div>
      <Slider 
        sidebarCollapsed={sidebarCollapsed} 
        onToggleSidebar={handleToggleSidebar} 
      />
      <div className={`pc-container ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="pc-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout;
