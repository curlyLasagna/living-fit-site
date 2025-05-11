import { Admin, Resource } from 'react-admin';
import { dataProvider } from './dataProvider';
import { Dashboard } from './Dashboard';
import { UserList } from './resources/UserList';
import { ReportList } from './resources/ReportList';
import { LocationList } from './resources/LocationList';
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
            <Resource name="locations" list={LocationList} />
        </Admin>
    );
};

export default AdminWrapper;
