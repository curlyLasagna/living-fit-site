import {
    List,
    Datagrid,
    TextField,
} from 'react-admin';

export const LocationList = () => (
    <List>
        <Datagrid>
            <TextField source="locationId" />
            <TextField source="name" />
            <TextField source="address" />
        </Datagrid>
    </List>
);
