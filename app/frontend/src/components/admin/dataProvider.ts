import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

const httpClient = (url: string, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    return fetchUtils.fetchJson(url, options);
};

// Custom data provider to match your API structure
const dataProvider = {
    ...simpleRestProvider('http://localhost:3000/api', httpClient),
    
    getOne: async (resource: string, params: any) => {
        if (resource === 'users') {
            const { json } = await httpClient(`http://localhost:3000/api/user/${params.id}`);
            return {
                data: {
                    ...json,
                    id: json.memberId,
                    fname: json.fname || '',
                    lname: json.lname || '',
                    email: json.email || '',
                    phone: json.phone || '',
                    address: json.address || '',
                    joinDate: json.joinDate || '',
                    membershipStatus: json.membershipStatus || '',
                    locationId: json.locationId || null
                },
            };
        }
        if (resource === 'reports') {
            const { json } = await httpClient(`http://localhost:3000/api/reports/${params.id}`);
            return {
                data: { ...json, id: json.reportId },
            };
        }
        if (resource === 'locations') {
            const { json } = await httpClient(`http://localhost:3000/api/locations/${params.id}`);
            return {
                data: { ...json, id: json.locationId },
            };
        }
        if (resource === 'fees') {
            const { json } = await httpClient(`http://localhost:3000/api/fees/${params.id}`);
            return {
                data: { ...json, id: json.feeId },
            };
        }
        if (resource === 'payments') {
            const { json } = await httpClient(`http://localhost:3000/api/payment-info/${params.id}`);
            return {
                data: {
                    ...json,
                    id: json.paymentInfoId
                },
            };
        }
        return simpleRestProvider('http://localhost:3000/api', httpClient).getOne(resource, params);
    },

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
        if (resource === 'fees') {
            const { json } = await httpClient('http://localhost:3000/api/fees');
            return {
                data: json.map((item: any) => ({
                    ...item,
                    id: item.feeId
                })),
                total: json.length,
            };
        }
        if (resource === 'payments') {
            try {
                console.log('Fetching payments...');
                const { json } = await httpClient('http://localhost:3000/api/payments');
                console.log('Payments response:', json);
                return {
                    data: json.map((item: any) => ({
                        ...item,
                        id: item.paymentInfoId
                    })),
                    total: json.length,
                };
            } catch (error) {
                console.error('Error fetching payments:', error);
                return {
                    data: [],
                    total: 0,
                };
            }
        }
        return simpleRestProvider('http://localhost:3000/api', httpClient).getList(resource, params);
    },

    create: async (resource: string, params: any) => {
        if (resource === 'users') {
            const { json } = await httpClient('http://localhost:3000/api/user/register', {
                method: 'POST',
                body: JSON.stringify(params.data),
            });
            return {
                data: { ...json, id: json.memberId },
            };
        }
        if (resource === 'reports') {
            const { json } = await httpClient('http://localhost:3000/api/reports', {
                method: 'POST',
                body: JSON.stringify(params.data),
            });
            return {
                data: { ...json, id: json.reportId },
            };
        }
        if (resource === 'locations') {
            const { json } = await httpClient('http://localhost:3000/api/locations', {
                method: 'POST',
                body: JSON.stringify(params.data),
            });
            return {
                data: { ...json, id: json.locationId },
            };
        }
        if (resource === 'fees') {
            const { json } = await httpClient('http://localhost:3000/api/fees', {
                method: 'POST',
                body: JSON.stringify(params.data),
            });
            return {
                data: { ...json, id: json.feeId },
            };
        }
        if (resource === 'payments') {
            const { json } = await httpClient('http://localhost:3000/api/payments', {
                method: 'POST',
                body: JSON.stringify(params.data),
            });
            return {
                data: {
                    ...json,
                    id: json.paymentInfoId
                },
            };
        }
        return simpleRestProvider('http://localhost:3000/api', httpClient).create(resource, params);
    },

    update: async (resource: string, params: any) => {
        if (resource === 'users') {
            const { json } = await httpClient(`http://localhost:3000/api/user/${params.id}`, {
                method: 'PATCH',
                body: JSON.stringify(params.data),
            });
            return {
                data: { ...json, id: json.memberId },
            };
        }
        if (resource === 'reports') {
            const { json } = await httpClient(`http://localhost:3000/api/reports/${params.id}`, {
                method: 'PATCH',
                body: JSON.stringify(params.data),
            });
            return {
                data: { ...json, id: json.reportId },
            };
        }
        if (resource === 'locations') {
            const { json } = await httpClient(`http://localhost:3000/api/locations/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(params.data),
            });
            return {
                data: { ...json, id: json.locationId },
            };
        }
        if (resource === 'fees') {
            const { json } = await httpClient(`http://localhost:3000/api/fees/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(params.data),
            });
            return {
                data: { ...json, id: json.feeId },
            };
        }
        if (resource === 'payments') {
            const { json } = await httpClient(`http://localhost:3000/api/payments/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(params.data),
            });
            return {
                data: {
                    ...json,
                    id: json.paymentInfoId
                },
            };
        }
        return simpleRestProvider('http://localhost:3000/api', httpClient).update(resource, params);
    },

    delete: async (resource: string, params: any) => {
        if (resource === 'users') {
            await httpClient(`http://localhost:3000/api/user/${params.id}`, {
                method: 'DELETE',
            });
            return {
                data: { id: params.id },
            };
        }
        if (resource === 'reports') {
            await httpClient(`http://localhost:3000/api/reports/${params.id}`, {
                method: 'DELETE',
            });
            return {
                data: { id: params.id },
            };
        }
        if (resource === 'locations') {
            await httpClient(`http://localhost:3000/api/locations/${params.id}`, {
                method: 'DELETE',
            });
            return {
                data: { id: params.id },
            };
        }
        if (resource === 'fees') {
            await httpClient(`http://localhost:3000/api/fees/${params.id}`, {
                method: 'DELETE',
            });
            return {
                data: { id: params.id },
            };
        }
        if (resource === 'payments') {
            await httpClient(`http://localhost:3000/api/payments/${params.id}`, {
                method: 'DELETE',
            });
            return {
                data: { id: params.id },
            };
        }
        return simpleRestProvider('http://localhost:3000/api', httpClient).delete(resource, params);
    },

    getMany: async (resource: string, params: any) => {
        if (resource === 'locations') {
            const { json } = await httpClient(`http://localhost:3000/api/locations`);
            const filteredData = json.filter((item: any) => 
                params.ids.includes(item.locationId)
            );
            return {
                data: filteredData.map((item: any) => ({
                    ...item,
                    id: item.locationId
                }))
            };
        }
        return simpleRestProvider('http://localhost:3000/api', httpClient).getMany(resource, params);
    },
};

export { dataProvider };