import { AccordionUsage } from "@/components/atoms/accordeon";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { getWalletsThunk } from "@/store/reducers/admin/walletSlice/thunks";
import { useAppDispatch, useAppSelector } from "@/store/reducers/store";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, useEffect, useState } from "react";
import { CreateWallet } from "../create-wallet";

export const Wallet: FC = () => {
  const { wallet, total } = useAppSelector((state) => state.wallet);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getWalletsThunk({ page: page }));
  }, []);
  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(getWalletsThunk({ page }));
  };

  const titles = ["network", "currency", "address"];
  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("wallet_list")} />
      <AccordionUsage title={"add_wallet"}>
        <CreateWallet />
      </AccordionUsage>
      <Box
        sx={{
          width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
          overflowX: "auto",
          marginTop: "20px",
        }}
      >
        <DynamicTable columns={titles} data={wallet} />
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          {" "}
          <PaginationOutlined onPageChange={onChangePage} count={total} />
        </Box>
      </Box>
    </Box>
  );
};
