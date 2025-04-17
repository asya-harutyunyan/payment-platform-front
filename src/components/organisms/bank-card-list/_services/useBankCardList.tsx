import Button from "@/components/atoms/button";
import { IColumn } from "@/components/molecules/table";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  blockCardThunk,
  getBankCardsThunk,
  unblockCardThunk,
} from "@/store/reducers/user-info/bankDetailsSlice/thunks";
import { BankCardsDetalis } from "@/store/reducers/user-info/depositSlice/types";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";

const useBankCardList = () => {
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
  return {
    bankCards,
    loading,
    total,
    setPage,
    onChangePage,
    page,
    columns,
  };
};

export default useBankCardList;
