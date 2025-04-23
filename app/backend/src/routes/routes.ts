import type { Router } from 'express';
import { createRouter } from '../utils/create';
import userRoutes from './user-routes';
export default createRouter((router: Router) => {
    // router.use('/admin', adminRoutes);
    router.use('/user', userRoutes);
});
