import type IModel from "../i-model";
import type Member from "./member";
import MenuType from "./menu-type";
import type Role from "./role";
import type RoleMenu from "./role-menu";

export default interface Menu extends IModel {
  name?: string;
  path?: string | null;
  sequence?: number | null;
  menuTypeId?: number;

  memberCreatedBy?: Member | null;
  memberUpdatedBy?: Member | null;
  memberDeletedBy?: Member | null;

  roles?: Role[];
  roleMenus?: RoleMenu[];

  menuType?: MenuType;
}