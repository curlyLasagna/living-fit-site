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
    ReferenceField,
} from 'react-admin';

// Custom field to handle null values
const NullableTextField = (props: any) => {
    const { record, source } = props;
    const value = record?.[source] || '-';
    return <TextField {...props} record={{ ...record, [source]: value }} />;
};

const UserFilter = (props: any) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Location" source="locationId" reference="locations">
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

// Create form component
const UserCreate = () => (
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
const UserEdit = () => (
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

const UserList = () => (
    <List filters={<UserFilter />}>
        <Datagrid>
            <TextField source="id" label="ID" />
            <TextField source="fname" label="First Name" />
            <TextField source="lname" label="Last Name" />
            <EmailField source="email" />
            <TextField source="phone" />
            <DateField source="joinDate" />
            <TextField source="membershipStatus" />
            <ReferenceField 
                label="Location" 
                source="locationId" 
                reference="locations"
                link={false}
            >
                <TextField source="name" />
            </ReferenceField>
            <TextField source="address" />
            <EditButton />
            <DeleteButton mutationMode="pessimistic" />
        </Datagrid>
    </List>
);

export { UserList, UserCreate, UserEdit };
