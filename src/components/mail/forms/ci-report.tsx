import { Autocomplete, Box, TextField } from "@mui/material";
import { useAutocomplete } from "@refinedev/mui";
import { useState } from "react";


export default function CIReportCreate() {
  const { autocompleteProps: projectAutocompleteProps } = useAutocomplete({
    resource: "projects",
  });

  const [projectManager, setProjectManager] = useState("");
  
  /**
   * Handles the change of the project by updating the project manager state.
   *
   * @param project - An object containing the project details.
   * @param project.project_manager - The email of the project manager.
   */
  function handleProjectChange(project: { project_manager: string }) {
    setProjectManager(project?.project_manager);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Autocomplete
        id="project"
        {...projectAutocompleteProps}
        getOptionLabel={(item) => item?.title}
        onChange={(_, value) => {
          handleProjectChange(value);
        }}
        isOptionEqualToValue={(option, value) =>
          value === undefined ||
          option?.id?.toString() === (value?.id ?? value)?.toString()
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="项目"
            variant="outlined"
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        )}
      />
      <TextField
        label="项目经理"
        required
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={projectManager}
      />
    </Box>
  );
}