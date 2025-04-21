import bg from "@/assets/images/modal.png";
import { AccordionUsage } from "@/components/atoms/accordeon";
import Button from "@/components/atoms/button";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { BasicModal } from "@/components/atoms/modal";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";

import { getWalletsThunk } from "@/store/reducers/user-info/walletSlice/thunks";
import { H3 } from "@/styles/typography";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, useEffect } from "react";
import { CreateWallet } from "../create-wallet";
import { EmptyComponent } from "../empty-component";
import useWallet from "./_services/useWallet";

export const Wallet: FC = () => {
  const {
    columns,
    handleDeleteItem,
    onChangePage,
    user,
    open,
    setOpen,
    page,
    dispatch,
    wallet,
    total,
    loading,
  } = useWallet();
  useEffect(() => {
    dispatch(getWalletsThunk({ page: page, per_page: 20 }));
  }, [dispatch, page, user?.role]);
  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("wallet_list")} />
      <AccordionUsage title={"add_wallet"}>
        {(onClose) => <CreateWallet page={page} onClose={onClose} />}
      </AccordionUsage>
      {loading ? (
        <CircularIndeterminate />
      ) : wallet.length > 0 ? (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
            marginTop: "20px",
          }}
        >
          <DynamicTable columns={columns} data={wallet} />
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <PaginationOutlined
              onPageChange={onChangePage}
              count={total}
              page={page}
            />
          </Box>
        </Box>
      ) : (
        <EmptyComponent text={"no_data"} />
      )}
      <BasicModal
        handleClose={() => setOpen(false)}
        open={open}
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
          {t("delete_wallet_modal")}
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
            onClick={() => setOpen(false)}
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
            onClick={() => handleDeleteItem()}
          />
        </Box>
      </BasicModal>
    </Box>
  );
};
