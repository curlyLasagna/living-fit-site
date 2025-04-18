// drizzle-schema.ts
import {
  pgTable,
  serial,
  varchar,
  uuid,
  integer,
  decimal,
  date,
  timestamp,
  pgEnum,
  text,
} from 'drizzle-orm/pg-core';

// Enums
export const membershipStatus = pgEnum('membership_status', ['active', 'terminated', 'cancelled']);
export const qrStatus = pgEnum('qr_status', ['active', 'revoked', 'expired']);
export const reportStatus = pgEnum('report_status', ['open', 'in_progress', 'closed']);
export const familyMemberActions = pgEnum('familyMemberActions', ['remove', 'add']);

// LOCATIONS
export const locations = pgTable('locations', {
  locationId: serial('location_id').primaryKey(),
  name: varchar('name', { length: 255 }),
  address: varchar('address', { length: 255 }),
});

// FEES
export const fees = pgTable('fees', {
  feeId: serial('fee_id').primaryKey(),
  locationId: integer('location_id').references(() => locations.locationId),
  baseMonthlyFee: decimal('base_monthly_fee'),
  joiningFee: decimal('joining_fee'),
  annualFee: decimal('annual_fee'),
  effectiveDate: date('effective_date'),
});

// FEE_CHANGES
export const feeChanges = pgTable('fee_changes', {
  feeChangeId: serial('fee_change_id').primaryKey(),
  locationId: integer('location_id').references(() => locations.locationId),
  feeType: varchar('fee_type', { length: 50 }),
  oldValue: decimal('old_value'),
  newValue: decimal('new_value'),
  changeDate: timestamp('change_date'),
});

// MEMBERS
export const members = pgTable('members', {
  memberId: serial('member_id').primaryKey(),
  name: varchar('name', { length: 255 }),
  address: varchar('address', { length: 255 }),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  passwordHash: varchar('password_hash', { length: 255 }),
  joinDate: date('join_date'),
  membershipStatus: membershipStatus('membership_status'),
  locationId: integer('location_id').references(() => locations.locationId),
});

// FAMILY_MEMBERS
export const familyMembers = pgTable('family_members', {
  familyMemberId: serial('family_member_id').primaryKey(),
  parentMemberId: integer('parent_member_id').references(() => members.memberId),
  locationId: integer('location_id').references(() => locations.locationId),
  name: varchar('name', { length: 255 }),
  qrCodeUuid: uuid('qr_code_uuid'),
});

// QR_CODES
export const qrCodes = pgTable('qr_codes', {
  qrCodeId: serial('qr_code_id').primaryKey(),
  memberId: integer('member_id').references(() => members.memberId),
  familyMemberId: integer('family_member_id').references(() => familyMembers.familyMemberId),
  locationId: integer('location_id').references(() => locations.locationId),
  status: qrStatus('status'),
  issueDate: date('issue_date'),
  uuid: uuid('uuid'),
});

// MEMBERSHIP_CHANGES
export const membershipChanges = pgTable('membership_changes', {
  changeId: serial('change_id').primaryKey(),
  memberId: integer('member_id').references(() => members.memberId),
  changeType: varchar('change_type', { length: 50 }),
  oldValue: text('old_value'),
  newValue: text('new_value'),
  changeDate: date('change_date'),
});

// MODIFICATIONS
export const member_modifications = pgTable('member_modifications', {
  modificationId: serial('modification_id').primaryKey(),
  memberId: integer('member_id').references(() => members.memberId),
  fieldModified: varchar('field_modified', { length: 255 }),
  oldValue: text('old_value'),
  newValue: text('new_value'),
  modificationDate: timestamp('modification_date'),
});

// REPORTS
export const reports = pgTable('reports', {
  reportId: serial('report_id').primaryKey(),
  memberId: integer('member_id').references(() => members.memberId),
  locationId: integer('location_id').references(() => locations.locationId),
  issueDescription: text('issue_description'),
  status: reportStatus('status'),
  submissionDate: date('submission_date'),
  resolutionDate: date('resolution_date'),
});

// STAFF
export const staff = pgTable('staff', {
  staffId: serial('staff_id').primaryKey(),
  username: varchar('username', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  accountCreated: timestamp('account_created').defaultNow(),
});

// STAFF_LOGS
export const staffLogs = pgTable('staff_logs', {
  logId: serial('log_id').primaryKey(),
  staffId: integer('staff_id').references(() => staff.staffId),
  action: varchar('action', { length: 255 }).notNull(),
  timestamp: timestamp('timestamp').defaultNow(),
  details: text('details'),
});

// FAMILY_MEMBER_LOGS
export const familyMemberLogs = pgTable('family_member_logs', {
  logId: serial('log_id').primaryKey(),
  familyMemberId: integer('family_member_id').references(() => familyMembers.familyMemberId),
  parentMemberId: integer('parent_member_id').references(() => members.memberId),
  action: familyMemberActions('familyMemberActions').notNull(),
  timestamp: timestamp('timestamp').defaultNow(),
});