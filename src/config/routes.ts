import IRoute from '../interfaces/route';
import {Dashboard} from '../pages/Dashboard';
import {Vehicle} from '../pages/Vehicle';
import {Client} from '../pages/Client';
import {ExpenseType} from '../pages/ExpenseType';
import {PaymentType} from '../pages/PaymentType';
import {Employee} from '../pages/Employee';


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
    {
        path: '/cliente',
        name: 'Client',
        component: Client,
        exact: true
    },
    {
        path: '/tipo-despesa',
        name: 'ExpenseType',
        component: ExpenseType,
        exact: true
    },
    {
        path: '/forma-pagamento',
        name: 'PaymentType',
        component: PaymentType,
        exact: true
    },
    {
        path: '/funcionario',
        name: 'Employee',
        component: Employee,
        exact: true
    }
]

export default routes;