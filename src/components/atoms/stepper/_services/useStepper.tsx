import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useStepper = (
  stepsLength: number,
  setNext?: Dispatch<SetStateAction<boolean>>,
  setReset?: Dispatch<SetStateAction<boolean>>,
  reset?: boolean
) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});

  const totalSteps = () => stepsLength;

  const completedSteps = () => Object.keys(completed).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? Array.from({ length: stepsLength }).findIndex(
            (_, i) => !(i in completed)
          )
        : activeStep + 1;
    setNext?.(false);
    setReset?.(false);

    setActiveStep(newActiveStep);
  };
  useEffect(() => {
    console.log(reset);

    if (reset) {
      setActiveStep(0);
    }
  }, [reset]);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleStep = (step: number) => setActiveStep(step);

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return {
    activeStep,
    completed,
    handleNext,
    handleBack,
    handleStep,
    handleReset,
  };
};
