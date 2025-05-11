import { Title } from 'react-admin';
import { Card, CardContent, Typography } from '@mui/material';

export const Dashboard = () => (
    <Card>
        <Title title="Welcome to Living Fit Admin" />
        <CardContent>
            <Typography variant="h5" component="h2">
                Welcome to Living Fit Admin Dashboard
            </Typography>
            <Typography variant="body2" component="p">
                Use the sidebar to navigate through different sections.
            </Typography>
        </CardContent>
    </Card>
);
