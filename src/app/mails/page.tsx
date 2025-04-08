"use client";

import { IconButton } from "@mui/material";
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import { DataGrid, type GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useMany, useOne } from "@refinedev/core";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
  TagField
} from "@refinedev/mui";
import React, { useState, useEffect } from "react";

import { sendMailHandler } from '../../components/mails/sendMailHandler';

export default function MailList() {
  const { dataGridProps } = useDataGrid({
    syncWithLocation: true,
  });

  // Call useMany to find all records whose template_id is not null.
  // const { data: templateData, isLoading: templateIsLoading } = useMany({
  //   resource: "templates",
  //   ids:
  //     dataGridProps?.rows
  //       ?.map((item) => item?.template_id)
  //       .filter(Boolean) ?? [],
  //   queryOptions: {
  //     enabled: !!dataGridProps?.rows,
  //   }
  // });

  const [selectedMail, setSelectedMail] = useState(null);

  const { data: mailData } = useOne({
    resource: "mails",
    id: selectedMail,
    queryOptions: {
      enabled: !!selectedMail,
    },
  });

  useEffect(() => {
    if (selectedMail) {
      console.log("Selected mail ID:", selectedMail);
      console.log("Mail data:", mailData);
      if (mailData) {
        sendMailHandler(mailData);
      }
    }
  }, [selectedMail, mailData]);

  const handleTestButtonClick = async () => {
    console.log("Selected mail ID:", selectedMail);
    console.log("Mail data:", mailData);
    if (mailData) {
      await sendMailHandler(mailData.data);
    }
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
                onClick={() => {
                  setSelectedMail(row.id);
                  handleTestButtonClick();
                }}
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
      <DataGrid
        {...dataGridProps}
        columns={columns}
        autoHeight
        slots={{ toolbar: GridToolbar }}
      />
    </List>
  );
}
