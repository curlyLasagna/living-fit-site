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
        </Datagrid>
    </List>
);
