import { DEPOSIT_TYPES } from "@/components/organisms/earn-money-steps/third-step/enums";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface StepOneData {
  amount?: number;
}

export interface StepTwoData {
  selectedCardId?: string | number;
}

export interface StepThreeData {
  paymentType?: DEPOSIT_TYPES;
  transactionId?: string;
}

export interface FormStepsState {
  stepOne: StepOneData;
  stepTwo: StepTwoData;
  stepThree: StepThreeData;
  currentStep: number;
  completedSteps: Record<number, boolean>;
}

interface FormStepsContextType {
  state: FormStepsState;
  updateStepOne: (data: Partial<StepOneData>) => void;
  updateStepTwo: (data: Partial<StepTwoData>) => void;
  updateStepThree: (data: Partial<StepThreeData>) => void;
  setCurrentStep: (step: number) => void;
  markStepCompleted: (step: number) => void;
  resetForm: () => void;
  clearStorage: () => void;
  clearStep: (stepNumber: number) => void;
  startOver: () => void;
}

const STORAGE_KEY = "form-steps-data";

const initialState: FormStepsState = {
  stepOne: {},
  stepTwo: {},
  stepThree: {},
  currentStep: 0,
  completedSteps: {},
};

const FormStepsContext = createContext<FormStepsContextType | undefined>(
  undefined
);

const loadFromStorage = (): FormStepsState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsedData = JSON.parse(stored);
      return {
        stepOne: parsedData.stepOne || {},
        stepTwo: parsedData.stepTwo || {},
        stepThree: parsedData.stepThree || {},
        currentStep: parsedData.currentStep || 0,
        completedSteps: parsedData.completedSteps || {},
      };
    }
  } catch (error) {
    console.error("Ошибка при загрузке данных из localStorage:", error);
  }
  return initialState;
};

const saveToStorage = (state: FormStepsState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Ошибка при сохранении данных в localStorage:", error);
  }
};

export const FormStepsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<FormStepsState>(initialState);

  useEffect(() => {
    const storedState = loadFromStorage();
    setState(storedState);
  }, []);

  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  const updateStepOne = (data: Partial<StepOneData>) => {
    setState((prev) => ({
      ...prev,
      stepOne: { ...prev.stepOne, ...data },
    }));
  };

  const updateStepTwo = (data: Partial<StepTwoData>) => {
    setState((prev) => ({
      ...prev,
      stepTwo: { ...prev.stepTwo, ...data },
    }));
  };

  const updateStepThree = (data: Partial<StepThreeData>) => {
    setState((prev) => ({
      ...prev,
      stepThree: { ...prev.stepThree, ...data },
    }));
  };

  const setCurrentStep = (step: number) => {
    setState((prev) => ({
      ...prev,
      currentStep: step,
    }));
  };

  const markStepCompleted = (step: number) => {
    setState((prev) => ({
      ...prev,
      completedSteps: { ...prev.completedSteps, [step]: true },
    }));
  };

  const resetForm = () => {
    setState(initialState);
  };

  const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(initialState);
  };

  const startOver = () => {
    localStorage.removeItem(STORAGE_KEY);
    const resetState = {
      ...initialState,
      currentStep: 0,
      completedSteps: {},
    };
    setState(resetState);
  };

  const clearStep = (stepNumber: number) => {
    setState((prev) => {
      const newState = { ...prev };
      switch (stepNumber) {
        case 0:
          newState.stepOne = {};
          break;
        case 1:
          newState.stepTwo = {};
          break;
        case 2:
          newState.stepThree = {};
          break;
      }
      const newCompleted = { ...newState.completedSteps };
      delete newCompleted[stepNumber];
      newState.completedSteps = newCompleted;

      return newState;
    });
  };

  const contextValue: FormStepsContextType = {
    state,
    updateStepOne,
    updateStepTwo,
    updateStepThree,
    setCurrentStep,
    markStepCompleted,
    resetForm,
    clearStorage,
    clearStep,
    startOver,
  };

  return (
    <FormStepsContext.Provider value={contextValue}>
      {children}
    </FormStepsContext.Provider>
  );
};

export const useFormSteps = (): FormStepsContextType => {
  const context = useContext(FormStepsContext);
  if (!context) {
    throw new Error(
      "useFormSteps должен использоваться внутри FormStepsProvider"
    );
  }
  return context;
};
