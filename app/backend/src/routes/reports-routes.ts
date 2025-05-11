import express, { RequestHandler } from 'express';
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
router.get('/', handleGetAllReports as RequestHandler);
router.get('/:reportId', handleGetReportById as RequestHandler);
router.get('/member/:memberId', handleGetReportsByMemberId as RequestHandler);
router.get('/location/:locationId', handleGetReportsByLocationId as RequestHandler);
router.get('/status/:status', handleGetReportsByStatus as RequestHandler);
router.post('/', handleCreateReport as RequestHandler);
router.patch('/:reportId', handleUpdateReport as RequestHandler);
router.patch('/:reportId/status', handleUpdateReportStatus as RequestHandler);
router.delete('/:reportId', handleDeleteReport as RequestHandler);

export default router;