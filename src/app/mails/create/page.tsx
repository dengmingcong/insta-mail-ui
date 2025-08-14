"use client";

import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  type SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useState } from "react";

export default function MailCreate() {
  const {
    saveButtonProps,
    register,
    refineCore: { formLoading },
    formState: { errors },
    setValue,
  } = useForm({});

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
          onChange={(event, value) => setValue("project_id", value?.id)} // Update projectId here.
          renderInput={(params) => (
            <TextField
              {...params}
              {...register("project_name", {
                required: "This field is required",
              })}
              error={!!errors?.title}
              helperText={
                typeof errors?.title?.message === "string"
                  ? errors.title.message
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
        <FormControl>
          <FormLabel id="tools">测试工具</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked {...register("runway")} />}
              label="Runway"
            />
            <FormControlLabel
              control={<Checkbox {...register("jmeter")} />}
              label="JMeter"
            />
          </FormGroup>
        </FormControl>
      </Box>
    </Create>
  );
}
