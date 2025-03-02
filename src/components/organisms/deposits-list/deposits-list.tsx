import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import { getDepositsThunk } from "@/store/reducers/user-info/depositSlice/thunks";
import { DataDeposits } from "@/store/reducers/user-info/depositSlice/types";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { FC, useEffect, useMemo, useState } from "react";
import { EmptyComponent } from "../empty-component";

export const DepositLists: FC = () => {
  const dispatch = useAppDispatch();
  const { deposits, total, loading } = useAppSelector((state) => state.deposit);
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      getDepositsThunk({
        page: page,
        per_page: user?.role === "admin" ? 50 : 5,
      })
    );
  }, [dispatch, page, user?.role]);

  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(getDepositsThunk({ page: page }));
    console.log(event, page);
  };

  const columns = useMemo<IColumn<DataDeposits>[]>(
    () => [
      {
        column: "name",
        valueKey: "user.name",
      },
      {
        column: "surname",
        valueKey: "user.surname",
      },
      {
        column: "processing_amount",
        currency: "₽",
        valueKey: "amount",
      },
      {
        column: "final_status",
        valueKey: "final_status",
      },
      {
        column: "key",
        button: "statuses",
      },
    ],
    []
  );
  const route = useLocation();

  const handleSingleOrder = (row?: number) => {
    if (route.pathname === "/deposit-list") {
      navigate({ to: `/deposit-list/${row}` });
    } else if (route.pathname === "/deposit-info") {
      navigate({ to: `/deposit-info/${row}` });
    }
  };
  return (
    <Box>
      <TaskHeader title={t("deposit_lists")} />
      {loading ? (
        <CircularIndeterminate />
      ) : total > 0 ? (
        <Box
          sx={{ width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" } }}
        >
          <DynamicTable
            isUser
            isNeedBtn
            columns={columns}
            data={deposits}
            handleClickBtn={handleSingleOrder}
            onChangePage={onChangePage}
          />

          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <PaginationOutlined
              page={page}
              onPageChange={onChangePage}
              count={total}
            />
          </Box>
        </Box>
      ) : (
        <EmptyComponent
          text={
            user?.role === "admin" ? "empty_deposit_admin" : "empty_deposit"
          }
          isButtonNeeded
          textBtn={"create_deposit"}
          handleClick={() => navigate({ to: "/steps" })}
        />
      )}
    </Box>
  );
};
