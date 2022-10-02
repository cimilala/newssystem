import axios from "../api/request";
import Home from "../pages/Home";

import UserList from "../pages/User/UserLists";

import RoleList from "../pages/Right/RoleList";
import RightList from "../pages/Right/RightList";

import CategoryNews from "../pages/News/CategoryNews";
import DraftNews from "../pages/News/DraftNews";
import AddNews from "../pages/News/AddNews";
import PreviewNews from "../pages/News/PreviewNews";
import UpdateNews from "../pages/News/UpdateNews";

import AuditNews from "../pages/Audit/AuditNews";
import AuditList from "../pages/Audit/AuditList";

import Published from "../pages/Publish/Published";
import Unpublished from "../pages/Publish/UnPublished";
import Sunset from "../pages/Publish/SunSet";
export default function AuthRouter() {
  const LocalRouterMap = {
    "/home": <Home/>,
    "/user-manage/list": <UserList />,
    "/right-manage/role/list": <RoleList />,
    "/right-manage/right/list": <RightList />,
    "/news-manage/add": <AddNews />,
    "/news-manage/draft": <DraftNews />,
    "/news-manage/category": <CategoryNews />,
    "/news-manage/preview/:id": <PreviewNews />,
    "/news-manage/update/:id": <UpdateNews />,
    "/audit-manage/audit": <AuditNews />,
    "/audit-manage/list": <AuditList />,
    "/publish-manage/unpublished": <Unpublished />,
    "/publish-manage/published": <Published />,
    "/publish-manage/sunset": <Sunset />,
  };
  if(localStorage.getItem("token")) {
    const {
      role: { rights } ,
    } = JSON.parse(localStorage.getItem("token"));
    let backRouteList;
   return  Promise.all([axios.get("/rights"), axios.get("/children")]).then((value) => {
      backRouteList = [...value[0], ...value[1]];
      const currentRouter = backRouteList.map((item) => {
        if (
          item.pagepermisson &&
          LocalRouterMap[item.key] &&
          rights.includes(item.key)
        ) {
          return {
            path: item.key,
            element: LocalRouterMap[item.key],
          };
        } else {
          return null
        }
      }).filter((item) => {return  item !== null });
      return currentRouter
    });
  }
 else {
  return []
 }

  
 
}
