import {
    List,
    Datagrid,
    TextField,
    Filter,
    TextInput,
    Create,
    SimpleForm,
    Edit,
    EditButton,
    DeleteButton,
    required,
} from 'react-admin';

const LocationFilter = (props: any) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

// Create form component
export const LocationCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" label="Location Name" validate={required()} />
            <TextInput source="address" label="Address" validate={required()} />
        </SimpleForm>
    </Create>
);

// Edit form component
export const LocationEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" label="Location Name" validate={required()} />
            <TextInput source="address" label="Address" validate={required()} />
        </SimpleForm>
    </Edit>
);

// List component with create button
export const LocationList = () => (
    <List filters={<LocationFilter />}>
        <Datagrid>
            <TextField source="locationId" label="ID" />
            <TextField source="name" label="Location Name" />
            <TextField source="address" label="Address" />
            <EditButton />
            <DeleteButton mutationMode="pessimistic" />
        </Datagrid>
    </List>
);
