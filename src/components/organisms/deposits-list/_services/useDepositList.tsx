import Button from "@/components/atoms/button";

import { FormTextInput } from "@/components/atoms/input";
import { MonthPicker } from "@/components/atoms/month-picker";
import { SelectFieldWith } from "@/components/atoms/select";
import { IColumn } from "@/components/molecules/table";
import { getStatusColor, StatusOptions } from "@/components/utils/status-color";
import { useAuth } from "@/context/auth.context";
import { useUserContext } from "@/context/single.user.page/user.context";
import { deposit_schema } from "@/schema/deposit_schema";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getDepositsAdminThunk,
  getDepositsThunk,
} from "@/store/reducers/user-info/depositSlice/thunks";
import { DataDeposits } from "@/store/reducers/user-info/depositSlice/types";
import { H6, P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import DoneIcon from "@mui/icons-material/Done";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { z } from "zod";
type ICountdownRendererFn = (
  props: CountdownRenderProps,
  id?: number
) => React.ReactNode;

type FormData = z.infer<typeof deposit_schema>;

const useDepositInfo = () => {
  const { goToUserPage } = useUserContext();
  const dispatch = useAppDispatch();
  const { deposits, depositsAdmin, total, loading, lastPage, pagination } =
    useAppSelector((state) => state.deposit);
  const [open, setOpen] = useState<boolean>(false);
  const [addId, setAddId] = useState<number | null>(null);
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const { control, register, watch } = useForm<FormData>({
    resolver: zodResolver(deposit_schema),
    defaultValues: {
      name: "",
      surname: "",
      sort_by: "",
      status_by_admin: "",
      type: "",
    },
  });
  const name = watch("name");
  const amount = watch("sort_by");
  const statusByAdmin =
    watch("status_by_admin") === "all" ? "" : watch("status_by_admin");
  const type = watch("type");
  const surname = watch("surname");
  const month = watch("month");

  const [debouncedName] = useDebounce(name, 700);
  const [debouncedAmount] = useDebounce(amount, 700);
  const [debouncedStatusByAdmin] = useDebounce(statusByAdmin, 700);
  const [debouncedTyoe] = useDebounce(type, 700);
  const [debouncedSurname] = useDebounce(surname, 700);
  const [debouncedMonth] = useDebounce(
    month && dayjs(month).isValid() ? dayjs(month).format("YYYY/MM") : "",
    2000
  );
  const navigate = useNavigate();

  //need to change 1 useeffect
  useEffect(() => {
    const status =
      debouncedStatusByAdmin === "all" ? "" : debouncedStatusByAdmin;
    console.log(status, "status");

    const isValidMonth =
      dayjs(debouncedMonth).isValid() && debouncedMonth !== "";

    if (!isValidMonth) {
      if (user?.role === "client") {
        dispatch(
          getDepositsThunk({
            page: page,
            per_page: 50,
            name: debouncedName,
            surname: debouncedSurname,
            sort_by: debouncedAmount,
            status_by_admin: status,
            type: debouncedTyoe,
            month: "",
            sort_order: sort,
          })
        );
      } else {
        dispatch(
          getDepositsAdminThunk({
            page: page,
            per_page: 50,
            name: debouncedName,
            surname: debouncedSurname,
            sort_by: debouncedAmount,
            status_by_admin: status,
            type: debouncedTyoe,
            month: "",
            sort_order: sort,
          })
        );
      }
    } else {
      if (user?.role === "admin" || user?.role === "superAdmin") {
        dispatch(
          getDepositsAdminThunk({
            page: page,
            per_page: 50,
            name: debouncedName,
            surname: debouncedSurname,
            sort_by: debouncedAmount,
            status_by_admin: status,
            type: debouncedTyoe,
            month: debouncedMonth,
            sort_order: sort,
          })
        );
      } else {
        dispatch(
          getDepositsThunk({
            page: page,
            per_page: 50,
            name: debouncedName,
            surname: debouncedSurname,
            sort_by: debouncedAmount,
            status_by_admin: status,
            type: debouncedTyoe,
            month: debouncedMonth,
            sort_order: sort,
          })
        );
      }
    }
  }, [
    debouncedAmount,
    debouncedName,
    debouncedStatusByAdmin,
    debouncedTyoe,
    page,
    sort,
    debouncedMonth,
    user?.role,
  ]);

  useEffect(() => {
    if (user?.role === "client") {
      dispatch(
        getDepositsThunk({
          page: page,
          per_page: 50,
        })
      );
    } else {
      dispatch(
        getDepositsAdminThunk({
          page: page,
          per_page: 50,
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
    if (user?.role === "admin" || user?.role === "superAdmin") {
      dispatch(
        getDepositsAdminThunk({
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
    () =>
      [
        {
          column: "name",
          renderComponent: (row: DataDeposits) => {
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
                {row.user.name}
              </P>
            );
          },
          filters: () => {
            return (
              <FormTextInput
                control={control}
                {...register("name")}
                name="name"
                width="200px"
                style={{ input: { padding: "10px 14px" } }}
              />
            );
          },
        },
        {
          column: "surname",
          valueKey: "user.surname",
          filters: () => {
            return (
              <FormTextInput
                control={control}
                name="surname"
                width="200px"
                style={{ input: { padding: "10px 14px" } }}
              />
            );
          },
        },
        {
          column: "processing_amount",
          currency: "deposit_currency",
          valueKey: "amount",
          filters: () => {
            return (
              <FormTextInput
                control={control}
                {...register("sort_by")}
                name="sort_by"
                width="200px"
                style={{ input: { padding: "10px 14px" } }}
              />
            );
          },
        },

        user?.permissions.includes("deposits_view") && {
          renderComponent: (row: DataDeposits) => {
            return row.type === "FIAT" && row.status_by_admin === "pending" ? (
              <P
                sx={{
                  width: "120px",
                }}
              >
                {user.permissions.includes("deposits_edit") ? (
                  <Countdown
                    date={getTimer(row.created_at as string, "FIAT")}
                    renderer={(props) => {
                      return countDownrenderer(props, row.id);
                    }}
                  />
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
                )}
              </P>
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
          filters: () => {
            return (
              <Box>
                <P
                  fontWeight={"bold"}
                  sx={{ textWrap: "nowrap", paddingBottom: "10px" }}
                >
                  {t("status_by_admin_row")}
                </P>
                <SelectFieldWith
                  placeholder={"Виберите статус"}
                  name="status_by_admin"
                  control={control}
                  options={StatusOptions}
                />
              </Box>
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
          filters: () => {
            return (
              <FormTextInput
                control={control}
                {...register("type")}
                name="type"
                width="200px"
                style={{ input: { padding: "10px 14px" } }}
              />
            );
          },
        },
        {
          column: "left_amount",
          currency: "deposit_currency",
          valueKey: "processing_amount",
        },
        {
          column: () => (
            <Box>
              <P fontWeight={"bold"}>{t("sort_by_created_at")}</P>
              <MonthPicker name="month" control={control} />
            </Box>
          ),
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
          column: "blocked_card",
          renderComponent: (row: DataDeposits) => {
            const isBlocked = row.user?.bank_details?.[0]?.is_blocked === 1;
            return isBlocked ? <DoneIcon sx={{ color: "grey" }} /> : "-";
          },
        },
        {
          column: () => sortComponent(),
          renderComponent: (row: DataDeposits) => {
            return (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <P
                  sx={{
                    color: "black",
                    fontSize: "15px",
                    fontWeight: 500,
                    paddingRight: "5px",
                  }}
                >
                  {" "}
                  {dayjs(row.created_at).format("DD MMM YYYY HH:mm")}
                </P>
                {row.processing_amount === "0.00" ? (
                  <DoneIcon sx={{ color: "green" }} />
                ) : (
                  " "
                )}
              </Box>
            );
          },
        },
      ].filter(Boolean) as IColumn<DataDeposits>[],
    [user?.permissions]
  );

  const sortComponent = () => {
    return (
      <Box
        sx={{
          display: "flex",
        }}
      >
        <P sx={{ fontWeight: "bold", color: "primary.main" }}>
          {t("sort_by_created_at")}
        </P>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "40px",
            cursor: "pointer",
          }}
        >
          <ExpandLessIcon
            sx={{
              color: "primary.main",
              height: "20px",
              ":hover": {
                backgroundColor: "#f9f9f9",
              },
            }}
            onClick={() => setSort("ASC")}
          />
          <ExpandMoreIcon
            sx={{
              color: "primary.main",
              height: "20px",
              ":hover": {
                backgroundColor: "#f9f9f9",
              },
            }}
            onClick={() => setSort("DESC")}
          />
        </Box>
      </Box>
    );
  };
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
        column: () => (
          <Box>
            <P fontWeight={"bold"}>{t("sort_by_created_at")} </P>
            <MonthPicker name="month" control={control} />
          </Box>
        ),
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
    depositsAdmin,
  };
};

export default useDepositInfo;
