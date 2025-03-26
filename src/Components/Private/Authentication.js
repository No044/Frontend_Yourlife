import { Outlet, Navigate, useNavigate } from "react-router-dom"
import { getCookie ,deleteCookie } from "../helper/cookie"
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../Redux/UserRedux_Y';
import { Authorizes } from "../../service/Login_Y.service";
import { useEffect, useState } from "react";
import {Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import handle_error from "../../Components/Piece/handle_error"

function Authentication() {
    const [loading, setloading] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const fetchData = async () => {
            const respond = await Authorizes();
            if (respond.status === true) {
                dispatch(login({ permission: respond.data.permission, role: respond.data.role }));
            }else{
                navigate("/auth/login")
                return
            }
            setloading(false);         
    }
   useEffect(() => {
        fetchData()
    }, [])
  
    if (loading) {
        return(
          
    <div   style={{
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
      }}>
            <Spin
                indicator={
                    <LoadingOutlined
                        style={{
                            fontSize: 76,
                        }}
                        spin
                    />
                }
            />
     </div>
        )
    }
    return (
        (<Outlet />)
    )
}
export default Authentication