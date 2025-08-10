"use client";

import { User } from "@/models/system/user";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("id", {
    cell: x => x.getValue(),
  }),
  columnHelper.accessor("username", {
    cell: x => x.getValue(),
    header: "Username",
  }),
  columnHelper.accessor("firstName", {
    cell: x => x.getValue(),
    header: "First Name",
  }),
  columnHelper.accessor("lastName", {
    cell: x => x.getValue(),
    header: "Last Name",
  }),
  columnHelper.accessor("email", {
    cell: x => x.getValue(),
    header: "Email",
  }),
]

export default function MemberGrid({ data } : { data: User[] }) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
