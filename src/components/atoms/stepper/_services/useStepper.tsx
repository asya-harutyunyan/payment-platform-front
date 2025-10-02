import { useFormSteps } from "@/context/form-steps.context";
import { useEffect, useState } from "react";

export const useStepper = (stepsLength: number) => {
  const { state, setCurrentStep } = useFormSteps();
  const [activeStep, setActiveStepLocal] = useState(state.currentStep || 0);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>(
    state.completedSteps || {}
  );

  // Синхронизируем локальное состояние с контекстом
  useEffect(() => {
    setActiveStepLocal(state.currentStep);
    setCompleted(state.completedSteps);
  }, [state.currentStep, state.completedSteps]);

  // Обновляем контекст при изменении активного шага
  const setActiveStep = (step: number) => {
    setActiveStepLocal(step);
    setCurrentStep(step);
  };

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
    setActiveStep(newActiveStep);
  };

  const handleBack = () => setActiveStep(activeStep - 1);

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
    setActiveStep,
  };
};
