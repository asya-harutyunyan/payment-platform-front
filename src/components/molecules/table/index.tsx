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
}

function DynamicTable<
  T extends {
    created_at?: string;
    status_by_admin?: string;
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

  const countDownrenderer: CountdownRendererFn = ({ completed, formatted }) => {
    if (completed) {
      return <span>Ваше время истекло.</span>;
    } else {
      return (
        <span>
          {t(isNeedBtnConfirmText ?? "")} {formatted.minutes}:
          {formatted.seconds}
        </span>
      );
    }
  };

  const getTimer = (created_at: string) => {
    return new Date(
      dayjs()
        .add(
          (dayjs.utc(created_at).add(20, "minutes").unix() -
            dayjs().utc().unix()) *
            1000,
          "milliseconds"
        )
        .format()
    );
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
                    {column.button ? (
                      <Button
                        variant={variant ?? "contained"}
                        text={t(textBtn ?? "see_more")}
                        sx={{ width: "120px" }}
                        onClick={() => handleClickBtn?.(row.id)}
                      />
                    ) : column.valueKey === "status_by_admin" &&
                      row.status_by_admin === "pending" ? (
                      <P
                        sx={{
                          width: "120px",
                          border: "1px solid gray",
                          fontSize: "12px",
                          padding: "5px",
                          borderRadius: "5px",
                        }}
                        onClick={() => {
                          handleClick?.(row.id);
                        }}
                      >
                        <Countdown
                          date={getTimer(row.created_at as string)}
                          renderer={countDownrenderer}
                        />
                      </P>
                    ) : column.column === "status" ||
                      column.column === "final_status" ||
                      column.column === "status_by_client" ||
                      column.column === "status_by_admin" ? (
                      <span
                        style={{
                          color: getStatusColor(
                            String(_.getPath?.(row, column.valueKey) || "-")
                          ),
                          fontWeight: 400,
                          textTransform: "uppercase",
                        }}
                      >
                        {String(_.getPath?.(row, column.valueKey) || "-")}
                      </span>
                    ) : (
                      t(
                        String(
                          _.getPath(row, column.valueKey) === null
                            ? "-"
                            : _.getPath(row, column.valueKey) || "-"
                        )
                      )
                    )}

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
