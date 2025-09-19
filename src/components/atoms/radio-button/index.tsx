import bg from "@/assets/images/modal.png";
import { H3 } from "@/styles/typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";
import Button from "../button";
import { BasicModal } from "../modal";

interface IFormTextInput<T extends FieldValues, U extends object>
  extends UseControllerProps<T> {
  width?: string;
  control: Control<T>;
  data: U[];
  name: FieldPath<T>;
  labelKey?: keyof U;
  valueKey?: keyof U;
  onItemDelete?: (item: U) => void;
}
export const RadioButtonsGroup = <T extends FieldValues, U extends object>({
  control,
  data,
  onItemDelete,
  name,
  labelKey,
  valueKey,
  width,
  ...props
}: IFormTextInput<T, U>) => {
  const { field, fieldState } = useController<T>({
    name,
    control,
    ...props,
  });

  const hasErrors = useMemo(() => {
    return fieldState.isTouched && fieldState.invalid;
  }, [fieldState.invalid, fieldState.isTouched]);

  useEffect(() => {
    if (!field.value && data.length > 0) {
      const defaultValue = valueKey ? data[0]?.[valueKey as keyof U] : data[0];
      field.onChange(defaultValue);
    }
  }, [data, valueKey, field]);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<U | null>(null);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <FormControl error={hasErrors}>
        <RadioGroup
          {...field}
          defaultValue={valueKey ? data[0]?.[valueKey as keyof U] : data[0]}
          name={name}
        >
          {data.map((item, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: "#e3e3e3",
                boxShadow: "0 1px 0 0 #000",
                height: "50px",
                marginTop: "20px",
                borderRadius: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "white",
                fontSize: "17px",
                width: "100%"
              }}
            >
              <FormControlLabel
                value={valueKey ? item[valueKey as keyof U] : item}
                name={name}
                control={
                  <Radio
                    sx={{
                      color: "white !important",
                      marginLeft: "10px",
                      "&.Mui-checked": {
                        color: "white !important",
                      },
                    }}
                    disabled={
                      "is_blocked" in item
                        ? (item as { is_blocked?: boolean }).is_blocked
                        : false
                    }
                  />
                }
                label={
                  labelKey
                    ? `${item[labelKey as keyof U]}`
                    : (item as unknown as string)
                }
                sx={{
                  span: {
                    color: (item as { is_blocked?: boolean }).is_blocked
                      ? "#b3b3b3"
                      : "#006ee6",
                    fontSize: "12px",
                    letterSpacing: "4px",
                  },
                  "& .MuiFormControlLabel-label.Mui-disabled": {
                    color: (item as { is_blocked?: boolean }).is_blocked
                      ? "#b3b3b3"
                      : "#006ee6",
                    fontSize: "17px",
                    letterSpacing: "4px",
                  },
                }}
              />
              {onItemDelete && (
                <DeleteIcon
                  sx={{ marginRight: "10px", cursor: "pointer" }}
                  onClick={() => {
                    setSelectedItem(item);
                    setOpenDeleteModal(true);
                  }}
                />
              )}
            </Box>
          ))}
        </RadioGroup>
      </FormControl>
      <BasicModal
        handleClose={() => setOpenDeleteModal(false)}
        open={openDeleteModal}
        bg={bg}
        width="50%"
      >
        <H3
          align="center"
          sx={{
            fontSize: {
              lg: "1.5rem",
              md: "1.5rem",
              xs: "1.1rem",
              sm: "1.1rem",
            },
          }}
        >
          {t("delete_card")}
        </H3>
        <Box
          sx={{
            display: "flex",
            width: {
              lg: "30%",
              md: "30%",
              xs: "100%",
              sm: "100%",
            },
            justifyContent: "space-between",
            flexDirection: {
              lg: "row",
              md: "row",
              xs: "column",
              sm: "column",
            },
            marginTop: "30px",
          }}
        >
          <Button
            variant={"outlinedWhite"}
            text={t("no")}
            onClick={() => setOpenDeleteModal(false)}
            sx={{
              marginBottom: {
                lg: "0",
                md: "0",
                xs: "10px",
                sm: "10px",
              },
            }}
          />
          <Button
            variant={"text"}
            text={t("yes")}
            onClick={() => {
              if (selectedItem) {
                onItemDelete?.(selectedItem);
                setOpenDeleteModal(false);
              }
            }}
          />
        </Box>
      </BasicModal>
    </Box>
  );
};
