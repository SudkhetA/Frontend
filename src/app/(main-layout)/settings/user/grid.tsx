"use client";

import { User } from "@/models/system/user";
import { PATCH } from "@/utilities/fetch-helper";
import { createColumnHelper, flexRender, getCoreRowModel, RowData, useReactTable } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { ChangeEvent, MouseEvent, useMemo, useRef, useState } from "react";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    headerClassName: string;
    bodyClassName: string;
  }
}

const columnHelper = createColumnHelper<User>();

export default function UserGrid({ data }: { data: User[] }) {
  const [editModal, setEditModal] = useState<User>({
    id: 0,
    username: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const editModalRef = useRef<HTMLDialogElement>(null);

  function handleOpenEditModal(_event: MouseEvent<HTMLButtonElement>, id: number) {
    const row = data.find((x) => x.id === id);
    if (row) {
      setEditModal({
        id: row.id,
        username: row.username,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
      });
    }

    editModalRef.current?.showModal();
  }

  async function handleEditModalSave() {
    const response = await PATCH({
      isAuth: true,
      path: "/api/system/user",
      contentType: "application/json",
      body: JSON.stringify([editModal]),
    });

    if (response.status === 201) {
      // Handle successful update
    }
  }

  function handleInputModalChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setEditModal((prev) => ({ ...prev, [name]: value }));
  }

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "index",
        header: "#",
        cell: (props) => <>{props.row.index + 1}</>,
        meta: {
          headerClassName: "text-center border border-gray-300 w-12",
          bodyClassName: "text-center border border-gray-300",
        },
      }),
      columnHelper.accessor("username", {
        cell: (value) => value.getValue(),
        header: "Username",
        meta: {
          headerClassName: "text-center border border-gray-300 w-[calc((100%-12rem)/4)]",
          bodyClassName: "border border-gray-300",
        },
      }),
      columnHelper.accessor("firstName", {
        cell: (value) => value.getValue(),
        header: "First Name",
        meta: {
          headerClassName: "text-center border border-gray-300 w-[calc((100%-12rem)/4)]",
          bodyClassName: "border border-gray-300",
        },
      }),
      columnHelper.accessor("lastName", {
        cell: (value) => value.getValue(),
        header: "Last Name",
        meta: {
          headerClassName: "text-center border border-gray-300 w-[calc((100%-12rem)/4)]",
          bodyClassName: "border border-gray-300",
        },
      }),
      columnHelper.accessor("email", {
        cell: (value) => value.getValue(),
        header: "Email",
        meta: {
          headerClassName: "text-center border border-gray-300 w-[calc((100%-12rem)/4)]",
          bodyClassName: "border border-gray-300",
        },
      }),
      columnHelper.accessor("id", {
        cell: (value) => (
          <div className="flex justify-center">
            <button type="button" className="btn btn-sm btn-outline btn-warning mx-1" onClick={(event) => handleOpenEditModal(event, value.getValue()!)}>
              <Pencil />
            </button>
            <button type="button" className="btn btn-sm btn-outline btn-error mx-1">
              <Trash />
            </button>
          </div>
        ),
        header: "Manage",
        meta: {
          headerClassName: "text-center border border-gray-300 w-36",
          bodyClassName: "border border-gray-300",
        },
      }),
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <table className="table table-fixed">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={header.column.columnDef.meta?.headerClassName}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={cell.column.columnDef.meta?.bodyClassName}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <dialog ref={editModalRef} className="modal">
        <div className="modal-box">
          <label className="floating-label mb-4">
            <span>Username</span>
            <input
              disabled
              type="text"
              name="username"
              placeholder="Username"
              className="input input-md w-full"
              value={editModal.username}
              onChange={handleInputModalChange}
            />
          </label>
          <label className="floating-label mb-4">
            <span>First Name</span>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="input input-md w-full"
              value={editModal.firstName}
              onChange={handleInputModalChange}
            />
          </label>
          <label className="floating-label mb-4">
            <span>Last Name</span>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="input input-md w-full"
              value={editModal.lastName}
              onChange={handleInputModalChange}
            />
          </label>
          <label className="floating-label mb-4">
            <span>Email</span>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="input input-md w-full"
              value={editModal.email}
              onChange={handleInputModalChange}
            />
          </label>
          <button type="button" className="btn btn-primary mx-1" onClick={handleEditModalSave}>
            Save
          </button>
          <button type="button" className="btn btn-secondary mx-1" onClick={() => editModalRef.current?.close()}>
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}
