import IModel from "../i-model";
import { User } from "./user";
import Menu from "./menu";

export default interface MenuType extends IModel {
  name?: string;

  userCreatedBy?: User | null;
  userUpdatedBy?: User | null;

  menus?: Menu[];
}