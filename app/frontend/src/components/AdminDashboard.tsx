import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const dataProvider = simpleRestProvider('/api');

export default function AdminDashboard() {
    return (
        <Admin dataProvider={dataProvider}>
            <Resource name="users" />
            <Resource name="reports" />
        </Admin>
    );
}
