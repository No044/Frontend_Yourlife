import { useRoutes } from "react-router-dom"
import Layout from "../Components/Layout/index_Y"
import Overview from "../pages/Overview/Overview_Y"
import List_customer from "../pages/List_CTM/List_CTM_Y"
import Add_CTM from "../pages/List_CTM/Add_CTM_Y"
import Edit_CTM from "../pages/List_CTM/Edit_CTM_Y"
import Detail_CTM from "../pages/List_CTM/Detail_CTM_Y"
import List_package from "../pages/Package/List_package_Y"
import Add_Package from "../pages/Package/Add_package_Y"
import Edit_package from "../pages/Package/Edit_package_Y"
import Login_Y from "../pages/auth/Login_Y"
import Authentication from "../Components/Private/Authentication"
import Create_User from "../pages/Role/Create_User_Y"
import Create_Role from "../pages/Role/Role_User_Y"
import List_Service from "../pages/Service/List_Service_Y"
import Add_Service from "../pages/Service/Add_Service_Y"
import Edit_service from "../pages/Service/Edit_service_Y"
import Detailsvctm_Y from "../pages/Service/detailsvctm_Y"
import Detailpkctm_Y from "../pages/Package/detailpkctm_Y"
export const routers = [
  {
    element: <Authentication />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Overview />
          },
          {
            path: "/list_customer",
            children: [
              {
                index: true,
                element: <List_customer />
              },
              {
                path: "add",
                element: <Add_CTM />
              },
              {
                path: "edit/:id",
                element: <Edit_CTM />
              },
              {
                path: "detail/:id",
                element: <Detail_CTM />
              }
            ]
          },
          {
            path: "/list_package",
            children: [
              {
                index: true,
                element: <List_package />
              },
              {
                path: "add",
                element: <Add_Package />
              },
              {
                path: "edit/:id",
                element: <Edit_package />
              },
              {
                path : "detail_pkctm/:id/:idtypes",
                element: <Detailpkctm_Y />
              }
            ]
          } ,
          {
            path : "/list_service",
            children : [
              {
                index : true,
                element : <List_Service/>
              },
              {
                path : "add",
                element : <Add_Service/>
              },
              {
                path : "edit/:id",
                element : <Edit_service/>
              },
              {
                path : "detailsvctm/:id/:idtypes",
                element : <Detailsvctm_Y/>
              }
            ]
          },
          {
            path : "/Create",
            children : [
              {
                path : "User",
                element : <Create_User/>
              },
              {
                path : "role",
                element : <Create_Role/>
              }
            ]
          }
        ]

      }
    ]
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: <Login_Y />
      }
    ]
  }
]
function Allrouter() {
  return useRoutes(routers);
}

export default Allrouter