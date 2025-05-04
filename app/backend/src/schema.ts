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
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';

// Enums
export const membershipStatus = pgEnum('membership_status', ['active', 'terminated', 'cancelled']);
export const qrStatus = pgEnum('qr_status', ['active', 'revoked', 'expired']);
export const reportStatus = pgEnum('report_status', ['open', 'in_progress', 'closed']);
export const familyMemberActions = pgEnum('familyMemberActions', ['remove', 'add']);
export const modificationTypes = pgEnum('modification_types', [
  'personal_info',
  'contact_info',
  'membership_status',
  'payment_info',
  'location_change',
  'password_change',
  'family_member_update'
]);

// LOCATIONS
export const locations = pgTable('locations', {
  locationId: serial('location_id').primaryKey(),
  name: varchar('name', { length: 255 }),
  address: varchar('address', { length: 255 }),
});
export type Location = InferSelectModel<typeof locations>;
export type NewLocation = InferInsertModel<typeof locations>;

// FEES
export const fees = pgTable('fees', {
  feeId: serial('fee_id').primaryKey(),
  locationId: integer('location_id').references(() => locations.locationId),
  baseMonthlyFee: decimal('base_monthly_fee'),
  joiningFee: decimal('joining_fee'),
  annualFee: decimal('annual_fee'),
  effectiveDate: date('effective_date'),
});
export type Fee = InferSelectModel<typeof fees>;
export type NewFee = InferInsertModel<typeof fees>;

// FEE_CHANGES
export const feeChanges = pgTable('fee_changes', {
  feeChangeId: serial('fee_change_id').primaryKey(),
  locationId: integer('location_id').references(() => locations.locationId),
  feeType: varchar('fee_type', { length: 50 }),
  oldValue: decimal('old_value'),
  newValue: decimal('new_value'),
  changeDate: timestamp('change_date').notNull().defaultNow(),
});
export type FeeChange = InferSelectModel<typeof feeChanges>;
export type NewFeeChange = InferInsertModel<typeof feeChanges>;

// MEMBERS
export const members = pgTable("members", {
  memberId: serial("member_id").primaryKey(),
  fname: varchar("fname", { length: 255 }),
  lname: varchar("lname", { length: 255 }),
  address: varchar("address", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  password: varchar("password", { length: 255 }),
  joinDate: date("join_date"),
  membershipStatus: membershipStatus("membership_status"),
  locationId: integer("location_id").references(() => locations.locationId),
});
export type Member = InferSelectModel<typeof members>;
export type NewMember = InferInsertModel<typeof members>;

// FAMILY_MEMBERS
export const familyMembers = pgTable('family_members', {
  familyMemberId: serial('family_member_id').primaryKey(),
  parentMemberId: integer('parent_member_id').references(() => members.memberId),
  locationId: integer('location_id').references(() => locations.locationId),
  name: varchar('name', { length: 255 }),
  qrCodeUuid: uuid('qr_code_uuid'),
});
export type FamilyMember = InferSelectModel<typeof familyMembers>;
export type NewFamilyMember = InferInsertModel<typeof familyMembers>;

// QR_CODES
export const qrCodes = pgTable('qr_codes', {
  qrCodeId: serial('qr_code_id').primaryKey(),
  memberId: integer('member_id').references(() => members.memberId),
  familyMemberId: integer('family_member_id').references(() => familyMembers.familyMemberId),
  locationId: integer('location_id').references(() => locations.locationId),
  status: qrStatus('status'),
  issueDate: date('issue_date').notNull().defaultNow(),
  uuid: uuid('uuid'),
});
export type QrCode = InferSelectModel<typeof qrCodes>;
export type NewQrCode = InferInsertModel<typeof qrCodes>;

// MEMBERSHIP_CHANGES
export const membershipChanges = pgTable('membership_changes', {
  changeId: serial('change_id').primaryKey(),
  memberId: integer('member_id').references(() => members.memberId),
  changeType: varchar('change_type', { length: 50 }),
  oldValue: text('old_value'),
  newValue: text('new_value'),
  changeDate: date('change_date').notNull().defaultNow(),
});
export type MembershipChange = InferSelectModel<typeof membershipChanges>;
export type NewMembershipChange = InferInsertModel<typeof membershipChanges>;

// MODIFICATIONS
export const member_modifications = pgTable('member_modifications', {
  modificationId: serial('modification_id').primaryKey(),
  memberId: integer('member_id').references(() => members.memberId),
  modificationType: modificationTypes('modification_type').notNull(),
  fieldModified: varchar('field_modified', { length: 255 }).notNull(),
  oldValue: text('old_value'),
  newValue: text('new_value'),
  modificationDate: timestamp('modification_date').notNull().defaultNow(),
});

export type MemberModification = InferSelectModel<typeof member_modifications>;
export type NewMemberModification = InferInsertModel<typeof member_modifications>;

// REPORTS
export const reports = pgTable('reports', {
  reportId: serial('report_id').primaryKey(),
  memberId: integer('member_id').references(() => members.memberId),
  locationId: integer('location_id').references(() => locations.locationId),
  issueDescription: text('issue_description'),
  status: reportStatus('status'),
  submissionDate: date('submission_date').notNull().defaultNow(),
  resolutionDate: date('resolution_date'),
});
export type Report = InferSelectModel<typeof reports>;
export type NewReport = InferInsertModel<typeof reports>;

// STAFF
export const staff = pgTable('staff', {
  staffId: serial('staff_id').primaryKey(),
  username: varchar('username', { length: 255 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  accountCreated: timestamp('account_created').defaultNow(),
});
export type Staff = InferSelectModel<typeof staff>;
export type NewStaff = InferInsertModel<typeof staff>;

// STAFF_LOGS
export const staffLogs = pgTable('staff_logs', {
  logId: serial('log_id').primaryKey(),
  staffId: integer('staff_id').references(() => staff.staffId),
  action: varchar('action', { length: 255 }).notNull(),
  timestamp: timestamp('timestamp').defaultNow(),
  details: text('details'),
});
export type StaffLog = InferSelectModel<typeof staffLogs>;
export type NewStaffLog = InferInsertModel<typeof staffLogs>;

// FAMILY_MEMBER_LOGS
export const familyMemberLogs = pgTable('family_member_logs', {
  logId: serial('log_id').primaryKey(),
  familyMemberId: integer('family_member_id').references(() => familyMembers.familyMemberId),
  parentMemberId: integer('parent_member_id').references(() => members.memberId),
  action: familyMemberActions('familyMemberActions').notNull(),
  timestamp: timestamp('timestamp').defaultNow(),
});
export type FamilyMemberLog = InferSelectModel<typeof familyMemberLogs>;
export type NewFamilyMemberLog = InferInsertModel<typeof familyMemberLogs>;

// PAYMENT_INFORMATION
export const paymentInformation = pgTable('payment_information', {
  paymentInfoId: serial('payment_info_id').primaryKey(),
  memberId: integer('member_id').references(() => members.memberId).unique(),
  cardHolderName: varchar('card_holder_name', { length: 255 }).notNull(),
  cardNumberLastFour: varchar('card_number_last_four', { length: 4 }).notNull(),
  expirationMonth: varchar('expiration_month', { length: 2 }).notNull(),
  expirationYear: varchar('expiration_year', { length: 4 }).notNull(),
  billingAddress: varchar('billing_address', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
export type PaymentInformation = InferSelectModel<typeof paymentInformation>;
export type NewPaymentInformation = InferInsertModel<typeof paymentInformation>;