import type Member from "./member";
import type Role from "./role";

export default interface MemberRole {
  memberId?: number;
  roleId?: number;
  createdBy?: number | undefined;
  createdDate?: Date | undefined;
  isActive?: boolean;
  
  memberCreatedBy?: Member | null;
  member?: Member;
  role?: Role;
}