import {
    List,
    Datagrid,
    TextField,
    EmailField,
    DateField,
    Filter,
    TextInput,
    ReferenceInput,
    SelectInput,
    Create,
    SimpleForm,
    Edit,
    EditButton,
    DeleteButton,
    required,
} from 'react-admin';

// Custom field to handle null values
const NullableTextField = (props: any) => (
    <TextField 
        {...props} 
        render={(record: any) => record[props.source] || '-'} 
    />
);

const UserFilter = (props: any) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Location" source="locationId" reference="locations">
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

// Create form component
export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="fname" label="First Name" validate={required()} />
            <TextInput source="lname" label="Last Name" validate={required()} />
            <TextInput source="email" type="email" validate={required()} />
            <TextInput source="phone" />
            <TextInput source="address" />
            <ReferenceInput label="Location" source="locationId" reference="locations">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

// Edit form component
export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="fname" label="First Name" validate={required()} />
            <TextInput source="lname" label="Last Name" validate={required()} />
            <TextInput source="email" type="email" validate={required()} />
            <TextInput source="phone" />
            <TextInput source="address" />
            <ReferenceInput label="Location" source="locationId" reference="locations">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const UserList = () => (
    <List filters={<UserFilter />}>
        <Datagrid>
            <TextField source="memberId" label="ID" />
            <NullableTextField source="fname" label="First Name" />
            <NullableTextField source="lname" label="Last Name" />
            <EmailField source="email" />
            <NullableTextField source="phone" />
            <NullableTextField source="joinDate" />
            <NullableTextField source="membershipStatus" />
            <NullableTextField source="locationId" label="Location ID" />
            <NullableTextField source="address" />
            <EditButton />
            <DeleteButton mutationMode="pessimistic" />
        </Datagrid>
    </List>
);
