"use client";

import { DataGrid, type GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

export default function MailList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
  });

  // Call useMany to find all records whose category_id is not null.
  const { data: templateData, isLoading: templateIsLoading } = useMany({
    resource: "templates",
    ids:
      dataGridProps?.rows
        ?.map((item) => item?.template_id)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    }
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
      },
      {
        field: "project",
        flex: 1,
        headerName: "Project",
        minWidth: 200,
      },
      {
        field: "template_id",
        flex: 1,
        headerName: "Template",
        minWidth: 200,
        valueGetter: ({ row }) => {
          const value = row?.template_id;
          return value;
        },
        renderCell: function render({ value }) {
          return templateIsLoading ? (
            <>Loading...</>
          ) : (
            templateData?.data?.find((item) => item.id?.toString() === value.toString())?.title
          );
        }
      },
      {
        field: "recent",
        flex: 1,
        headerName: "Recent",
        minWidth: 100,
      },
      {
        field: "created_at",
        flex: 1,
        headerName: "Created At",
        minWidth: 200,
      },
      {
        field: "last_updated",
        flex: 1,
        headerName: "Last Updated",
        minWidth: 200,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        flex: 0.5,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    [templateData]
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight slots={{ toolbar: GridToolbar }} />
    </List>
  );
}
