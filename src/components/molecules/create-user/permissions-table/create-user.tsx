import { EUserRoles } from "@/schema/create_user.schema";
import { H4, P } from "@/styles/typography";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Paper,
  Typography,
} from "@mui/material";
import { t } from "i18next";
import { Control, useController } from "react-hook-form";
import { FormData } from "../_services/useCreateUser";
import {
  actionPermissions,
  deletePermissions,
  FORMATTED_PERMISSIONS_DATA,
  PERMISSION_NAME_GROUPED_BY_PREFIX,
  TPermissionItem,
  viewPermissions,
} from "./data";

const style = {
  color: "primary.main",
  width: "85%",
  height: "60px",
  borderRadius: "10px",
  backgroundColor: "#ffffff",
  margin: "10px",
  display: "flex",
  alignItems: "center",
  padding: "0 10px",
};
const styleHead = {
  color: "primary.main",
  width: "32%",
  height: "70px",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const styleTitle = {
  padding: "5px 0 5px 20px",
  fontWeight: "bold",
};

interface IPermissions<T extends FormData> {
  control: Control<T>;
}

const PermissionsTable = ({ control }: IPermissions<FormData>) => {
  const {
    field: { value },
  } = useController({ control, name: "role" });

  const {
    field: { value: checkedPermissions, onChange: onPermissionsChange },
    fieldState: { error },
  } = useController({ control, name: "permissions" });

  const isActionDisabled = (permission: TPermissionItem) => {
    if (permission.checking === "view") return false;

    const viewPerm = viewPermissions.find(
      (v) => v.prefix === permission.prefix
    );

    return viewPerm ? !checkedPermissions.includes(viewPerm.name) : true;
  };

  const handleCheckboxChange = (
    isChecked: boolean,
    permission: TPermissionItem
  ) => {
    if (isChecked) {
      onPermissionsChange([
        ...new Set([...checkedPermissions, permission.name]),
      ]);

      return;
    }

    if (permission.checking !== "view") {
      const filteredNewCheckedPermissions = checkedPermissions.filter(
        (name) => permission.name !== name
      );
      onPermissionsChange([...new Set(filteredNewCheckedPermissions)]);
      return;
    }

    const filteredNewCheckedPermissions = checkedPermissions.filter(
      (permissionName) =>
        !PERMISSION_NAME_GROUPED_BY_PREFIX[permission.prefix].includes(
          permissionName
        )
    );

    onPermissionsChange([...new Set(filteredNewCheckedPermissions)]);
  };

  const handleCheckAllView = () => {
    const viewPermissionNames = viewPermissions.map((perm) => perm.name);

    const areAllChecked = viewPermissionNames.every((name) =>
      checkedPermissions.includes(name)
    );

    if (areAllChecked) {
      onPermissionsChange([]);
    } else {
      onPermissionsChange([
        ...new Set([...checkedPermissions, ...viewPermissionNames]),
      ]);
    }
  };

  const handleCheckAllEdit = () => {
    const editPermissionNames = actionPermissions
      .filter((perm) => {
        const requiredView = viewPermissions.find(
          (view) => view.prefix === perm.prefix
        );
        return requiredView && checkedPermissions.includes(requiredView.name);
      })
      .map((perm) => perm.name);

    const areAllChecked = editPermissionNames.every((name) =>
      checkedPermissions.includes(name)
    );

    if (areAllChecked) {
      onPermissionsChange(
        checkedPermissions.filter((name) => !editPermissionNames.includes(name))
      );
    } else {
      onPermissionsChange([
        ...new Set([...checkedPermissions, ...editPermissionNames]),
      ]);
    }
  };

  const handleCheckAllDelete = () => {
    const deletePermissionNames = deletePermissions
      .filter((perm) => {
        const requiredView = viewPermissions.find(
          (view) => view.prefix === perm.prefix
        );
        return requiredView && checkedPermissions.includes(requiredView.name);
      })
      .map((perm) => perm.name);

    const areAllChecked = deletePermissionNames.every((name) =>
      checkedPermissions.includes(name)
    );

    if (areAllChecked) {
      onPermissionsChange(
        checkedPermissions.filter(
          (name) => !deletePermissionNames.includes(name)
        )
      );
    } else {
      onPermissionsChange([
        ...new Set([...checkedPermissions, ...deletePermissionNames]),
      ]);
    }
  };

  if (value !== EUserRoles.CUSTOM) {
    return null;
  }

  return (
    <Box sx={{ width: "100%" }}>
      {error && (
        <Box
          sx={{
            color: "error.main",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <FormHelperText error>{error.message}</FormHelperText>
        </Box>
      )}

      <Paper
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box sx={styleHead}>
          <H4
            color="primary.main"
            sx={{
              fontSize: { lg: "1.4rem", md: "1.4rem", xs: "1rem", sm: "1rem" },
            }}
          >
            Просмотр
          </H4>
        </Box>
        <Box sx={styleHead}>
          <H4
            sx={{
              fontSize: { lg: "1.4rem", md: "1.4rem", xs: "1rem", sm: "1rem" },
            }}
            color="primary.main"
          >
            Редактирование
          </H4>
        </Box>
        <Box sx={styleHead}>
          <H4
            sx={{
              fontSize: { lg: "1.4rem", md: "1.4rem", xs: "1rem", sm: "1rem" },
            }}
            color="primary.main"
          >
            Удаление
          </H4>
        </Box>
      </Paper>

      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Box sx={styleTitle}>
            <P
              color="primary.main"
              onClick={handleCheckAllView}
              sx={{
                cursor: "pointer",
                ":hover": { textDecoration: "underline" },
              }}
            >
              {t("permissions_title_view")}
            </P>
          </Box>
          <Box sx={styleTitle}>
            <P
              color="primary.main"
              onClick={handleCheckAllEdit}
              sx={{
                cursor: "pointer",
                ":hover": { textDecoration: "underline" },
              }}
            >
              {t("permissions_title_edit")}
            </P>
          </Box>
          <Box sx={styleTitle}>
            <P
              color="primary.main"
              onClick={handleCheckAllDelete}
              sx={{
                cursor: "pointer",
                ":hover": { textDecoration: "underline" },
              }}
            >
              {t("permissions_title_delete")}
            </P>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          {FORMATTED_PERMISSIONS_DATA.map((section) => (
            <Box
              key={section.title}
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <P sx={styleTitle}>{section.title}</P>

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {section.rows.map((row, rowIndex) => (
                  <Box
                    key={`${section.title}_${rowIndex}`}
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    {row.map((column, columnIndex) => {
                      if (!column) {
                        return (
                          <Box
                            sx={{ width: "32%" }}
                            key={`${section.title}_${rowIndex}_${columnIndex}`}
                          />
                        );
                      }

                      return (
                        <Box
                          sx={{ width: "32%" }}
                          key={`${section.title}_${rowIndex}_${column.checking}`}
                        >
                          <Box
                            key={`${section.title}_${rowIndex}_${columnIndex}`}
                            sx={style}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={checkedPermissions.includes(
                                    column.name
                                  )}
                                  sx={{ color: "#1976d2" }}
                                  onChange={(event) =>
                                    handleCheckboxChange(
                                      event.target.checked,
                                      column
                                    )
                                  }
                                  disabled={isActionDisabled(column)}
                                />
                              }
                              label={
                                <Typography
                                  sx={{
                                    fontSize: {
                                      lg: "0.9rem",
                                      md: "0.9rem",
                                      xs: "0.6rem",
                                      sm: "0.6rem",
                                    },
                                  }}
                                >
                                  {t(column.name)}
                                </Typography>
                              }
                            />
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default PermissionsTable;
