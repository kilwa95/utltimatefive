import UserPage from "../views/UserPage";
import MatchPage from "../views/MatchPage";
import MatchProvider from "../contexts/MatchContext";
import UserProvider from "../contexts/UserContext";

const routes = [
  {
    path: "/admin",
    name: "admin",
  },
  {
    path: "/admin/users",
    name: "users",
    provider: UserProvider,
    component: UserPage,
  },
  {
    path: "/admin/matchs",
    name: "matches",
    provide: MatchProvider,
    component: MatchPage,
  },
];

export default routes;
