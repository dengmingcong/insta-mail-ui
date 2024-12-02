import { Autocomplete, TextField } from "@mui/material";
import { useAutocomplete } from "@refinedev/mui";


export default function CIReportCreate() {
  const { autocompleteProps: projectAutocompleteProps } = useAutocomplete({
    resource: "projects",
  });

  return (
    <>
      <Autocomplete
        id="project"
        {...projectAutocompleteProps}
        getOptionLabel={(item) => item?.title}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Project"
            variant="outlined"
            required
          />
        )}
      />
    </>
  );
}