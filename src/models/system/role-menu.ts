import type { User } from "./user";
import type Menu from "./menu";
import type Role from "./role";

export default interface RoleMenu {
  roleId?: number;
  menuId?: number;
  createdBy?: number | undefined;
  createdDate?: Date | undefined;
  isActive?: boolean;
  isCreate?: boolean;
  isRead?: boolean;
  isUpdate?: boolean;
  isDelete?: boolean;

  memberCreatedBy?: User | null;
  role?: Role;
  menu?: Menu;
}