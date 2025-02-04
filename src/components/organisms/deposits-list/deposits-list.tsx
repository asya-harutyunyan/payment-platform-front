import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAppDispatch, useAppSelector } from "@/store/reducers/store";
import { getDepositsThunk } from "@/store/reducers/user-info/depositSlice/thunks";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, ReactNode, useEffect, useState } from "react";
import { EmptyComponent } from "../empty-component";

export const DepositLists: FC = () => {
  const dispatch = useAppDispatch();
  const { deposits, total } = useAppSelector((state) => state.deposit);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getDepositsThunk({ page: page }));
  }, []);
  useEffect(() => {
    console.log(deposits);
  }, [deposits]);

  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(getDepositsThunk({ page: page }));
    console.log(event, page);
  };

  const title = ["address", "currency", "network", "qr_code"];
  return (
    <Box>
      <TaskHeader title={t("user_list_title")} />
      {!deposits ? (
        <CircularIndeterminate />
      ) : deposits.length > 0 ? (
        <Box
          sx={{ width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" } }}
        >
          <DynamicTable
            isUser
            columns={title}
            data={deposits as unknown as Record<string, ReactNode>[]}
            onChangePage={onChangePage}
          />

          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            {" "}
            <PaginationOutlined onPageChange={onChangePage} count={total} />
          </Box>
        </Box>
      ) : (
        <EmptyComponent />
      )}
    </Box>
  );
};
