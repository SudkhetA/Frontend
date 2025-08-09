import IModel from "../i-model";
import Member from "./member";
import Menu from "./menu";

export default interface MenuType extends IModel {
  name?: string;

  memberCreatedBy?: Member | null;
  memberUpdatedBy?: Member | null;
  memberDeletedBy?: Member | null;

  menus?: Menu[];
}