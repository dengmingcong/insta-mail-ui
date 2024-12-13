import { 
  Autocomplete, 
  Box, 
  FormControl, 
  FormControlLabel, 
  FormLabel, 
  Radio,
  RadioGroup, 
  SelectChangeEvent, 
  TextField 
} from "@mui/material";
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
        <FormLabel id="conclude">结论</FormLabel>
        <RadioGroup
          row
          aria-labelledby="conclude"
          value={conclude}
          name="结论"
          onChange={handleChange}
        >
          <FormControlLabel value="passed" control={<Radio color="success"/> } label="通过" />
          <FormControlLabel value="failed" control={<Radio color="warning"/>} label="失败" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}