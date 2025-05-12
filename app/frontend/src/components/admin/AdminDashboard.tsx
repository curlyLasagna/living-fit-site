import { Admin, Resource } from 'react-admin';
import { dataProvider } from './dataProvider';
import { Dashboard } from './Dashboard';
import { UserList } from './resources/UserList';
import { ReportList } from './resources/ReportList';
import { LocationList } from './resources/LocationList';
import { FeesList, FeesCreate, FeesEdit } from './resources/FeesList';

const AdminDashboard = () => {
    return (
        <Admin 
            dataProvider={dataProvider}
            dashboard={Dashboard}
        >
            <Resource 
                name="users" 
                list={UserList} 
                options={{ label: 'Users' }}
            />
            <Resource 
                name="reports" 
                list={ReportList} 
                options={{ label: 'Reports' }}
            />
            <Resource 
                name="locations" 
                list={LocationList} 
                options={{ label: 'Locations' }}
            />
            <Resource 
                name="fees" 
                list={FeesList} 
                create={FeesCreate} 
                edit={FeesEdit} 
                options={{ label: 'Fees' }}
            />
        </Admin>
    );
};

export default AdminDashboard;
