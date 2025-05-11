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

export const dataProvider = simpleRestProvider('http://localhost:3000/api', httpClient);
