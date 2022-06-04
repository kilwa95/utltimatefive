import UserPage from "../views/UserPage";
import MatchPage from "../views/MatchPage";
import TeamPage from "../views/TeamPage";
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
    provider: MatchProvider,
    component: MatchPage,
  },
  {
    path: "/admin/teams",
    name: "teams",
    provider: MatchProvider,
    component: TeamPage,
  },
];

export default routes;
