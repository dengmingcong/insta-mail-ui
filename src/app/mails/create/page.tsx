"use client";

import { Autocomplete, Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, SelectChangeEvent, TextField } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useState } from "react";


export default function MailCreate() {
  const {
    saveButtonProps,
    register,
    refineCore: { formLoading },
    formState: { errors },
  } = useForm({});

  const { autocompleteProps: projectAutocompleteProps } = useAutocomplete({
    resource: "projects",
  });

  const [conclude, setConclude] = useState('passed');

  const handleChange = (event: SelectChangeEvent) => {
    setConclude(event.target.value as string);
  };

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Autocomplete
          id="project"
          options={projectAutocompleteProps.options}
          getOptionLabel={(item) => item?.title}
          isOptionEqualToValue={(option, value) =>
            value === undefined ||
            option?.id?.toString() === (value?.id ?? value)?.toString()
          }
          renderInput={(params) => (
            <TextField
              {...params}
              {...register("project", {
                required: "This field is required",
              })}
              error={!!errors?.title}
              helperText={typeof errors?.title?.message === "string" ? errors.title.message : ""}
              label="项目"
              variant="outlined"
              margin="normal"
              name="project"
            />
          )}
        />
        <FormControl 
          fullWidth
          margin="normal"
        >
          <FormLabel id="conclude">结论</FormLabel>
          <RadioGroup
            row
            aria-labelledby="conclude"
            value={conclude}
            name="conclude"
            onChange={handleChange}
          >
            <FormControlLabel value="passed" control={<Radio color="success"/> } label="通过" />
            <FormControlLabel value="failed" control={<Radio color="warning"/>} label="失败" />
          </RadioGroup>
          <input
            type="hidden"
            {...register("conclude")}
            value={conclude}
          />
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
      </Box>
    </Create>
  );
}
