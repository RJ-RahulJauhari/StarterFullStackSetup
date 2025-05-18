import { usersTable } from "../schema/userSchema.js";
import { eq, and, ilike } from "drizzle-orm";
import { DB } from "../config.js";

// ✔️ Check if a user exists by email
export const doesUserExist = async (email) => {
  const existingUser = await DB
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, email));
  return existingUser.length > 0;
};

// ✔️ Get full user data by email
export const getUserWithEmail = async (email) => {
  const user = await DB
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  return user[0];
};

// ✔️ Get user by ID
export const getUserById = async (id) => {
  const user = await DB
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id));
  return user[0];
};

// ✔️ Create new user
export const createUserInDB = async (data) => {
  await DB.insert(usersTable).values(data);
};

// 🆕 ✔️ Update user by ID
export const updateUserById = async (id, updateData) => {
  await DB
    .update(usersTable)
    .set(updateData)
    .where(eq(usersTable.id, id));
};

// 🆕 ✔️ Delete user by ID
export const deleteUserById = async (id) => {
  await DB
    .delete(usersTable)
    .where(eq(usersTable.id, id));
};

// 🆕 ✔️ Get all users (optionally paginated)
export const getAllUsers = async ({ limit = 50, offset = 0 } = {}) => {
  return await DB
    .select()
    .from(usersTable)
    .limit(limit)
    .offset(offset);
};

// 🆕 ✔️ Search users by name or email (case-insensitive)
export const searchUsers = async (query) => {
  return await DB
    .select()
    .from(usersTable)
    .where(ilike(usersTable.name, `%${query}%`));
};

// 🆕 ✔️ Get all users by role (e.g., "admin", "student")
export const getUsersByRole = async (role) => {
  return await DB
    .select()
    .from(usersTable)
    .where(eq(usersTable.role, role));
};
