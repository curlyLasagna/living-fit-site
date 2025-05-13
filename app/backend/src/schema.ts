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
export const transactionType = pgEnum('transaction_type', [
  'monthly fee',
  'guest fee',
  'others',
  'joining fee',
  'annual fee',
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
  effectiveDate: date('effective_date').defaultNow(),
});
export type Fee = InferSelectModel<typeof fees>;
export type NewFee = InferInsertModel<typeof fees>;

// MEMBERS
export const members = pgTable("members", {
  memberId: serial("member_id").primaryKey(),
  fname: varchar("fname", { length: 255 }),
  lname: varchar("lname", { length: 255 }),
  address: varchar("address", { length: 255 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  password: varchar("password", { length: 255 }),
  joinDate: date("join_date").defaultNow(),
  membershipStatus: membershipStatus("membership_status"),
  locationId: integer("location_id").references(() => locations.locationId),
});
export type Member = InferSelectModel<typeof members>;
export type NewMember = InferInsertModel<typeof members>;

// FAMILY_MEMBERS
export const familyMembers = pgTable('family_members', {
  familyMemberId: serial('family_member_id').primaryKey(),
  parentMemberId: integer('parent_member_id').references(() => members.memberId, { onDelete: 'cascade' }),
  locationId: integer('location_id').references(() => locations.locationId),
  name: varchar('name', { length: 255 }),
  qrCodeUuid: uuid('qr_code_uuid'),
});
export type FamilyMember = InferSelectModel<typeof familyMembers>;
export type NewFamilyMember = InferInsertModel<typeof familyMembers>;

// QR_CODES
export const qrCodes = pgTable('qr_codes', {
  qrCodeId: serial('qr_code_id').primaryKey(),
  entityId: integer('entity_id'),
  entityType: varchar('entity_type', { length: 50 }),
  locationId: integer('location_id').references(() => locations.locationId),
  status: qrStatus('status'),
  issueDate: date('issue_date').defaultNow(),
  uuid: uuid('uuid'),
});
export type QrCode = InferSelectModel<typeof qrCodes>;
export type NewQrCode = InferInsertModel<typeof qrCodes>;

// REPORTS
export const reports = pgTable('reports', {
  reportId: serial('report_id').primaryKey(),
  memberId: integer('member_id').references(() => members.memberId),
  locationId: integer('location_id').references(() => locations.locationId),
  issueDescription: text('issue_description'),
  status: reportStatus('status'),
  submissionDate: date('submission_date').defaultNow(),
  resolutionDate: date('resolution_date').defaultNow(),
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

// PAYMENT_INFORMATION
export const paymentInformation = pgTable('payment_information', {
  paymentInfoId: serial('payment_info_id').primaryKey(),
  memberId: integer('member_id').references(() => members.memberId, { onDelete: "cascade" }).unique(),
  cardHolderName: varchar('card_holder_name', { length: 255 }).notNull(),
  cardNumber: varchar('cardNumber', { length: 19 }).notNull(),
  expirationMonth: varchar('expiration_month', { length: 2 }).notNull(),
  expirationYear: varchar('expiration_year', { length: 4 }).notNull(),
  billingAddress: varchar('billing_address', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
export type PaymentInformation = InferSelectModel<typeof paymentInformation>;
export type NewPaymentInformation = InferInsertModel<typeof paymentInformation>;

// TRANSACTIONS
export const transactions = pgTable('transactions', {
  transactionId: serial('transaction_id').primaryKey(),
  memberId: integer('member_id').references(() => members.memberId),
  paymentInfoId: integer('payment_info_id').references(() => paymentInformation.paymentInfoId),
  price: decimal('price', { precision: 10, scale: 2 }), // Use decimal for money
  transactionDate: timestamp('transaction_date').defaultNow(),
  type: transactionType('type'),
});
export type Transaction = InferSelectModel<typeof transactions>;
export type NewTransaction = InferInsertModel<typeof transactions>;

// MONTHLY_MEMBER_FEES
export const monthlyMemberFees = pgTable('monthly_member_fees', {
  id: serial('id').primaryKey(),
  memberId: integer('member_id').references(() => members.memberId),
  fees: decimal('fees', { precision: 10, scale: 2 }),
});
export type MonthlyMemberFee = InferSelectModel<typeof monthlyMemberFees>;
export type NewMonthlyMemberFee = InferInsertModel<typeof monthlyMemberFees>;