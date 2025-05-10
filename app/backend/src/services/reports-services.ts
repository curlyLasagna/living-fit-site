import { db } from '../utils/db';
import { reports, type NewReport, type Report } from '../schema';
import { eq } from 'drizzle-orm';

export const getAllReports = async (): Promise<Report[]> => {
    return await db.select().from(reports);
};

export const getReportById = async (reportId: number): Promise<Report | null> => {
    const result = await db.select().from(reports).where(eq(reports.reportId, reportId)).limit(1);
    return result.length ? result[0] : null;
};

export const getReportsByMemberId = async (memberId: number): Promise<Report[]> => {
    return await db.select().from(reports).where(eq(reports.memberId, memberId));
};

export const getReportsByLocationId = async (locationId: number): Promise<Report[]> => {
    return await db.select().from(reports).where(eq(reports.locationId, locationId));
};

export const getReportsByStatus = async (status: 'open' | 'in_progress' | 'closed'): Promise<Report[]> => {
    return await db.select().from(reports).where(eq(reports.status, status));
};

export const createReport = async (data: Omit<NewReport, 'submissionDate'>): Promise<Report> => {
    const reportData: NewReport = {
        ...data,
        submissionDate: new Date()
    };

    const result = await db.insert(reports).values(reportData).returning();
    return result[0];
};

export const updateReport = async (reportId: number, data: Partial<Omit<NewReport, 'reportId'>>): Promise<Report | null> => {
    const result = await db.update(reports)
        .set(data)
        .where(eq(reports.reportId, reportId))
        .returning();
    return result.length ? result[0] : null;
};

export const updateReportStatus = async (
    reportId: number,
    status: 'open' | 'in_progress' | 'closed',
    resolutionDate?: Date
): Promise<Report | null> => {
    const updateData: Partial<Report> = { status };

    // If status is 'closed', add a resolution date if not provided
    if (status === 'closed') {
        updateData.resolutionDate = resolutionDate || new Date();
    }

    const result = await db.update(reports)
        .set(updateData)
        .where(eq(reports.reportId, reportId))
        .returning();
    return result.length ? result[0] : null;
};

export const deleteReport = async (reportId: number): Promise<boolean> => {
    const result = await db.delete(reports).where(eq(reports.reportId, reportId)).returning();
    return result.length > 0;
};