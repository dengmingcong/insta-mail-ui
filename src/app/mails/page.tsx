"use client";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";

export default function MailList() {
  const { dataGridProps } = useDataGrid({});

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
        field: "template",
        flex: 1,
        headerName: "Template",
        minWidth: 200,
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
    []
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
}
