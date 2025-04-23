import Button from "@/components/atoms/button";
import { IColumn } from "@/components/molecules/table";
import { getStatusColor } from "@/components/utils/status-color";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import { getDepositsThunk } from "@/store/reducers/user-info/depositSlice/thunks";
import { DataDeposits } from "@/store/reducers/user-info/depositSlice/types";
import { H6, P } from "@/styles/typography";
import DoneIcon from "@mui/icons-material/Done";
import { useLocation, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
type ICountdownRendererFn = (
  props: CountdownRenderProps,
  id?: number
) => React.ReactNode;

const useDepositInfo = () => {
  const dispatch = useAppDispatch();
  const { deposits, total, loading, lastPage, pagination } = useAppSelector(
    (state) => state.deposit
  );
  const [open, setOpen] = useState<boolean>(false);
  const [addId, setAddId] = useState<number | null>(null);

  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "admin") {
      dispatch(
        getDepositsThunk({
          page: page,
          per_page: 50,
        })
      );
    } else {
      dispatch(
        getDepositsThunk({
          page: page,
          per_page: 5,
        })
      );
    }
  }, [dispatch, page, user?.role]);

  const getTimer = (created_at: string, type?: "CRYPTO" | "FIAT") => {
    if (type) {
      if (type === "CRYPTO") {
        return new Date(
          dayjs()
            .add(
              (dayjs(created_at).add(15, "minutes").unix() - dayjs().unix()) *
                1000,
              "milliseconds"
            )
            .format()
        );
      }

      return new Date(
        dayjs()
          .add(
            (dayjs(created_at).add(40, "minutes").unix() - dayjs().unix()) *
              1000,
            "milliseconds"
          )
          .format()
      );
    }
    return new Date(
      dayjs()
        .add(
          (dayjs(created_at).add(15, "minutes").unix() - dayjs().unix()) * 1000,
          "milliseconds"
        )
        .format()
    );
  };
  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    if (user?.role === "admin") {
      dispatch(
        getDepositsThunk({
          page: page,
          per_page: 50,
        })
      );
    } else {
      dispatch(
        getDepositsThunk({
          page: page,
          per_page: 5,
        })
      );
    }
  };
  const handleOpen = () => setOpen(true);

  const countDownrenderer: ICountdownRendererFn = (
    { completed, formatted },
    id?: number
  ) => {
    if (completed) {
      return <H6 color="primary.main">Не оплачен</H6>;
    } else {
      return (
        <Button
          variant={"contained"}
          sx={{ fontSize: "0.7rem", width: "140px" }}
          onClick={() => {
            handleOpen();
            if (id) {
              setAddId(id);
            }
          }}
          text={`Подтвердить- ${formatted.minutes}:
          ${formatted.seconds}`}
        ></Button>
      );
    }
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
        currency: "deposit_currency",
        valueKey: "amount",
      },
      {
        column: "status_by_admin_row",
        renderComponent: (row: DataDeposits) => {
          return row.type === "FIAT" && row.status_by_admin === "pending" ? (
            <>
              {" "}
              <P
                sx={{
                  width: "120px",
                }}
              >
                <Countdown
                  date={getTimer(row.created_at as string, "FIAT")}
                  renderer={(props) => {
                    return countDownrenderer(props, row.id);
                  }}
                />
              </P>
            </>
          ) : (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                color: getStatusColor(row.status_by_admin ?? "-"),
                fontWeight: 400,
                textTransform: "capitalize",
              }}
            >
              {row.status_by_admin && t(row.status_by_admin)}
            </span>
          );
        },
      },
      {
        column: "type",
        renderComponent: (row: DataDeposits) => {
          return (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: 400,
                textTransform: "capitalize",
              }}
            >
              {row.type && t(row.type)}
            </span>
          );
        },
      },
      {
        column: "left_amount",
        currency: "deposit_currency",
        valueKey: "processing_amount",
      },
      {
        column: "key",
        renderComponent: (row: DataDeposits) => {
          return (
            <Button
              variant={"outlined"}
              text={t("see_more")}
              sx={{ width: "130px" }}
              onClick={() => handleSingleOrder?.(row.id)}
            />
          );
        },
      },
      {
        column: "key",
        renderComponent: (row: DataDeposits) => {
          return row.processing_amount === "0.00" ? (
            <DoneIcon sx={{ color: "green" }} />
          ) : null;
        },
      },
      {
        column: "blocked_card",
        renderComponent: (row: DataDeposits) => {
          const isBlocked = row.user?.bank_details?.[0]?.is_blocked === 1;
          return isBlocked ? <DoneIcon sx={{ color: "grey" }} /> : "-";
        },
      },
    ],
    []
  );
  const columnsUser = useMemo<IColumn<DataDeposits>[]>(
    () => [
      {
        column: "processing_amount",
        currency: "deposit_currency",
        valueKey: "amount",
      },
      {
        column: "status_by_user_row",
        renderComponent: (row: DataDeposits) => {
          return (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                color: getStatusColor(row.status_by_admin ?? "-"),
                fontWeight: 400,
                textTransform: "capitalize",
              }}
            >
              {row.status_by_admin && t(row.status_by_admin)}
            </span>
          );
        },
      },
      {
        column: "type",
        renderComponent: (row: DataDeposits) => {
          return (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: 400,
                textTransform: "capitalize",
              }}
            >
              {row.type && t(row.type)}
            </span>
          );
        },
      },
      {
        column: "left_amount",
        currency: "deposit_currency",
        valueKey: "processing_amount",
      },
      {
        column: "key",
        renderComponent: (row: DataDeposits) => {
          return (
            <Button
              variant={"outlined"}
              text={t("see_more")}
              sx={{ width: "130px" }}
              onClick={() => handleSingleOrder?.(row.id)}
            />
          );
        },
      },
      {
        column: "key",
        renderComponent: (row: DataDeposits) => {
          return row.processing_amount === "0.00" ? (
            <DoneIcon sx={{ color: "green" }} />
          ) : null;
        },
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
  return {
    dispatch,
    deposits,
    total,
    lastPage,
    loading,
    open,
    setOpen,
    addId,
    setAddId,
    user,
    page,
    setPage,
    navigate,
    getTimer,
    onChangePage,
    handleOpen,
    countDownrenderer,
    pagination,
    columns,
    columnsUser,
    route,
    handleSingleOrder,
  };
};

export default useDepositInfo;
