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
} from 'react-admin';

const UserFilter = (props: any) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Location" source="locationId" reference="locations">
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const UserList = () => (
    <List filters={<UserFilter />}>
        <Datagrid>
            <TextField source="memberId" />
            <TextField source="fname" label="First Name" />
            <TextField source="lname" label="Last Name" />
            <EmailField source="email" />
            <TextField source="phone" />
            <DateField source="joinDate" />
            <TextField source="membershipStatus" />
        </Datagrid>
    </List>
);
