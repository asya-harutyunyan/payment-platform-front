import bg from "@/assets/images/modal.png";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";

import Button from "@/components/atoms/button";
import { BasicModal } from "@/components/atoms/modal";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import {
  confirmDepositAdminThunk,
  getDepositsThunk,
} from "@/store/reducers/user-info/depositSlice/thunks";
import { H3 } from "@/styles/typography";
import { Box } from "@mui/material";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { FC } from "react";
import { EmptyComponent } from "../empty-component";
import useDepositList from "./_services/useDepositList";

export const DepositLists: FC = () => {
  const {
    dispatch,
    deposits,
    pagination,
    loading,
    open,
    setOpen,
    addId,
    user,
    page,
    navigate,
    onChangePage,
    columns,
    depositsAdmin,
    columnsUser,
  } = useDepositList();

  const handleConfirm = (id?: number) => {
    if (id) {
      dispatch(confirmDepositAdminThunk(id))
        .unwrap()
        .then(() => {
          enqueueSnackbar(t("confirm_success"), {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          dispatch(getDepositsThunk({ page }));
          setOpen(false);
        })
        .catch(() => {
          enqueueSnackbar(t("something_went_wrong"), {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          setOpen(false);
        });
    }
  };
  return (
    <Box>
      <TaskHeader title={t("deposit_lists")} />
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
          }}
        >
          <DynamicTable
            columns={user?.role === "client" ? columnsUser : columns}
            data={user?.role === "client" ? deposits : depositsAdmin}
          />
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <PaginationOutlined
              page={page}
              onPageChange={onChangePage}
              count={pagination.last_page}
            />
          </Box>
        </Box>
      )}
      {pagination.total === 0 && user && user.role === "client" && (
        <EmptyComponent
          text={"empty_deposit"}
          isButtonNeeded
          textBtn={"create_deposit"}
          handleClick={() => navigate({ to: "/steps" })}
        />
      )}
      <BasicModal
        handleClose={() => setOpen(false)}
        open={open}
        bg={bg}
        width="50%"
        minHeight="200px"
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
          {t("deposit_confirm_text")}
        </H3>
        <Button
          variant={"outlinedWhite"}
          sx={{ fontSize: "0.7rem", marginTop: "20px" }}
          onClick={() => {
            if (addId) {
              handleConfirm(addId);
            }
          }}
          text={t("confirm")}
        />
      </BasicModal>
    </Box>
  );
};
