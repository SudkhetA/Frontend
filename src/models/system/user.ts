import type IModel from "../i-model";
import type UserRole from "./user-role";
import type Menu from "./menu";
import type Role from "./role";
import type RoleMenu from "./role-menu";

export interface User extends IModel {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;

  roles?: Role[];
  userRoles?: UserRole[];

  userCreatedBy?: User | null;
  userUpdatedBy?: User | null;
  userDeletedBy?: User | null;

  usersCreatedBy?: User[] | null;
  usersUpdatedBy?: User[] | null;
  usersDeletedBy?: User[] | null;

  roleCreatedBy?: Role[] | null;
  roleUpdatedBy?: Role[] | null;
  roleDeletedBy?: Role[] | null;

  menuCreatedBy?: Menu[] | null;
  menuUpdatedBy?: Menu[] | null;
  menuDeletedBy?: Menu[] | null;

  roleMenuCreatedBy?: RoleMenu[] | null;

  userRoleCreatedBy?: UserRole[] | null;
}

export interface UserSearch {
  id?: string[];
  username?: string[];
  firstName?: string[];
  lastName?: string[];
  email?: string[];
}