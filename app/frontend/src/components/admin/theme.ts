import { defaultTheme } from 'react-admin';

export const theme = {
    ...defaultTheme,
    palette: {
        primary: {
            main: '#4F46E5', // Indigo color
        },
        secondary: {
            main: '#10B981', // Emerald color
        },
        background: {
            default: '#F3F4F6', // Light gray background
        },
    },
    components: {
        ...defaultTheme.components,
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#4F46E5',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '0.5rem',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '0.75rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                },
            },
        },
    },
};
