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
import Permission_Role from "../pages/Role/Permission_Role_Y"
import List_Service from "../pages/Service/List_Service_Y"
import Add_Service from "../pages/Service/Add_Service_Y"
import Edit_service from "../pages/Service/Edit_service_Y"
import Detailsvctm_Y from "../pages/Service/detailsvctm_Y"
import Detailpkctm_Y from "../pages/Package/detailpkctm_Y"
import List_User_Y from "../pages/user/List_User_Y"
import List_Role_Y from "../pages/Role/List_Role_Y"
import Add_role from "../pages/Role/Add_Role_Y"
import Edit_role from "../pages/Role/Edit_Role_Y"
import Add_user from "../pages/user/Add_user_Y"
import List_HS_Y from "../pages/History/List_HS_Y"
import List_Chart from "../pages/chart/List_chart_Y"
import Page404_Y from "../pages/Overview/404_Y"
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
                path: "add/:id",
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
            path : "/user",
            children : [
              {
                index : true,
                element : <List_User_Y/>
              },
              {
                path : "add",
                element : <Add_user/>
              }
            ]
          },{
            path : "/role",
            children : [
              {
                index : true,
                element : <List_Role_Y/>
              },
              {
                path : "add",
                element : <Add_role/>
              },
              {
                path : "edit/:id",
                element : <Edit_role/>
              }
            ]
          },
          {
            path : "/Permission_Role",
            children : [
              {
                index : true,
                element : <Permission_Role/>
              }
            ]
          },
          {
            path : "/chart",
            children : [
              {
                index : true,
                element : <List_Chart/>
              }
            ]
          },
          {
            path : "/history",
            children : [
              {
                index : true,
                element : <List_HS_Y/>
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
  },
  {
    path : "*",
    element : <Page404_Y />
  }
]
function Allrouter() {
  return useRoutes(routers);
}

export default Allrouter