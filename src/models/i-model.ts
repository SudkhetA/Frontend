export default interface IModel {
  id?: number;
  createdBy?: number | null;
  createdDate?: Date | null;
  updatedBy?: number | null;
  updatedDate?: Date | null;
  deletedBy?: number | null;
  deletedDate?: Date | null;
  isActive?: boolean;
}