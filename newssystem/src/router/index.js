import { Navigate } from "react-router-dom";
import Login from "../pages/Login";
import NewsSandBox from "../pages/NewsSandBox";
import NotFound from "../pages/NotFound";
const router = 
   [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <NewsSandBox />,
      children: [
        {
          path:"/",
          element:<Navigate to="/"></Navigate>
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    
  ];


export default router;
