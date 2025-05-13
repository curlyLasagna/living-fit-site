import type { Request, Response } from 'express';
import {
    getAllReports,
    getReportById,
    getReportsByMemberId,
    getReportsByLocationId,
    getReportsByStatus,
    createReport,
    updateReport,
    updateReportStatus,
    deleteReport
} from '../services/reports-services';

export const handleGetAllReports = async (req: Request, res: Response) => {
    try {
        const allReports = await getAllReports();
        res.status(200).json(allReports);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving reports', error: error.message });
    }
};

export const handleGetReportById = async (req: Request, res: Response) => {
    try {
        const reportId = Number.parseInt(req.params.reportId);
        const report = await getReportById(reportId);

        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving report', error: error.message });
    }
};

export const handleGetReportsByMemberId = async (req: Request, res: Response) => {
    try {
        const memberId = Number.parseInt(req.params.memberId);
        const memberReports = await getReportsByMemberId(memberId);
        res.status(200).json(memberReports);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving member reports', error: error.message });
    }
};

export const handleGetReportsByLocationId = async (req: Request, res: Response) => {
    try {
        const locationId = Number.parseInt(req.params.locationId);
        const locationReports = await getReportsByLocationId(locationId);
        res.status(200).json(locationReports);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving location reports', error: error.message });
    }
};

export const handleGetReportsByStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.params;
        const validStatuses = ['open', 'in_progress', 'closed'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid report status' });
        }

        const statusReports = await getReportsByStatus(status as any);
        res.status(200).json(statusReports);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving status reports', error: error.message });
    }
};

export const handleCreateReport = async (req: Request, res: Response) => {
    try {
        const { memberId, locationId, issueDescription, status } = req.body;

        const validStatuses = ['open', 'in_progress', 'closed'];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid report status' });
        }

        const newReport = await createReport({
            memberId,
            locationId,
            issueDescription,
            status: status || 'open', // Default to 'open' if not provided
        });

        res.status(201).json(newReport);
    } catch (error) {
        res.status(500).json({ message: 'Error creating report', error: error.message });
    }
};

export const handleUpdateReport = async (req: Request, res: Response) => {
    try {
        const reportId = parseInt(req.params.reportId);
        const { memberId, locationId, issueDescription, status, resolutionDate } = req.body;

        const validStatuses = ['open', 'in_progress', 'closed'];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid report status' });
        }

        const updatedReport = await updateReport(reportId, {
            memberId,
            locationId,
            issueDescription,
            status,
            resolutionDate: resolutionDate ? new Date(resolutionDate).toISOString() : ""
        });

        if (!updatedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.status(200).json(updatedReport);
    } catch (error) {
        res.status(500).json({ message: 'Error updating report', error: error.message });
    }
};

export const handleUpdateReportStatus = async (req: Request, res: Response) => {
    try {
        const reportId = Number.parseInt(req.params.reportId);
        const { status, resolutionDate } = req.body;

        const validStatuses = ['open', 'in_progress', 'closed'];
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid or missing report status' });
        }

        const updatedReport = await updateReportStatus(
            reportId,
            status as any,
            resolutionDate ? new Date(resolutionDate) : undefined
        );

        if (!updatedReport) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.status(200).json(updatedReport);
    } catch (error) {
        res.status(500).json({ message: 'Error updating report status', error: error.message });
    }
};

export const handleDeleteReport = async (req: Request, res: Response) => {
    try {
        const reportId = parseInt(req.params.reportId);
        const deleted = await deleteReport(reportId);

        if (!deleted) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting report', error: error.message });
    }
};