import Button from "@/components/atoms/button";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import { IColumn } from "@/components/molecules/table";
import DynamicTable from "@/components/molecules/table-new";
import TaskHeader from "@/components/molecules/title";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  blockCardThunk,
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
        renderComponent: (row: BankCardsDetalis) => {
          if (row.is_blocked) {
            return (
              <Button
                variant={"error"}
                text={t("block")}
                sx={{ width: "130px" }}
                onClick={() => handleBlockCard?.(row.id)}
              />
            );
          } else {
            return (
              <Button
                variant={"outlined"}
                text={t("unblock")}
                sx={{ width: "130px" }}
                onClick={() => handleUnblockCard?.(row.id)}
              />
            );
          }
        },
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
  const handleBlockCard = (id?: number) => {
    if (user?.id && id) {
      dispatch(blockCardThunk(id))
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
            // textBtn={"Разблокировать"}
            // variant="error"
            // handleClickBtn={handleUnblockCard}
            // handleSecondClickBtn={handleBlockCard}
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
