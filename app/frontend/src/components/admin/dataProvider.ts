import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const httpClient = (url: string, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    // Add your auth token here when ready
    // options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
};

// Custom data provider to match your API structure
const dataProvider = {
    ...simpleRestProvider('http://localhost:3000/api', httpClient),
    
    // Override getList to use the correct endpoint for users
    getList: async (resource: string, params: any) => {
        if (resource === 'users') {
            const { json } = await httpClient('http://localhost:3000/api/user/all');
            return {
                data: json.map((item: any) => ({
                    ...item,
                    id: item.memberId
                })),
                total: json.length,
            };
        }
        if (resource === 'reports') {
            const { json } = await httpClient('http://localhost:3000/api/reports');
            return {
                data: json.map((item: any) => ({
                    ...item,
                    id: item.reportId
                })),
                total: json.length,
            };
        }
        if (resource === 'locations') {
            const { json } = await httpClient('http://localhost:3000/api/locations');
            return {
                data: json.map((item: any) => ({
                    ...item,
                    id: item.locationId
                })),
                total: json.length,
            };
        }
        // For other resources, use the default implementation
        return simpleRestProvider('http://localhost:3000/api', httpClient).getList(resource, params);
    },

    create: async (resource: string, params: any) => {
        if (resource === 'locations') {
            const { json } = await httpClient('http://localhost:3000/api/locations', {
                method: 'POST',
                body: JSON.stringify(params.data),
            });
            return {
                data: { ...json, id: json.locationId },
            };
        }
        return simpleRestProvider('http://localhost:3000/api', httpClient).create(resource, params);
    },

    update: async (resource: string, params: any) => {
        if (resource === 'locations') {
            const { json } = await httpClient(`http://localhost:3000/api/locations/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(params.data),
            });
            return {
                data: { ...json, id: json.locationId },
            };
        }
        return simpleRestProvider('http://localhost:3000/api', httpClient).update(resource, params);
    },

    delete: async (resource: string, params: any) => {
        if (resource === 'locations') {
            await httpClient(`http://localhost:3000/api/locations/${params.id}`, {
                method: 'DELETE',
            });
            return {
                data: { id: params.id },
            };
        }
        return simpleRestProvider('http://localhost:3000/api', httpClient).delete(resource, params);
    },
};

export { dataProvider };
