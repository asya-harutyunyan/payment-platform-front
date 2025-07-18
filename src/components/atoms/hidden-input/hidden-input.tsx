import {
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

type THiddenInputProps<T extends FieldValues> = UseControllerProps<T> & {
  value?: string;
};

export function HiddenInput<T extends FieldValues>({
  name,
  control,
}: THiddenInputProps<T>) {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
  });

  return <input type="hidden" {...inputProps} ref={ref} />;
}
