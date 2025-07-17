"use client";

import { IconButton } from "@mui/material";
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import { DataGrid, type GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useCustomMutation } from "@refinedev/core";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
  TagField
} from "@refinedev/mui";
import React, { useState, useEffect } from "react";
import { useGetIdentity } from "@refinedev/core";
import { Button, Box } from "@mui/material";
import { CompanyLoginModal } from "@components/CompanyLoginModal";

// Define the user type to include email
interface IUser {
  id: number;
  name: string;
  avatar: string;
  email: string;
}

export default function MailList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
  });
  // Company login modal state
  const [loginOpen, setLoginOpen] = useState(false);

  const { mutate } = useCustomMutation();
  const { data: user } = useGetIdentity<IUser>();
  const BACKEND_API_ORIGIN = process.env.BACKEND_API_ORIGIN || 'http://localhost:8000';
  // Handle company login success
  const handleCompanyLoginSuccess = (data: any) => {
    console.log('Company login data:', data);
    setLoginOpen(false);
    // TODO: store token or use business data
  };

  // Function to test the selected mail.
  // This function will be called when the user clicks the bug icon.
  // It will send a POST request to the server with the selected mail's ID (key is "id") and the user's email (key is "email").
  // The server will then send a test email to the user with the selected mail's ID.
  const handleTestMail = (selectedMail: number) => {
    mutate({
      url: `${BACKEND_API_ORIGIN}/mails/${selectedMail}/test`,
      method: "post",
      values: {
        to: user?.email || "",
      },
    });
  }

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
      },
      {
        field: "project_name",
        flex: 1,
        headerName: "Project",
        minWidth: 200,
      },
      // {
      //   field: "template_id",
      //   flex: 1,
      //   headerName: "Template",
      //   minWidth: 200,
      //   valueGetter: ({ row }) => {
      //     const value = row?.template_id;
      //     return value;
      //   },
      //   renderCell: function render({ value }) {
      //     return templateIsLoading ? (
      //       <>Loading...</>
      //     ) : (
      //       <TagField value={templateData?.data?.find((item) => item.id?.toString() === value.toString())?.title} />
      //     );
      //   }
      // },
      // {
      //   field: "recent",
      //   flex: 1,
      //   headerName: "Recent",
      //   minWidth: 100,
      // },
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
              <IconButton
                aria-label="test"
                color="info"
                onClick={() => handleTestMail(row.id) }
              >
                <BugReportOutlinedIcon />
              </IconButton>
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
      {/* Company login trigger */}
      <Box mb={2}>
        <Button variant="contained" color="primary" onClick={() => setLoginOpen(true)}>
          Company Login
        </Button>
      </Box>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        autoHeight
        slots={{ toolbar: GridToolbar }}
      />
      {/* Login modal for company site */}
      <CompanyLoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSuccess={handleCompanyLoginSuccess}
      />
    </List>
  );
}
