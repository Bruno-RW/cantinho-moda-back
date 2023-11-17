"use client";

import { ColumnDef } from "@tanstack/react-table";

import UsersAction from "./UsersAction";

export type UsersColumnProps = {
  id: number;
  name: string;
  email: string;
  type: string;
  createdAt: Date;
};

export const UsersColumn: ColumnDef<UsersColumnProps>[] = [
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "email",
    header: "email",
  },
  {
    accessorKey: "type",
    header: "type",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <UsersAction data={row.original} />,
  },
];
