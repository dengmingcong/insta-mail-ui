"use client";

import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";

export default function CategoryShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show
      isLoading={isLoading}
      title={<Typography variant="h5">{record?.title}</Typography>}
    >
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {"ID"}
        </Typography>
        <TextField value={record?.id} />
        <Typography variant="body1" fontWeight="bold">
          {"Title"}
        </Typography>
        <TextField value={record?.title} />
        <Typography variant="body1" fontWeight="bold">
          {"Uses"}
        </Typography>
        <TextField value={record?.uses} />
        <Typography variant="body1" fontWeight="bold">
          {"Created At"}
        </Typography>
        <TextField value={record?.created_at} />
        <Typography variant="body1" fontWeight="bold">
          {"Last Updated"}
        </Typography>
        <TextField value={record?.last_updated} />
        <Typography variant="body1" fontWeight="bold">
          {"HTML"}
        </Typography>
        <TextField value={record?.html} />
      </Stack>
    </Show>
  );
}
