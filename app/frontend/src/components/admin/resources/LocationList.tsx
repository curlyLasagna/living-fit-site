import {
    List,
    Datagrid,
    TextField,
    Filter,
    TextInput,
} from 'react-admin';

const LocationFilter = (props: any) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const LocationList = () => (
    <List filters={<LocationFilter />}>
        <Datagrid>
            <TextField source="locationId" label="ID" />
            <TextField source="name" label="Location Name" />
            <TextField source="address" label="Address" />
        </Datagrid>
    </List>
);
