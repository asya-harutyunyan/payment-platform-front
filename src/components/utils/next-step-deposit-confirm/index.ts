import { ReactNode } from "react";

type Steps = {
  label: string;
  component: ReactNode;
};

export const getNextStep = (
  activeStep: number,
  steps: Steps[],
  completed: { [k: number]: boolean }
): number => {
  const isLastStep = activeStep === steps.length - 1;
  const allStepsCompleted = Object.keys(completed).length === steps.length;

  return isLastStep && !allStepsCompleted
    ? steps.findIndex((_, i) => !(i in completed))
    : activeStep + 1;
};
