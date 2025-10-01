import { DEPOSIT_TYPES } from "@/components/organisms/earn-money-steps/third-step/enums";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Типы для данных каждого шага
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

// Общий интерфейс состояния формы
export interface FormStepsState {
  stepOne: StepOneData;
  stepTwo: StepTwoData;
  stepThree: StepThreeData;
  currentStep: number;
  completedSteps: Record<number, boolean>;
}

// Интерфейс контекста
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

// Ключ для localStorage
const STORAGE_KEY = "form-steps-data";

// Начальное состояние
const initialState: FormStepsState = {
  stepOne: {},
  stepTwo: {},
  stepThree: {},
  currentStep: 0,
  completedSteps: {},
};

// Создание контекста
const FormStepsContext = createContext<FormStepsContextType | undefined>(
  undefined
);

// Функция для загрузки данных из localStorage
const loadFromStorage = (): FormStepsState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsedData = JSON.parse(stored);
      // Проверяем, что данные имеют правильную структуру
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

// Функция для сохранения данных в localStorage
const saveToStorage = (state: FormStepsState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Ошибка при сохранении данных в localStorage:", error);
  }
};

// Провайдер контекста
export const FormStepsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<FormStepsState>(initialState);

  // Загружаем данные из localStorage при инициализации
  useEffect(() => {
    const storedState = loadFromStorage();
    setState(storedState);
  }, []);

  // Сохраняем данные в localStorage при каждом изменении состояния
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

  // Полный сброс формы - очищает localStorage и возвращает на первый шаг
  const startOver = () => {
    localStorage.removeItem(STORAGE_KEY);
    const resetState = {
      ...initialState,
      currentStep: 0,
      completedSteps: {},
    };
    setState(resetState);
  };

  // Дополнительная утилита для очистки только определенного шага
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
      // Удаляем отметку о завершении шага
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

// Хук для использования контекста
export const useFormSteps = (): FormStepsContextType => {
  const context = useContext(FormStepsContext);
  if (!context) {
    throw new Error(
      "useFormSteps должен использоваться внутри FormStepsProvider"
    );
  }
  return context;
};
