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


export default function CIReportPreview({ project }: { project: { id: number; project_manager: string } }) {

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TextField
        label="To"
        margin="normal"
        multiline
        defaultValue={project.project_manager}
        disabled
      />
    </Box>
  );
}