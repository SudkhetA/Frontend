import type IModel from "../i-model";
import type Member from "./member";
import type MemberRole from "./member-role";
import type Menu from "./menu";
import type RoleMenu from "./role-menu";

export default interface Role extends IModel {
  name?: string;

  memberCreatedBy?: Member | null;
  memberUpdatedBy?: Member | null;
  memberDeletedBy?: Member | null;

  members?: Member[];
  memberRoles?: MemberRole[];

  menus?: Menu;
  roleMenus?: RoleMenu[];
}