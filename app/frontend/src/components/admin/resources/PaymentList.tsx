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
    ReferenceField,
    NumberField,
} from 'react-admin';

const PaymentFilter = (props: any) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Member" source="memberId" reference="users">
            <SelectInput optionText="email" />
        </ReferenceInput>
    </Filter>
);

// Create form component
const PaymentCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput label="Member" source="memberId" reference="users">
                <SelectInput optionText="email" validate={required()} />
            </ReferenceInput>
            <TextInput 
                source="cardHolderName" 
                label="Card Holder Name" 
                validate={required()} 
            />
            <TextInput 
                source="cardNumber" 
                label="Card Number" 
                validate={required()} 
            />
            <TextInput 
                source="expirationMonth" 
                label="Expiration Month" 
                validate={required()} 
            />
            <TextInput 
                source="expirationYear" 
                label="Expiration Year" 
                validate={required()} 
            />
            <TextInput 
                source="billingAddress" 
                label="Billing Address" 
                validate={required()} 
            />
        </SimpleForm>
    </Create>
);

// Edit form component
const PaymentEdit = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput label="Member" source="memberId" reference="users">
                <SelectInput optionText="email" validate={required()} />
            </ReferenceInput>
            <TextInput 
                source="cardHolderName" 
                label="Card Holder Name" 
                validate={required()} 
            />
            <TextInput 
                source="cardNumber" 
                label="Card Number" 
                validate={required()} 
            />
            <TextInput 
                source="expirationMonth" 
                label="Expiration Month" 
                validate={required()} 
            />
            <TextInput 
                source="expirationYear" 
                label="Expiration Year" 
                validate={required()} 
            />
            <TextInput 
                source="billingAddress" 
                label="Billing Address" 
                validate={required()} 
            />
        </SimpleForm>
    </Edit>
);

// Custom field to mask card number
const MaskedCardNumber = (props: any) => {
    const { record } = props;
    if (!record?.cardNumber) return null;
    const maskedNumber = `****-****-****-${record.cardNumber.slice(-4)}`;
    return <TextField {...props} record={{ ...record, cardNumber: maskedNumber }} />;
};

const PaymentList = () => (
    <List filters={<PaymentFilter />}>
        <Datagrid>
            <TextField source="paymentInfoId" label="ID" />
            <ReferenceField 
                label="Member" 
                source="memberId" 
                reference="users"
                link="show"
            >
                <TextField source="email" />
            </ReferenceField>
            <TextField source="cardHolderName" label="Card Holder Name" />
            <MaskedCardNumber source="cardNumber" label="Card Number" />
            <TextField 
                source="expirationMonth" 
                label="Expiration Month" 
            />
            <TextField 
                source="expirationYear" 
                label="Expiration Year" 
            />
            <TextField source="billingAddress" label="Billing Address" />
            <DateField source="createdAt" label="Created At" />
            <DateField source="updatedAt" label="Updated At" />
            <EditButton />
            <DeleteButton mutationMode="pessimistic" />
        </Datagrid>
    </List>
);

export { PaymentList, PaymentCreate, PaymentEdit }; 