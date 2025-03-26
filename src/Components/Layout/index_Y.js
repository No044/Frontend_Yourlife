import { Form, Outlet } from "react-router-dom"
import Slider from "../Layout/Slider_Y"
import "../../Styles/Admin/Layout/style.css"
import "../../Styles/Admin/Layout/style-preset.css"
import "../../Styles/Admin/Layout/style_1.css"
import "../../Styles/Admin/Layout/style_additional.css"
import 'bootstrap/dist/css/bootstrap.min.css';

function Layout(){
  return (
    <div>
    <Slider/>
    <div className="pc-container">
    <div className="pc-content">
    <Outlet/>

    </div>
  </div>
    </div>
  )
}

export default Layout