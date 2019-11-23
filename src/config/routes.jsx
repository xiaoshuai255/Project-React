import Home from "../components/home";
import Login from "../containers/login";
import NotMatch from "../components/not-match";

//需要权限校验
const authRoutes = [
  {
    path: "/",
    component: Home,
    exact: true
  },

  {
    component: NotMatch //404组件必须是最后一个
  }
];

//不需要权限校验
const noAuthRoutes = [
  {
    path: "/login",
    component: Login,
    exact: true
  }
];

export { authRoutes, noAuthRoutes };
