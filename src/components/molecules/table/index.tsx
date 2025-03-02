import Button from "@/components/atoms/button";
import { useAuth } from "@/context/auth.context";
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
import { useLocation, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { t } from "i18next";
import React from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";
// @ts-expect-error no types for this lib
import _ from "underscore-contrib";

export interface IColumn<T> {
  column: keyof T;
  label?: string;
  valueKey: string;
  currency?: string;
}

interface TableProps<T extends { id?: number; created_at?: string }> {
  columns: IColumn<T>[];
  data: T[];
  onChangePage?: (event: React.ChangeEvent<unknown>, page: number) => void;
  onItemClick?: (row: T) => void;
  total?: number;
  isUser?: boolean;
  isNeedBtn?: boolean;
  text?: string;
  textBtn?: string;
  handleClick?: (value?: number) => void;
  isNeedBtnConfirmText?: string;
  isNeedBtnConfirm?: boolean;
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
  },
>({
  columns,
  handleClick,
  data,
  isNeedBtn,
  textBtn,
  text,
  isNeedBtnConfirmText,
  isNeedBtnConfirm,
}: TableProps<T>) {
  const navigate = useNavigate();
  const location = useLocation();
  const route = useLocation();
  const { user } = useAuth();
  const handleUserInformation = (row: T) => {
    if (route.pathname === "/deposit-list") {
      navigate({ to: `/deposit-list/${row.id}` });
    } else if (route.pathname === "/order-list") {
      navigate({ to: `/order-list/${row.id}` });
    } else if (route.pathname === "/deposit-info") {
      navigate({ to: `/deposit-info/${row.id}` });
    } else if (route.pathname === "/orders") {
      navigate({ to: `/orders/${row.id}` });
    }
  };

  const countDownrenderer: CountdownRendererFn = ({ completed, formatted }) => {
    if (completed) {
      return <span>Your time is end</span>;
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
                {columns?.map((column, colIndex) =>
                  column.valueKey === "status_by_admin" &&
                  row.status_by_admin === "pending" &&
                  isNeedBtnConfirm ? (
                    <TableCell sx={{}}>
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
                        {t(!isNeedBtnConfirmText ? "see_more" : "")}{" "}
                        <Countdown
                          date={getTimer(row.created_at as string)}
                          renderer={countDownrenderer}
                        />
                      </P>
                    </TableCell>
                  ) : (
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
                      {column.column === "Action" ? (
                        <Button variant={"text"} text={text ?? "text"} />
                      ) : (
                        String(_.getPath(row, column.valueKey)) || "-"
                      )}{" "}
                      {column.currency ? column.currency : ""}
                    </TableCell>
                  )
                )}
                {isNeedBtn && (
                  <TableCell>
                    <Button
                      variant={"contained"}
                      text={t(textBtn ?? "see_more")}
                      sx={{ width: "120px" }}
                      onClick={() => {
                        if (
                          route.pathname === "/order-list" ||
                          route.pathname === "/deposit-info" ||
                          route.pathname === "/orders" ||
                          route.pathname === "/deposit-list"
                        ) {
                          handleUserInformation(row);
                        }
                      }}
                    />
                  </TableCell>
                )}
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
