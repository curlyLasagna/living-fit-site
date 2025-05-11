import express from 'express';
import {
    handleGetAllReports,
    handleGetReportById,
    handleGetReportsByMemberId,
    handleGetReportsByLocationId,
    handleGetReportsByStatus,
    handleCreateReport,
    handleUpdateReport,
    handleUpdateReportStatus,
    handleDeleteReport
} from '../controllers/reports-controller';

const router = express.Router();

// Apply authentication middleware to all routes

// Reports routes
router.get('/', handleGetAllReports);
router.get('/:reportId', handleGetReportById);
router.get('/member/:memberId', handleGetReportsByMemberId);
router.get('/location/:locationId', handleGetReportsByLocationId);
router.get('/status/:status', handleGetReportsByStatus);
router.post('/', handleCreateReport);
router.patch('/:reportId', handleUpdateReport);
router.patch('/:reportId/status', handleUpdateReportStatus);
router.delete('/:reportId', handleDeleteReport);

export default router;