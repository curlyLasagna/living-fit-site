import type { Router } from 'express';
import { createRouter } from '../utils/create';
import userRoutes from './user-routes';
import locationRoutes from './locations-routes';
import feesRoutes from './fees-routes';
import paymentRoutes from './payment-routes';
import qrRoutes from './qr-codes-routes';
import memberModificationsRoutes from './member-modifications-routes';
import membershipChangesRoutes from './membership-changes-routes';

export default createRouter((router: Router) => {
    router.use('/user', userRoutes);
    router.use('/locations', locationRoutes);
    router.use('/fees', feesRoutes);
    router.use('/payments', paymentRoutes);
    router.use('/qr', qrRoutes);
    router.use('/member-modifications', memberModificationsRoutes);
    router.use('/membership-changes', membershipChangesRoutes);
});