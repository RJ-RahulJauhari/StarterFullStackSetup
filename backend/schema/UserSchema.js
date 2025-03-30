import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { timestamps } from './helpers/ColumnHelper.js';


export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age'),
  email: text('email').notNull().unique(),
  password:text("password").notNull(),
  ...timestamps
});