import type IModel from "../i-model";
import type { User } from "./user";
import type UserRole from "./user-role";
import type Menu from "./menu";
import type RoleMenu from "./role-menu";

export default interface Role extends IModel {
  name?: string;

  userCreatedBy?: User | null;
  userUpdatedBy?: User | null;
  userDeletedBy?: User | null;

  users?: User[];
  userRoles?: UserRole[];

  menus?: Menu;
  roleMenus?: RoleMenu[];
}