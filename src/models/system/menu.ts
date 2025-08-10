import type IModel from "../i-model";
import type { User } from "./user";
import MenuType from "./menu-type";
import type Role from "./role";
import type RoleMenu from "./role-menu";

export default interface Menu extends IModel {
  name?: string;
  path?: string | null;
  sequence?: number | null;
  menuTypeId?: number;

  userCreatedBy?: User | null;
  userUpdatedBy?: User | null;

  roles?: Role[];
  roleMenus?: RoleMenu[];

  menuType?: MenuType;
}