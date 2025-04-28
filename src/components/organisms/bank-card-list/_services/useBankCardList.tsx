import Button from "@/components/atoms/button";
import { IColumn } from "@/components/molecules/table";
import { useAuth } from "@/context/auth.context";
import { useUserContext } from "@/context/single.user.page/user.context";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  blockCardThunk,
  getBankCardsThunk,
  unblockCardThunk,
} from "@/store/reducers/user-info/bankDetailsSlice/thunks";
import { BankCardsDetalis } from "@/store/reducers/user-info/depositSlice/types";
import { P } from "@/styles/typography";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";

const useBankCardList = () => {
  const { goToUserPage } = useUserContext();

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
        renderComponent: (row: BankCardsDetalis) => {
          return (
            <P
              sx={{
                color: "black",
                fontSize: "15px",
                fontWeight: 500,
                ":hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={() => row.id && goToUserPage(row.id)}
            >
              {row.card_holder}
            </P>
          );
        },
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
          return !row.is_blocked ? (
            <Button
              variant={"error"}
              text={t("block")}
              sx={{ width: "130px" }}
              onClick={() => handleBlockCard?.(row.id)}
            />
          ) : (
            <Button
              variant={"outlined"}
              text={t("unblock")}
              sx={{ width: "130px" }}
              onClick={() => handleUnblockCard?.(row.id)}
            />
          );
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
          enqueueSnackbar("Карта разблокировано", {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        })
        .catch(() => {
          enqueueSnackbar(t("something_went_wrong"), {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        });
    }
  };
  const handleBlockCard = (id?: number) => {
    if (user?.id && id) {
      dispatch(blockCardThunk(id))
        .unwrap()
        .then(() => {
          dispatch(getBankCardsThunk({ page: page, per_page: 20 }));

          enqueueSnackbar("Карта заблокировано", {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        })
        .catch(() => {
          enqueueSnackbar(t("something_went_wrong"), {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
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
    user,
  };
};

export default useBankCardList;
