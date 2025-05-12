import { Admin, Resource } from 'react-admin';
import { dataProvider } from './dataProvider';
import { Dashboard } from './Dashboard';
import { UserList } from './resources/UserList';
import { ReportList } from './resources/ReportList';
import { LocationList, LocationCreate, LocationEdit } from './resources/LocationList';
import { FeesList, FeesCreate, FeesEdit } from './resources/FeesList';
import { PaymentList, PaymentCreate, PaymentEdit } from './resources/PaymentList';
import { theme } from './theme';

const AdminWrapper = () => {
    return (
        <Admin 
            dataProvider={dataProvider}
            dashboard={Dashboard}
            theme={theme}
            darkTheme={theme}
        >
            <Resource name="users" list={UserList} />
            <Resource name="reports" list={ReportList} />
            <Resource 
                name="locations" 
                list={LocationList} 
                create={LocationCreate}
                edit={LocationEdit}
            />
            <Resource 
                name="fees" 
                list={FeesList} 
                create={FeesCreate}
                edit={FeesEdit}
            />
            <Resource 
                name="payments" 
                list={PaymentList} 
                create={PaymentCreate}
                edit={PaymentEdit}
            />
        </Admin>
    );
};

export default AdminWrapper;
