import { Title, useGetList, useGetOne } from 'react-admin';
import { 
    Card, 
    CardContent, 
    Typography, 
    Grid, 
    Box,
    Stack
} from '@mui/material';
import { formatCurrency } from './utils/formatters';

// Fee Statistics Card Component
const FeeStatistics = () => {
    const { data: fees, isLoading } = useGetList('fees', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'effectiveDate', order: 'DESC' },
    });

    if (isLoading) return <Typography>Loading...</Typography>;

    const calculateAverage = (field: string) => {
        if (!fees || fees.length === 0) return 0;
        const sum = fees.reduce((acc: number, fee: any) => acc + (Number(fee[field]) || 0), 0);
        return sum / fees.length;
    };

    const stats = {
        avgMonthlyFee: calculateAverage('baseMonthlyFee'),
        avgJoiningFee: calculateAverage('joiningFee'),
        avgAnnualFee: calculateAverage('annualFee'),
        totalFees: fees?.length || 0,
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Fee Statistics
                </Typography>
                <Grid container spacing={2}>
                    <Grid xs={6} md={3}>
                        <Box>
                            <Typography variant="subtitle2" color="textSecondary">
                                Average Monthly Fee
                            </Typography>
                            <Typography variant="h6">
                                {formatCurrency(stats.avgMonthlyFee)}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={6} md={3}>
                        <Box>
                            <Typography variant="subtitle2" color="textSecondary">
                                Average Joining Fee
                            </Typography>
                            <Typography variant="h6">
                                {formatCurrency(stats.avgJoiningFee)}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={6} md={3}>
                        <Box>
                            <Typography variant="subtitle2" color="textSecondary">
                                Average Annual Fee
                            </Typography>
                            <Typography variant="h6">
                                {formatCurrency(stats.avgAnnualFee)}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={6} md={3}>
                        <Box>
                            <Typography variant="subtitle2" color="textSecondary">
                                Total Fee Records
                            </Typography>
                            <Typography variant="h6">
                                {stats.totalFees}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

// Location Name Component
const LocationName = ({ locationId }: { locationId: number }) => {
    const { data: location, isLoading } = useGetOne('locations', { id: locationId });
    if (isLoading) return <Typography>Loading...</Typography>;
    return <Typography>{location?.name || 'Unknown Location'}</Typography>;
};

// Recent Fees Card Component
const RecentFees = () => {
    const { data: fees, isLoading } = useGetList('fees', {
        pagination: { page: 1, perPage: 5 },
        sort: { field: 'effectiveDate', order: 'DESC' },
    });

    if (isLoading) return <Typography>Loading...</Typography>;

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Recent Fee Updates
                </Typography>
                <Stack spacing={2}>
                    {fees?.map((fee: any) => (
                        <Box key={fee.id} sx={{ p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                            <Typography variant="subtitle1">
                                <LocationName locationId={fee.locationId} />
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Monthly: {formatCurrency(fee.baseMonthlyFee)} | 
                                Joining: {formatCurrency(fee.joiningFee)} | 
                                Annual: {formatCurrency(fee.annualFee)}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                Effective: {new Date(fee.effectiveDate).toLocaleDateString()}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
};

// Main Dashboard Component
export const Dashboard = () => (
    <Box sx={{ p: 2 }}>
        <Title title="Welcome to Living Fit Admin" />
        <Stack spacing={2}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                        Welcome to Living Fit Admin Dashboard
                    </Typography>
                    <Typography variant="body2" component="p">
                        Use the sidebar to navigate through different sections.
                    </Typography>
                </CardContent>
            </Card>
            <FeeStatistics />
            <RecentFees />
        </Stack>
    </Box>
);
