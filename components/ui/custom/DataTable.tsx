"use client";

import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AiOutlinePlus } from "react-icons/ai";

import { capitalize } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button as Btn } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Button from "@/components/ui/custom/Button";
import Separator from "./Separator";
import Heading from "./Heading";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  entityName: string;
  searchKey: string;
  data: TData[];
};

export default function DataTable<TData, TValue>({ columns, entityName, searchKey, data }: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: { columnFilters },
  });

  return (
    <section className="flex flex-col gap-y-3">
      <div className="flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <Heading title={`${capitalize(entityName)} (${data.length})`} description={`Manage ${entityName}`} />

          <Button className="bg-border-shadow px-3" href={`/${entityName}/new`}>
            <AiOutlinePlus size={20} />
          </Button>
        </div>

        <Separator />
      </div>

      <div className="flex flex-col gap-y-4">
        <div className="flex items-center">
          <Input
            className="max-w-sm"
            placeholder="Search"
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
            onChange={(event: any) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => 
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => 
                    <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )}
                </TableRow>
              )}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => 
                  <TableRow data-state={row.getIsSelected() && "selected"} key={row.id}>
                    {row.getVisibleCells().map(cell => 
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    )}
                  </TableRow>
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2">
          <Btn variant="outline" size="sm" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>
            Previous
          </Btn>
          <Btn variant="outline" size="sm" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>
            Next
          </Btn>
        </div>
      </div>
    </section>
  );
}