import Button from "@/components/atoms/button";
import { getStatusColor } from "@/components/utils/status-color";
import { useAuth } from "@/context/auth.context";
import { CURRENCY } from "@/enum/currencies.enum";
import { P } from "@/styles/typography";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useLocation } from "@tanstack/react-router";
import dayjs from "dayjs";
import { t } from "i18next";
import React from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";
// @ts-expect-error no types for this lib
import _ from "underscore-contrib";

export interface IColumn<T> {
  column?: keyof T;
  label?: string;
  valueKey?: string;
  currency?: string;
  button?: string;
}
type ButtonVariant =
  | "text"
  | "contained"
  | "outlined"
  | "gradient"
  | "outlinedWhite"
  | "outlinedBlue"
  | "error";

interface TableProps<T extends { id?: number; created_at?: string }> {
  columns: IColumn<T>[];
  data: T[];
  onChangePage?: (event: React.ChangeEvent<unknown>, page: number) => void;
  onItemClick?: (row: T) => void;
  total?: number;
  isNeedBtn?: boolean;
  text?: string;
  textBtn?: string;
  handleClick?: (value?: number) => void;
  handleClickBtn?: (id?: number) => void;
  isNeedBtnConfirmText?: string;
  isNeedBtnConfirm?: boolean;
  variant?: ButtonVariant;
  refetchData?: () => void;
}

function DynamicTable<
  T extends {
    created_at?: string;
    status_by_admin?: string;
    final_status?: string;
    status_by_client?: string;
    id?: number;
    textBtn?: string;
    handleClick?: () => void;
    isNeedBtnConfirmText?: string;
    isNeedBtnConfirm?: boolean;
    handleClickBtn?: (id?: number) => void;
    variant?: ButtonVariant;
  },
>({
  columns,
  data,
  textBtn,
  variant,
  isNeedBtnConfirmText,
  handleClick,
  handleClickBtn,
}: TableProps<T>) {
  const location = useLocation();
  const route = useLocation();
  const { user } = useAuth();
  // const [timerId, setTimerId] = useState<number | null>(null);

  const countDownrenderer: CountdownRendererFn = (
    { completed, formatted },
    id?: number
  ) => {
    if (completed) {
      return (
        <Button
          text="время истекло."
          sx={{ fontSize: "0.7rem" }}
          variant={"contained"}
        ></Button>
      );
    } else {
      return (
        <Button
          variant={"contained"}
          sx={{ fontSize: "0.7rem" }}
          onClick={() => {
            handleClick?.(id);
            // if (timerId) {
            // handleClick?.(id);
            // setTimerId(null);
            // }
          }}
          text={`Подтвердить - ${t(isNeedBtnConfirmText ?? "")} ${formatted.minutes}:
          ${formatted.seconds}`}
        ></Button>
      );
    }
  };

  const getTimer = (created_at: string) => {
    return new Date(
      dayjs()
        .add(
          (dayjs(created_at).add(20, "minutes").unix() - dayjs().unix()) * 1000,
          "milliseconds"
        )
        .format()
    );
  };

  const renderStatusColumn = (column: IColumn<T>, row: T) => {
    if (column.button) {
      return (
        <Button
          variant={variant ?? "outlined"}
          text={t(textBtn ?? "see_more")}
          sx={{ width: "120px" }}
          onClick={() => handleClickBtn?.(row.id)}
        />
      );
    } else if (
      column.column === "order_status_user" &&
      row.status_by_client === "pending"
    ) {
      return (
        <P
          sx={{
            width: "120px",
          }}
        >
          <Countdown
            date={getTimer(row.created_at as string)}
            renderer={(props) => {
              // if (row.id !== undefined && row.status_by_client === "pending") {
              //   setTimerId(row.id);
              // }
              //@ts-expect-error need to fix types
              return countDownrenderer(props, row.id);
            }}
          />
        </P>
      );
    } else if (
      (column.column === "order_status_admin" ||
        column.column === "status_by_admin_row") &&
      row.status_by_admin === "pending"
    ) {
      return (
        <P
          sx={{
            width: "120px",
          }}
        >
          <Countdown
            date={getTimer(row.created_at as string)}
            renderer={(props) => {
              // if (row.id !== undefined && row.status_by_admin === "pending") {
              //   setTimerId(row.id);
              // }
              //@ts-expect-error need to fix types
              return countDownrenderer(props, row.id);
            }}
          />
        </P>
      );
    }
    switch (column.column) {
      case "status":
      case "final_status":
      case "status_by_client":
      case "status_by_admin_row":
      case "status_by_user_row":
      case "order_status_user":
      case "order_status_admin":
        return (
          <span
            style={{
              color: getStatusColor(
                String(_.getPath?.(row, column.valueKey) || "-")
              ),
              fontWeight: 400,
              textTransform: "uppercase",
            }}
          >
            {t(String(_.getPath?.(row, column.valueKey)) || "-")}
          </span>
        );
      default:
        return (
          <span>
            {t(
              String(
                _.getPath(row, column.valueKey) === null
                  ? "-"
                  : _.getPath(row, column.valueKey) || "-"
              )
            )}
          </span>
        );
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{
            "& td": {
              padding:
                user?.role === "admin" &&
                location.pathname !== "/wallet-list" &&
                location.pathname !== "/user-list"
                  ? "8px"
                  : "16px",
            },
          }}
        >
          <TableHead>
            <TableRow sx={{ borderBottom: "3px solid #041F44" }}>
              {columns?.map((column, index) => (
                <TableCell
                  key={index}
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                  {t(column.column as string)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  "&:hover": {
                    backgroundColor:
                      route.pathname === "/wallet-list" ||
                      route.pathname === "/user-list"
                        ? "transparent"
                        : "#e0e0e0",
                  },
                  cursor:
                    route.pathname === "/wallet-list" ||
                    route.pathname === "/user-list"
                      ? "auto"
                      : "pointer",
                }}
              >
                {columns?.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    sx={{
                      fontSize: "15px",
                      maxWidth: "200px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      color: "#7d7d7d",
                    }}
                  >
                    {renderStatusColumn(column, row)}
                    {column.currency
                      ? ` ${
                          CURRENCY[
                            _.getPath?.(
                              row,
                              column.currency
                            ) as keyof typeof CURRENCY
                          ] ?? "-"
                        }`
                      : ""}
                  </TableCell>
                ))}

                {}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      ></Box>
    </>
  );
}

export default DynamicTable;
