import type IModel from "../i-model";
import type MemberRole from "./member-role";
import type Menu from "./menu";
import type Role from "./role";
import type RoleMenu from "./role-menu";

export default interface Member extends IModel {
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  email?: string;

  roles?: Role[];
  memberRoles?: MemberRole[];

  memberCreatedBy?: Member | null;
  memberUpdatedBy?: Member | null;
  memberDeletedBy?: Member | null;

  membersCreatedBy?: Member[] | null;
  membersUpdatedBy?: Member[] | null;
  membersDeletedBy?: Member[] | null;

  roleCreatedBy?: Role[] | null;
  roleUpdatedBy?: Role[] | null;
  roleDeletedBy?: Role[] | null;

  menuCreatedBy?: Menu[] | null;
  menuUpdatedBy?: Menu[] | null;
  menuDeletedBy?: Menu[] | null;

  roleMenuCreatedBy?: RoleMenu[] | null;

  memberRoleCreatedBy?: MemberRole[] | null;
}