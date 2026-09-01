"use client";

import { PmLoginModal } from "@components/mails/PmLoginModal";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, type GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useCustomMutation, useGetIdentity } from "@refinedev/core";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  TagField,
  useDataGrid,
} from "@refinedev/mui";
import React, { useEffect, useState } from "react";

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
  // PM login modal state.
  const [isPmLoginModalOpen, setIsPmLoginModalOpen] = useState(false);

  const { mutate } = useCustomMutation();
  const { data: user } = useGetIdentity<IUser>();
  const BACKEND_API_ORIGIN =
    process.env.BACKEND_API_ORIGIN || "http://localhost:8000";

  // Handle PM login success.
  const handlePmLoginSuccess = (data: any) => {
    console.log("PM login data:", data);
    setIsPmLoginModalOpen(false);
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
  };

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
                onClick={() => handleTestMail(row.id)}
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
    [],
  );

  return (
    <List>
      {/* VeSync PM login page trigger */}
      <Box mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsPmLoginModalOpen(true)}
        >
          Signin VeSync PM
        </Button>
      </Box>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        autoHeight
        slots={{ toolbar: GridToolbar }}
      />
      {/* Login modal for pm site */}
      <PmLoginModal
        open={isPmLoginModalOpen}
        onClose={() => setIsPmLoginModalOpen(false)}
        onSuccess={handlePmLoginSuccess}
      />
    </List>
  );
}
