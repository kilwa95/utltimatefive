import UserPage from '../views/UserPage';

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
]

export default routes;
