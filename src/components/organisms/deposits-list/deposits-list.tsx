import bg from "@/assets/images/modal.png";
import Button from "@/components/atoms/button";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { BasicModal } from "@/components/atoms/modal";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
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
    paginationAdminPage,
    onChangePageAdmin,
    pageAdmin,
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
    <Box pb="90px">
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <Box>
          <Box
            height={loading || pagination.total === 0 ? "auto" : "75vh"}
            sx={{
              overflowY: "auto",
              overflowX: { xs: "auto", lg: "hidden" },
              borderRadius: 2,
              minWidth: 0,
              scrollbarGutter: "stable",
            }}
          >
            <DynamicTable
              columns={user?.role === "client" ? columnsUser : columns}
              data={user?.role === "client" ? deposits : depositsAdmin}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              mt: "24px",
            }}
          >
            {pagination.total > 0 || paginationAdminPage.total > 0 ? (
              <PaginationOutlined
                page={user?.role === "client" ? page : pageAdmin}
                onPageChange={
                  user?.role === "client" ? onChangePage : onChangePageAdmin
                }
                count={
                  user?.role === "client"
                    ? pagination.last_page
                    : paginationAdminPage.last_page
                }
              />
            ) : (
              ""
            )}
          </Box>
        </Box>
      )}
      {pagination.total === 0 && user && user.role === "client" && !loading && (
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
