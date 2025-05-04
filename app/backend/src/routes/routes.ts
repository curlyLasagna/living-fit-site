import type { Router } from 'express';
import { createRouter } from '../utils/create';
import userRoutes from './user-routes';
import locationRoutes from './locations-routes';
export default createRouter((router: Router) => {
    router.use('/user', userRoutes);
    router.use('/locations', locationRoutes)
});