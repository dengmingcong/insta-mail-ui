"use client";

import { Box, TextField } from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

export default function TemplateEdit() {
  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("title", {
            required: "This field is required",
          })}
          required
          error={!!errors?.title}
          helperText={typeof errors?.title?.message === "string" ? errors.title.message : ""}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Title"}
          name="title"
        />
        <TextField
          {...register("description")}
          error={!!errors?.description}
          helperText={typeof errors?.description?.message === "string" ? errors.description.message : ""}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Description"}
          name="description"
        />
        <TextField
          {...register("html", { required: "This field is required" })}
          required
          error={!!errors?.html}
          helperText={typeof errors?.html?.message === "string" ? errors.html.message : ""}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"HTML"}
          name="html"
          multiline
          rows={10}
        />
      </Box>
    </Edit>
  );
}
