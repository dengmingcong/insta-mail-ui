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
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

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

  const { mutate } = useCustomMutation();
  const { data: user } = useGetIdentity<IUser>();
  const BACKEND_API_ORIGIN = process.env.BACKEND_API_ORIGIN || 'http://localhost:8000';

  // 公司系统登录状态
  const [companyLoggedIn, setCompanyLoggedIn] = useState(false);

  // 页面初始化时从 sessionStorage 恢复登录状态
  useEffect(() => {
    const flag = sessionStorage.getItem('companyLoggedIn');
    if (flag === 'true') {
      setCompanyLoggedIn(true);
    }
  }, []);

  // 打开公司系统登录弹窗
  const openLoginPopup = () => {
    const popup = window.open(
      `https://pm.vesync.co/`,
      'company-login',
      'width=500,height=600'
    );
    // 轮询弹窗关闭状态，一旦关闭视为登录完成
    const timer = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(timer);
        // 持久化登录状态并显示列表
        sessionStorage.setItem('companyLoggedIn', 'true');
        setCompanyLoggedIn(true);
      }
    }, 500);
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

  // 未登录：仅显示登录弹窗，登录后未渲染任何其他组件
  if (!companyLoggedIn) {
    return (
      <Dialog open disableEscapeKeyDown>
        <DialogTitle>请先登录公司系统</DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={openLoginPopup} color="primary">
            登录公司系统
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  // 已登录：渲染邮件列表
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
