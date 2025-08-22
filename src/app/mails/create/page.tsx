"use client";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  type SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useApiUrl } from "@refinedev/core";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useState } from "react";
import { Controller } from "react-hook-form";

export default function MailCreate() {
  interface MailFormValues {
    project_id?: number;
    project_name?: string;
    conclusion: string;
    risk?: string;
    suggestion?: string;
    tools: string[];
    apis: { path: string }[];
  }

  const {
    saveButtonProps,
    register,
    refineCore: { formLoading },
    formState: { errors },
    setValue,
    control,
  } = useForm<MailFormValues>({
    defaultValues: {
      conclusion: "passed",
      tools: ["runway"] as string[],
      apis: [],
    },
  });

  const apiUrl = useApiUrl();

  const { autocompleteProps: projectAutocompleteProps } = useAutocomplete({
    resource: "adapters/vesync/projects",
    debounce: 500,
    onSearch: (value) => [
      {
        field: "title",
        operator: "contains",
        value,
      },
    ],
  });

  const [conclusion, setConclusion] = useState("passed");

  const handleChange = (event: SelectChangeEvent) => {
    setConclusion(event.target.value as string);
    setValue("conclusion", event.target.value);
  };

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <input type="hidden" {...register("project_id")} />
        <Autocomplete
          {...projectAutocompleteProps}
          id="project_name"
          getOptionLabel={(item) => item?.title}
          isOptionEqualToValue={(option, value) =>
            value === undefined ||
            option?.id?.toString() === (value?.id ?? value)?.toString()
          }
          onChange={(_event, value) => setValue("project_id", value?.id)} // Update projectId here.
          renderInput={(params) => (
            <TextField
              {...params}
              {...register("project_name", {
                required: "This field is required",
              })}
              error={!!errors?.project_name}
              helperText={
                typeof errors?.project_name?.message === "string"
                  ? errors.project_name.message
                  : ""
              }
              label="项目"
              variant="outlined"
              margin="normal"
              name="project_name"
            />
          )}
        />
        <FormControl fullWidth margin="normal">
          <FormLabel id="conclusion">结论</FormLabel>
          <RadioGroup
            row
            aria-labelledby="conclusion"
            value={conclusion}
            name="conclusion"
            onChange={handleChange}
          >
            <FormControlLabel
              value="passed"
              control={<Radio color="success" />}
              label="通过"
            />
            <FormControlLabel
              value="failed"
              control={<Radio color="warning" />}
              label="失败"
            />
          </RadioGroup>
          <input type="hidden" {...register("conclusion")} value={conclusion} />
        </FormControl>
        <TextField
          {...register("risk")}
          label="风险"
          margin="normal"
          multiline
          rows={2}
          name="risk"
        />
        <TextField
          {...register("suggestion")}
          label="建议"
          margin="normal"
          multiline
          rows={2}
          name="suggestion"
        />
        <Controller
          name="tools"
          control={control}
          render={({ field }) => (
            <FormControl>
              <FormLabel id="tools">测试工具</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={(field.value || []).includes("runway")}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const current: string[] = field.value || [];
                        const next = checked
                          ? Array.from(new Set([...current, "runway"]))
                          : current.filter((v) => v !== "runway");
                        field.onChange(next);
                      }}
                    />
                  }
                  label="Runway"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={(field.value || []).includes("jmeter")}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const current: string[] = field.value || [];
                        const next = checked
                          ? Array.from(new Set([...current, "jmeter"]))
                          : current.filter((v) => v !== "jmeter");
                        field.onChange(next);
                      }}
                    />
                  }
                  label="JMeter"
                />
              </FormGroup>
            </FormControl>
          )}
        />
        {/* 报告上传与接口列表（解析由后端完成，此处仅调用并展示） */}
        <Controller
          name="apis"
          control={control}
          render={({ field }) => (
            <Box component={Paper} variant="outlined" sx={{ p: 2, mt: 1 }}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Button
                  variant="contained"
                  // size="small"
                  startIcon={<UploadFileIcon />}
                  component="label"
                >
                  Upload Allure
                  <input
                    type="file"
                    hidden
                    onChange={async (e) => {
                      const inputEl =
                        e.currentTarget as HTMLInputElement | null;
                      const file = inputEl?.files?.[0];
                      if (!file) {
                        if (inputEl) inputEl.value = "";
                        return;
                      }
                      try {
                        const form = new FormData();
                        form.append("file", file);
                        // 后端实现解析逻辑，此处仅调用接口。
                        const res = await fetch(
                          `${apiUrl}/adapters/allure/reports`,
                          {
                            method: "POST",
                            body: form,
                          },
                        );
                        if (!res.ok) {
                          console.error("Upload failed", await res.text());
                          return;
                        }
                        const data = (await res.json()) as { path: string }[];
                        field.onChange(data || []);
                      } catch (err) {
                        console.error(err);
                      } finally {
                        // 允许重复选择同一文件
                        if (inputEl) inputEl.value = "";
                      }
                    }}
                  />
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() =>
                    field.onChange([...(field.value || []), { path: "" }])
                  }
                >
                  Api
                </Button>
              </Stack>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell width="60">ID</TableCell>
                    <TableCell>Path</TableCell>
                    <TableCell align="right" width="80">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(field.value || []).map(
                    (row: { path: string; __id?: string }, idx: number) => (
                      <TableRow key={row.__id ?? `${idx}`}>
                        <TableCell>{idx + 1}</TableCell>
                        <TableCell>
                          <TextField
                            fullWidth
                            size="small"
                            value={row?.path ?? ""}
                            onChange={(e) => {
                              const next: { path: string; __id?: string }[] = [
                                ...(field.value || []),
                              ];
                              const current = next[idx] || {};
                              const id = current.__id ?? crypto.randomUUID();
                              next[idx] = {
                                ...current,
                                __id: id,
                                path: e.target.value,
                              };
                              field.onChange(next);
                            }}
                            placeholder="/api/foo/bar"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            aria-label="delete"
                            size="small"
                            onClick={() => {
                              const next = (field.value || []).filter(
                                (
                                  _: { path: string; __id?: string },
                                  i: number,
                                ) => i !== idx,
                              );
                              field.onChange(next);
                            }}
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </Box>
          )}
        />
      </Box>
    </Create>
  );
}
