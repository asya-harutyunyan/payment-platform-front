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
    // Set default value if none is selected
    if (!field.value && data.length > 0) {
      const defaultValue = valueKey ? data[0]?.[valueKey as keyof U] : data[0];
      field.onChange(defaultValue);
    }
  }, [data, valueKey, field]);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<U | null>(null);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "40%" }}>
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
                border: "1px solid white",
                height: "50px",
                marginTop: "20px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "white",
                fontSize: "17px",
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
                  />
                }
                label={
                  labelKey
                    ? `${item[labelKey as keyof U]}`
                    : (item as unknown as string)
                }
                sx={{
                  span: {
                    color: "white",
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

      {/* Delete Confirmation Modal */}
      <BasicModal
        handleClose={() => setOpenDeleteModal(false)}
        open={openDeleteModal}
        bg={bg}
        width="50%"
      >
        <H3 align="center">{t("delete_card")}</H3>
        <Box
          sx={{
            display: "flex",
            width: "30%",
            justifyContent: "space-between",
            marginTop: "30px",
          }}
        >
          <Button
            variant={"outlinedWhite"}
            text={t("no")}
            onClick={() => setOpenDeleteModal(false)}
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
