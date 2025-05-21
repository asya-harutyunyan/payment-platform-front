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
import { Dispatch, SetStateAction, useEffect } from "react";
import { useCreateUser } from "../_services/useCreateUser";
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
interface IPermissions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any;
  setCheckedPermissions: Dispatch<SetStateAction<string[]>>;
  checkedPermissions: string[];
}
const PermissionsTable = ({
  setValue,
  setCheckedPermissions,
  checkedPermissions,
}: IPermissions) => {
  const {
    // setValue,
    // watch,
    viewReportPermissions,
    viewPermissionsUser,
    viewBlockedPermissionsUser,
    bankDetailsPermissions,
    viewBlockedCards,
    viewDeposit,
    viewOrderPermissions,
    viewOrderSummaryPermissions,
    viewWalletPermissions,
    viewRefUsers,
    viewPlatforms,
    //edit
    editWalletPermission,
    editUserPermission,
    editBlockedUserPermission,
    editBankPermission,
    editReferralPercentPermission,
    editDepositPermissions,
    //delete
    deleteWalletPermissions,
    deleteOrderPermissions,
    errors,
  } = useCreateUser({});

  useEffect(() => {
    setValue("permissions", checkedPermissions);
  }, [checkedPermissions, setValue]);

  const actionPermissions = [
    ...editWalletPermission,
    ...editUserPermission,
    ...editBlockedUserPermission,
    ...editBankPermission,
    ...editReferralPercentPermission,
    ...editDepositPermissions,
  ];
  const deletePermissions = [
    ...deleteWalletPermissions,
    ...deleteOrderPermissions,
  ];
  const viewPermissions = [
    ...viewPlatforms,
    ...viewRefUsers,
    ...viewWalletPermissions,
    ...viewOrderPermissions,
    ...viewOrderSummaryPermissions,
    ...viewDeposit,
    ...viewBlockedCards,
    ...bankDetailsPermissions,
    ...viewPermissionsUser,
    ...viewBlockedPermissionsUser,
    ...viewReportPermissions,
  ];
  const isActionDisabled = (permission: {
    name: string;
    prefix: string;
    checking: string;
  }) => {
    if (permission.checking.endsWith("_view")) return false;

    const viewPerm = viewPermissions.find(
      (v) => v.prefix === permission.prefix
    );

    return viewPerm ? !checkedPermissions.includes(viewPerm.name) : true;
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    permissionName: string
  ) => {
    const isChecked = event.target.checked;

    setCheckedPermissions((prev) => {
      let updated = isChecked
        ? [...prev, permissionName]
        : prev.filter((perm) => perm !== permissionName);

      const allPermissions = [...viewPermissions, ...actionPermissions];
      const currentPermission = allPermissions.find(
        (p) => p.name === permissionName
      );

      if (!currentPermission) return updated;

      const { prefix } = currentPermission;

      const viewPerm = viewPermissions.find((v) => v.prefix === prefix)?.name;
      const actionPerms = actionPermissions
        .filter((a) => a.prefix === prefix)
        .map((a) => a.name);

      if (isChecked && actionPerms.includes(permissionName)) {
        if (viewPerm && !updated.includes(viewPerm)) {
          updated.push(viewPerm);
        }
      }

      if (!isChecked && viewPerm === permissionName) {
        updated = updated.filter((perm) => {
          const p = actionPermissions.find((a) => a.name === perm);
          return !(p && p.prefix === prefix);
        });
      }

      return [...new Set(updated)];
    });
  };

  const styleTitle = {
    padding: "5px 0 5px 20px",
    fontWeight: "bold",
  };
  const handleCheckAllView = () => {
    const viewPermissionNames = viewPermissions.map((perm) => perm.name);
    const editPermissionNames = actionPermissions.map((perm) => perm.name);
    const deletePermissionNames = deletePermissions.map((perm) => perm.name);

    const areAllChecked = viewPermissionNames.every((name) =>
      checkedPermissions.includes(name)
    );

    if (areAllChecked) {
      setCheckedPermissions((prev) =>
        prev.filter(
          (name) =>
            !viewPermissionNames.includes(name) &&
            !editPermissionNames.includes(name) &&
            !deletePermissionNames.includes(name)
        )
      );
    } else {
      setCheckedPermissions((prev) => [
        ...new Set([...prev, ...viewPermissionNames]),
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
      setCheckedPermissions((prev) =>
        prev.filter((name) => !editPermissionNames.includes(name))
      );
    } else {
      setCheckedPermissions((prev) => [
        ...new Set([...prev, ...editPermissionNames]),
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
      setCheckedPermissions((prev) =>
        prev.filter((name) => !deletePermissionNames.includes(name))
      );
    } else {
      setCheckedPermissions((prev) => [
        ...new Set([...prev, ...deletePermissionNames]),
      ]);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {errors.permissions && (
        <Box
          sx={{
            color: "error.main",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <FormHelperText error>{errors.permissions.message}</FormHelperText>
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
            Удалениe
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
            {" "}
            <P
              color="primary.main"
              onClick={handleCheckAllView}
              sx={{
                cursor: "pointer",
                ":hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {t("permissions_title_view")}
            </P>
          </Box>
          <Box sx={styleTitle}>
            {" "}
            <P
              color="primary.main"
              onClick={handleCheckAllEdit}
              sx={{
                cursor: "pointer",
                ":hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {t("permissions_title_edit")}
            </P>
          </Box>
          <Box sx={styleTitle}>
            {" "}
            <P
              color="primary.main"
              onClick={handleCheckAllDelete}
              sx={{
                cursor: "pointer",
                ":hover": {
                  textDecoration: "underline",
                },
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
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <P sx={styleTitle}>Кошелек</P>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "32%" }}>
                {viewWalletPermissions.map((item, index) => (
                  <Box key={index} sx={style}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedPermissions.includes(item.name)}
                          sx={{ color: "#1976d2" }}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.name)
                          }
                          disabled={isActionDisabled(item)}
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
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "32%" }}>
                {editWalletPermission.map((item, index) => (
                  <Box key={index} sx={style}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedPermissions.includes(item.name)}
                          sx={{ color: "#1976d2" }}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.name)
                          }
                          disabled={isActionDisabled(item)}
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
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "32%" }}>
                {deleteWalletPermissions.map((item, index) => (
                  <Box key={index} sx={style}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedPermissions.includes(item.name)}
                          sx={{ color: "#1976d2" }}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.name)
                          }
                          disabled={isActionDisabled(item)}
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
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <P sx={styleTitle}>Пользователи</P>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "32%" }}>
                {viewPermissionsUser.map((item, index) => (
                  <Box key={index} sx={style}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedPermissions.includes(item.name)}
                          sx={{ color: "#1976d2" }}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.name)
                          }
                          disabled={isActionDisabled(item)}
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
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "32%" }}>
                {editUserPermission.map((item, index) => (
                  <Box key={index} sx={style}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedPermissions.includes(item.name)}
                          sx={{ color: "#1976d2" }}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.name)
                          }
                          disabled={isActionDisabled(item)}
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
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "32%" }}></Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <P sx={styleTitle}>Блокирoванные Пользователи</P>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "32%" }}>
                {viewBlockedPermissionsUser.map((item, index) => (
                  <Box key={index} sx={style}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedPermissions.includes(item.name)}
                          sx={{ color: "#1976d2" }}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.name)
                          }
                          disabled={isActionDisabled(item)}
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
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "32%" }}>
                {editBlockedUserPermission.map((item, index) => (
                  <Box key={index} sx={style}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedPermissions.includes(item.name)}
                          sx={{ color: "#1976d2" }}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.name)
                          }
                          disabled={isActionDisabled(item)}
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
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "32%" }}></Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <P sx={styleTitle}>Заказ</P>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "32%" }}>
                {viewOrderPermissions.map((item, index) => (
                  <Box key={index} sx={style}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedPermissions.includes(item.name)}
                          sx={{ color: "#1976d2" }}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.name)
                          }
                          disabled={isActionDisabled(item)}
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
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "32%" }}></Box>
              <Box sx={{ width: "32%" }}>
                {deleteOrderPermissions.map((item, index) => (
                  <Box key={index} sx={style}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedPermissions.includes(item.name)}
                          sx={{ color: "#1976d2" }}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.name)
                          }
                          disabled={isActionDisabled(item)}
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
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "32%" }}>
                {viewOrderSummaryPermissions.map((item, index) => (
                  <Box key={index} sx={style}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedPermissions.includes(item.name)}
                          sx={{ color: "#1976d2" }}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.name)
                          }
                          disabled={isActionDisabled(item)}
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
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "32%" }}></Box>
              <Box sx={{ width: "32%" }}></Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <P sx={styleTitle}>Депозит</P>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "32%" }}>
                {viewDeposit.map((item, index) => (
                  <Box key={index} sx={style}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedPermissions.includes(item.name)}
                          sx={{ color: "#1976d2" }}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.name)
                          }
                          disabled={isActionDisabled(item)}
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
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "32%" }}>
                {editDepositPermissions.map((item, index) => (
                  <Box key={index} sx={style}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedPermissions.includes(item.name)}
                          sx={{ color: "#1976d2" }}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.name)
                          }
                          disabled={isActionDisabled(item)}
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
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "32%" }}></Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {" "}
            <P sx={styleTitle}>Просмотр статистики рефералов</P>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "32%" }}>
                {viewRefUsers.map((item, index) => (
                  <Box key={index} sx={style}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedPermissions.includes(item.name)}
                          sx={{ color: "#1976d2" }}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.name)
                          }
                          disabled={isActionDisabled(item)}
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
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "32%" }}>
                {editReferralPercentPermission.map((item, index) => (
                  <Box key={index} sx={style}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedPermissions.includes(item.name)}
                          sx={{ color: "#1976d2" }}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.name)
                          }
                          disabled={isActionDisabled(item)}
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
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "32%" }}></Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {" "}
            <P sx={styleTitle}>Детали банка</P>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "32%" }}>
                {bankDetailsPermissions.map((item, index) => (
                  <Box key={index} sx={style}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedPermissions.includes(item.name)}
                          sx={{ color: "#1976d2" }}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.name)
                          }
                          disabled={isActionDisabled(item)}
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
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "32%" }}>
                {editBankPermission.map((item, index) => (
                  <Box key={index} sx={style}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedPermissions.includes(item.name)}
                          sx={{ color: "#1976d2" }}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.name)
                          }
                          disabled={isActionDisabled(item)}
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
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "32%" }}></Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <P sx={styleTitle}>Отчет</P>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "32%" }}>
                {viewReportPermissions.map((item, index) => (
                  <Box key={index} sx={style}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedPermissions.includes(item.name)}
                          sx={{ color: "#1976d2" }}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.name)
                          }
                          disabled={isActionDisabled(item)}
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
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "32%" }}></Box>
              <Box sx={{ width: "32%" }}></Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <P sx={styleTitle}>Платформы</P>
            <Box sx={{ width: "100%", display: "flex" }}>
              <Box sx={{ width: "32%" }}>
                {viewPlatforms.map((item, index) => (
                  <Box key={index} sx={style}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedPermissions.includes(item.name)}
                          sx={{ color: "#1976d2" }}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.name)
                          }
                          disabled={isActionDisabled(item)}
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
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "32%" }}></Box>
              <Box sx={{ width: "32%" }}></Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <P sx={styleTitle}>Блокированные карты</P>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ width: "32%" }}>
                {viewBlockedCards.map((item, index) => (
                  <Box key={index} sx={style}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checkedPermissions.includes(item.name)}
                          sx={{ color: "#1976d2" }}
                          onChange={(event) =>
                            handleCheckboxChange(event, item.name)
                          }
                          disabled={isActionDisabled(item)}
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
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "32%" }}></Box>
              <Box sx={{ width: "32%" }}></Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
export default PermissionsTable;
