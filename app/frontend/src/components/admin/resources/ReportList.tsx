import {
    List,
    Datagrid,
    TextField,
    DateField,
    Filter,
    TextInput,
    ReferenceInput,
    SelectInput,
} from 'react-admin';

const ReportFilter = (props: any) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Location" source="locationId" reference="locations">
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
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
        </Datagrid>
    </List>
);
