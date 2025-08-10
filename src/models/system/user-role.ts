import type { User } from "./user";
import type Role from "./role";

export default interface UserRole {
  userId?: number;
  roleId?: number;
  createdBy?: number | undefined;
  createdDate?: Date | undefined;
  isActive?: boolean;
  
  memberCreatedBy?: User | null;
  member?: User;
  role?: Role;
}