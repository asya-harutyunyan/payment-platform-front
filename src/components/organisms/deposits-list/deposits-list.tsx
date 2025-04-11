import bg from "@/assets/images/modal.png";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import { IColumn } from "@/components/molecules/table";
import DoneIcon from "@mui/icons-material/Done";

import Button from "@/components/atoms/button";
import { BasicModal } from "@/components/atoms/modal";
import DynamicTable from "@/components/molecules/table-new";
import TaskHeader from "@/components/molecules/title";
import { getStatusColor } from "@/components/utils/status-color";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  confirmDepositAdminThunk,
  getDepositsThunk,
} from "@/store/reducers/user-info/depositSlice/thunks";
import { DataDeposits } from "@/store/reducers/user-info/depositSlice/types";
import { H3, H6, P } from "@/styles/typography";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import React, { FC, useEffect, useMemo, useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
import { EmptyComponent } from "../empty-component";

type ICountdownRendererFn = (
  props: CountdownRenderProps,
  id?: number
) => React.ReactNode;

export const DepositLists: FC = () => {
  const dispatch = useAppDispatch();
  const { deposits, total, loading } = useAppSelector((state) => state.deposit);
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
              {row.status_by_admin}
            </span>
          );
        },
      },
      {
        column: "type",
        valueKey: "type",
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
        valueKey: "done_arrow",
        renderComponent: (row: DataDeposits) => {
          return row.processing_amount === "0.00" ? (
            <DoneIcon sx={{ color: "green" }} />
          ) : null;
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
        valueKey: "status_by_admin",
      },
      {
        column: "type",
        valueKey: "type",
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
        column: "done_arrow",
        valueKey: "done_arrow",
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

  // const refetchData = () => {
  //   if (user?.role === "admin") {
  //     dispatch(
  //       getDepositsThunk({
  //         page: page,
  //         per_page: 50,
  //       })
  //     );
  //   } else {
  //     dispatch(
  //       getDepositsThunk({
  //         page: page,
  //         per_page: 5,
  //       })
  //     );
  //   }
  // };
  const handleConfirm = (id?: number) => {
    if (id) {
      dispatch(confirmDepositAdminThunk(id))
        .unwrap()
        .then(() => {
          enqueueSnackbar(t("confirm_success"), {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          dispatch(getDepositsThunk({ page }));
        })
        .catch(() => {
          enqueueSnackbar(t("something_went_wrong"), {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        });
    }
  };
  return (
    <Box>
      <TaskHeader title={t("deposit_lists")} />
      {loading ? (
        <CircularIndeterminate />
      ) : total > 0 ? (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
          }}
        >
          {/* <DynamicTable
            columns={user?.role === "client" ? columnsUser : columns}
            data={deposits}
            handleSinglePage={handleSingleOrder}
            onChangePage={onChangePage}
            refetchData={refetchData}
            handleClick={handleConfirm}
            confirmText={"deposit_confirm_text"}
          /> */}
          <DynamicTable
            columns={user?.role === "client" ? columnsUser : columns}
            data={deposits}
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
      <BasicModal
        handleClose={() => setOpen(false)}
        open={open}
        bg={bg}
        width="50%"
        minHeight="200px"
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
          {t("deposit_confirm_text")}
        </H3>
        <Button
          variant={"outlinedWhite"}
          sx={{ fontSize: "0.7rem", marginTop: "20px" }}
          onClick={() => {
            if (addId) {
              handleConfirm(addId);
            }
          }}
          text={t("confirm")}
        />
      </BasicModal>
    </Box>
  );
};
