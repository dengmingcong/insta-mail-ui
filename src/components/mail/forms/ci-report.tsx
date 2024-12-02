import { Autocomplete, Box, TextField } from "@mui/material";
import { useAutocomplete } from "@refinedev/mui";


export default function CIReportCreate() {
  const { autocompleteProps: projectAutocompleteProps } = useAutocomplete({
    resource: "projects",
  });

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Autocomplete
          id="project"
          {...projectAutocompleteProps}
          getOptionLabel={(item) => item?.title}
          renderInput={(params) => (
            <TextField
              {...params}
              label="项目"
              variant="outlined"
              required
              margin="normal"
            />
          )}
        />
        <TextField
          label="项目经理"
          defaultValue=""
          required
          margin="normal"
        />
      </Box>
    </>
  );
}