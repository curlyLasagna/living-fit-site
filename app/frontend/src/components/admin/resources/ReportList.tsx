import {
    List,
    Datagrid,
    TextField,
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

const ReportFilter = (props: any) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Location" source="locationId" reference="locations">
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

// Create form component
export const ReportCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput label="Member" source="memberId" reference="users">
                <SelectInput optionText="email" />
            </ReferenceInput>
            <ReferenceInput label="Location" source="locationId" reference="locations">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="issueDescription" label="Description" validate={required()} />
            <TextInput source="status" validate={required()} />
        </SimpleForm>
    </Create>
);

// Edit form component
export const ReportEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput label="Member" source="memberId" reference="users">
                <SelectInput optionText="email" />
            </ReferenceInput>
            <ReferenceInput label="Location" source="locationId" reference="locations">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="issueDescription" label="Description" validate={required()} />
            <TextInput source="status" validate={required()} />
        </SimpleForm>
    </Edit>
);

export const ReportList = () => (
    <List filters={<ReportFilter />}>
        <Datagrid>
            <TextField source="reportId" label="ID" />
            <TextField source="memberId" label="Member ID" />
            <TextField source="locationId" label="Location ID" />
            <TextField source="issueDescription" label="Description" />
            <TextField source="status" />
            <DateField source="submissionDate" />
            <DateField source="resolutionDate" />
            <EditButton />
            <DeleteButton mutationMode="pessimistic" />
        </Datagrid>
    </List>
);
