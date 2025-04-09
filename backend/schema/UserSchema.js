import { integer, pgTable, serial, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { timestamps } from './helpers/ColumnHelper.js';

export const roleEnum = pgEnum("user_role",["admin","staff","student"])

export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age'),
  role:roleEnum("role").default("student").notNull(),
  email: text('email').notNull().unique(),
  password:text("password").notNull(),
  ...timestamps
});