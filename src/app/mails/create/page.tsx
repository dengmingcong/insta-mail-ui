"use client";

import CIReportCreate from "@components/mail/forms/ci-report";
import { Autocomplete, Box, Button, Step, StepButton, Stepper, TextField, useMediaQuery, useTheme } from "@mui/material";
import { Create, SaveButton, useAutocomplete } from "@refinedev/mui";
import { useStepsForm } from "@refinedev/react-hook-form";

import { Controller } from "react-hook-form";

const stepTitles = ["Select Template", "Write Mail", "Preview"];

export default function MailCreate() {
  const {
    watch,
    saveButtonProps,
    refineCore: { formLoading, onFinish },
    handleSubmit,
    control,
    formState: { errors },
    steps: { currentStep, gotoStep }
  } = useStepsForm({});

  // Watch field 'template' and return its value.
  const selectedTemplate = watch("template");

  const theme = useTheme();
  const isSmallOrLess = useMediaQuery(theme.breakpoints.down("sm"));

  const { autocompleteProps } = useAutocomplete({
    resource: "templates",
  })

  const renderFormByStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Controller
            control={control}
            name="template"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <Autocomplete
                id="template"
                options={autocompleteProps.options}
                {...field}
                onChange={(_, value) => {
                  field.onChange(value);
                }}
                getOptionLabel={(option) => option?.title}
                isOptionEqualToValue={(option, value) =>
                  value === undefined ||
                  option?.id?.toString() === (value?.id ?? value)?.toString()
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Template"
                    margin="normal"
                    variant="outlined"
                    error={!!errors?.template}
                    helperText={errors.template?.message?.toString()}
                    required
                  />
                )}
              />
            )}
          />
        );
      case 1:
        return (
          <div>
            Step 2
            <div>Selected Template: {selectedTemplate?.title}</div>
            <CIReportCreate />
          </div>
        )
      case 2:
        return (
          <div>Step 3</div>
        )
    }
  };

  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={saveButtonProps}
      footerButtons={
        <>
          {currentStep > 0 && (
            <Button
              onClick={() => gotoStep(currentStep - 1)}
            >
              Previous
            </Button>
          )}
          {currentStep < stepTitles.length - 1 && (
            <Button
              onClick={() => gotoStep(currentStep + 1)}
            >
              Next
            </Button>
          )}
          {currentStep === stepTitles.length - 1 && (
            <SaveButton onClick={handleSubmit(onFinish)} />
          )}
        </>
      }
    >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Stepper
          nonLinear
          activeStep={currentStep}
          orientation={isSmallOrLess ? "vertical" : "horizontal"}
        >
          {stepTitles.map((label, index) => (
            <Step key={label}>
              <StepButton onClick={() => gotoStep(index)}>{label}</StepButton>
            </Step>
          ))}
        </Stepper>
        <br />
        {renderFormByStep(currentStep)}
      </Box>
    </Create>
  );
}
