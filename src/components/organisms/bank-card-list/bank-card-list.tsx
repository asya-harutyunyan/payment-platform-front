import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getBankCardsThunk,
  unblockCardThunk,
} from "@/store/reducers/user-info/bankDetailsSlice/thunks";
import { BankCardsDetalis } from "@/store/reducers/user-info/depositSlice/types";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC, useEffect, useMemo, useState } from "react";
import { EmptyComponent } from "../empty-component";

export const BankCardLists: FC = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  const { bankCards, loading, total } = useAppSelector(
    (state) => state.bankDetails
  );
  useEffect(() => {
    dispatch(getBankCardsThunk({ page: page, per_page: 20 }));
  }, [dispatch, page, user?.role]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(getBankCardsThunk({ page: page, per_page: 20 }));
  };

  const columns = useMemo<IColumn<BankCardsDetalis>[]>(
    () => [
      {
        column: "card_holder",
        valueKey: "card_holder",
      },
      {
        column: "bank_name",
        valueKey: "bank_name",
      },
      {
        column: "card_number",
        valueKey: "card_number",
      },
      {
        column: "currency",
        valueKey: "currency",
      },
      {
        column: "is_blocked",
        valueKey: "is_blocked",
        button: "is_blocked",
      },
    ],
    []
  );
  const handleUnblockCard = (id?: number) => {
    if (user?.id && id) {
      dispatch(unblockCardThunk(id))
        .unwrap()
        .then(() => {
          dispatch(getBankCardsThunk({ page: page, per_page: 20 }));
        });
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("bank_card_list")} />
      {loading ? (
        <CircularIndeterminate />
      ) : bankCards.length > 0 ? (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
            marginTop: "20px",
          }}
        >
          <DynamicTable
            columns={columns}
            data={bankCards}
            textBtn={"Разблокировать"}
            variant="error"
            handleClickBtn={handleUnblockCard}
          />
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
    </Box>
  );
};
