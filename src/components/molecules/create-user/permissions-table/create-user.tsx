/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useEffect, useState } from "react";
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
  width: "30%",
  height: "70px",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const PermissionsTable = ({ setValue }: { setValue: any }) => {
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
  } = useCreateUser();

  const [checkedPermissions, setCheckedPermissions] = useState<string[]>([]);
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
    ...deleteWalletPermissions,
    ...deleteOrderPermissions,
  ];

  const viewPermissions = [
    ...viewPlatforms,
    ...viewRefUsers,
    ...viewWalletPermissions,
    ...viewOrderPermissions,
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
          marginBottom: "30px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box sx={styleHead}>
          <H4 color="primary.main">Просмотр</H4>
        </Box>
        <Box sx={styleHead}>
          <H4 color="primary.main">Редактирование</H4>
        </Box>
        <Box sx={styleHead}>
          <H4 color="primary.main">Удалениe</H4>
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
            <Box sx={{ width: "100%", display: "flex" }}>
              <Box sx={{ width: "33%" }}>
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
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "33%" }}>
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
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "33%" }}>
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
                        <Typography sx={{ fontSize: "0.9rem" }}>
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
            <Box sx={{ width: "100%", display: "flex" }}>
              <Box sx={{ width: "33%" }}>
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
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "33%" }}>
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
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "33%" }}></Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <P sx={styleTitle}>Блокираванные Пользователи</P>
            <Box sx={{ width: "100%", display: "flex" }}>
              <Box sx={{ width: "33%" }}>
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
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "33%" }}>
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
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "33%" }}></Box>
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
            <Box sx={{ width: "100%", display: "flex" }}>
              <Box sx={{ width: "33%" }}>
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
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "33%" }}></Box>
              <Box sx={{ width: "33%" }}>
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
                        <Typography sx={{ fontSize: "0.9rem" }}>
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
            <P sx={styleTitle}>Депозит</P>
            <Box sx={{ width: "100%", display: "flex" }}>
              <Box sx={{ width: "33%" }}>
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
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "33%" }}>
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
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "33%" }}></Box>
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
            <P sx={styleTitle}>Преглашенные пользовательи</P>
            <Box sx={{ width: "100%", display: "flex" }}>
              <Box sx={{ width: "33%" }}>
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
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "33%" }}>
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
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "33%" }}></Box>
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
            <Box sx={{ width: "100%", display: "flex" }}>
              <Box sx={{ width: "33%" }}>
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
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "33%" }}>
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
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "33%" }}></Box>
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
            <Box sx={{ width: "100%", display: "flex" }}>
              <Box sx={{ width: "33%" }}>
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
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "33%" }}></Box>
              <Box sx={{ width: "33%" }}></Box>
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
              <Box sx={{ width: "33%" }}>
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
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "33%" }}></Box>
              <Box sx={{ width: "33%" }}></Box>
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
            <Box sx={{ width: "100%", display: "flex" }}>
              <Box sx={{ width: "33%" }}>
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
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          {t(item.name)}
                        </Typography>
                      }
                    />
                  </Box>
                ))}
              </Box>
              <Box sx={{ width: "33%" }}></Box>
              <Box sx={{ width: "33%" }}></Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
export default PermissionsTable;
