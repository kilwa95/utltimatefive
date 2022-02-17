import UserPage from '../views/UserPage';
import MatchPage from '../views/MatchPage';

const routes = [
    {
     path: '/admin',
     name: 'admin' 
    },
    {
     path: '/admin/users',
     name: 'users',
     component: UserPage
	},
    {
     path: '/admin/matchs',
     name: 'matches',
     component: MatchPage
	},
]

export default routes;
