import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
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
    if (!projectManager) {
      setProjectManager(project?.project_manager);
    }
  }

  const [conclude, setConclude] = useState('passed');

  const handleChange = (event: SelectChangeEvent) => {
    setConclude(event.target.value as string);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Autocomplete
        id="project"
        options={projectAutocompleteProps.options}
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
          />
        )}
      />
      <TextField
        label="项目经理"
        required
        margin="normal"
        value={projectManager}
        onChange={(e) => setProjectManager(e.target.value)}
      />
      <FormControl 
        fullWidth
        margin="normal"
      >
        <InputLabel id="conclude">结论</InputLabel>
        <Select
          labelId="conclude"
          id="conclude-select"
          value={conclude}
          label="结论"
          onChange={handleChange}
          required
        >
          <MenuItem value={"passed"}>通过</MenuItem>
          <MenuItem value={"failed"}>失败</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}