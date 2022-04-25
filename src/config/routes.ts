import IRoute from '../interfaces/route';
import {Dashboard} from '../pages/Dashboard';
import {Vehicle} from '../pages/Vehicle';


const routes: IRoute[] = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        exact: true
    },
    {
        path: '/veiculo',
        name: 'Vehicle',
        component: Vehicle,
        exact: true
    },
  
]

export default routes;