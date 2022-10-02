import Login from "../pages/Login";
import NewsSandBox from "../pages/NewsSandBox";
import NotFound from "../pages/NotFound";
import AuthRouter from "../util/AuthRouter";
const router = async (first) => {
  const m = await AuthRouter();
  return [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <NewsSandBox />,
      children: [
        ...m,

        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
    
  ];
};

export default router;
