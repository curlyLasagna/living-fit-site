import {
    List,
    Datagrid,
    TextField,
    NumberField,
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
    NumberInput,
    DateInput,
    ReferenceField,
} from 'react-admin';

const FeesFilter = (props: any) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Location" source="locationId" reference="locations">
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

// Create form component
export const FeesCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput label="Location" source="locationId" reference="locations">
                <SelectInput optionText="name" validate={required()} />
            </ReferenceInput>
            <NumberInput 
                source="baseMonthlyFee" 
                label="Base Monthly Fee" 
                validate={required()} 
                min={0}
                step={0.01}
            />
            <NumberInput 
                source="joiningFee" 
                label="Joining Fee" 
                validate={required()} 
                min={0}
                step={0.01}
            />
            <NumberInput 
                source="annualFee" 
                label="Annual Fee" 
                validate={required()} 
                min={0}
                step={0.01}
            />
            <DateInput 
                source="effectiveDate" 
                label="Effective Date" 
                validate={required()} 
            />
        </SimpleForm>
    </Create>
);

// Edit form component
export const FeesEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput label="Location" source="locationId" reference="locations">
                <SelectInput optionText="name" validate={required()} />
            </ReferenceInput>
            <NumberInput 
                source="baseMonthlyFee" 
                label="Base Monthly Fee" 
                validate={required()} 
                min={0}
                step={0.01}
            />
            <NumberInput 
                source="joiningFee" 
                label="Joining Fee" 
                validate={required()} 
                min={0}
                step={0.01}
            />
            <NumberInput 
                source="annualFee" 
                label="Annual Fee" 
                validate={required()} 
                min={0}
                step={0.01}
            />
            <DateInput 
                source="effectiveDate" 
                label="Effective Date" 
                validate={required()} 
            />
        </SimpleForm>
    </Edit>
);

export const FeesList = () => (
    <List filters={<FeesFilter />}>
        <Datagrid>
            <TextField source="feeId" label="ID" />
            <ReferenceField 
                label="Location" 
                source="locationId" 
                reference="locations"
                link="show"
            >
                <TextField source="name" />
            </ReferenceField>
            <NumberField 
                source="baseMonthlyFee" 
                label="Base Monthly Fee"
                options={{ 
                    style: 'currency',
                    currency: 'USD'
                }}
            />
            <NumberField 
                source="joiningFee" 
                label="Joining Fee"
                options={{ 
                    style: 'currency',
                    currency: 'USD'
                }}
            />
            <NumberField 
                source="annualFee" 
                label="Annual Fee"
                options={{ 
                    style: 'currency',
                    currency: 'USD'
                }}
            />
            <DateField source="effectiveDate" label="Effective Date" />
            <EditButton />
            <DeleteButton mutationMode="pessimistic" />
        </Datagrid>
    </List>
);