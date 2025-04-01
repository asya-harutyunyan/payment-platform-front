import bg from "@/assets/images/modal.png";
import Button from "@/components/atoms/button";
import { CopyButton } from "@/components/atoms/copy-btn";
import { BasicModal } from "@/components/atoms/modal";
import { getStatusColor } from "@/components/utils/status-color";
import { useAuth } from "@/context/auth.context";
import { CURRENCY } from "@/enum/currencies.enum";
import { H3, H6, P } from "@/styles/typography";
import DoneIcon from "@mui/icons-material/Done";
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
import React, { useState } from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";

// @ts-expect-error no types for this lib
import _ from "underscore-contrib";

export interface IColumn<T> {
  column?: keyof T;
  label?: string;
  valueKey?: string;
  currency?: string;
  button?: string;
  done?: string;
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
  handleSecondClickBtn?: (id?: number) => void;
  isNeedBtnConfirmText?: string;
  isNeedBtnConfirm?: boolean;
  variant?: ButtonVariant;
  confirmText?: string;
  refetchData?: () => void;
  handleSinglePage?: (id?: number) => void;
  deleteOrder?: (id?: number) => void;
  handleDeleteOrder?: (id?: number) => void;
  handleDeleteWallet?: (id?: number) => void;
}

function DynamicTable<
  T extends {
    created_at?: string;
    status_by_admin?: string;
    final_status?: string;
    is_blocked?: number;
    status_by_client?: string;
    id?: number;
    processing_amount?: string;
    textBtn?: string;
    handleClick?: () => void;
    isNeedBtnConfirmText?: string;
    isNeedBtnConfirm?: boolean;
    done_arrow?: string;
    handleClickBtn?: (id?: number) => void;
    handleSecondClickBtn?: (id?: number) => void;
    handleSinglePage?: (id?: number) => void;
    variant?: ButtonVariant;
    deleteOrder?: (id?: number) => void;
    handleDeleteOrder?: (id?: number) => void;
    handleDeleteWallet?: (id?: number) => void;
    type?: "CRYPTO" | "FIAT";
  },
>({
  columns,
  data,
  textBtn,
  variant,
  confirmText,
  isNeedBtnConfirmText,
  handleClick,
  handleClickBtn,
  handleSecondClickBtn,
  handleSinglePage,
  handleDeleteOrder,
  handleDeleteWallet,
}: TableProps<T>) {
  const location = useLocation();
  const route = useLocation();
  const { user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [addId, setAddId] = useState<number | null>(null);

  const countDownrenderer: CountdownRendererFn = (
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
          text={`Подтвердить - ${t(isNeedBtnConfirmText ?? "")} ${formatted.minutes}:
          ${formatted.seconds}`}
        ></Button>
      );
    }
  };
  const handleConfirmItem = (id?: number) => {
    handleClick?.(id);
    setAddId(null);
  };

  const handleOpen = () => setOpen(true);
  const getTimer = (created_at: string, type?: "CRYPTO" | "FIAT") => {
    console.log(type, 11111);
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

  const renderStatusColumn = (column: IColumn<T>, row: T) => {
    if (column.button === "is_blocked") {
      if (row.is_blocked === 0) {
        return (
          <Button
            variant={"error"}
            text={t("block")}
            sx={{ width: "130px" }}
            onClick={() => handleSecondClickBtn?.(row.id)}
          />
        );
      } else {
        return (
          <Button
            variant={"outlined"}
            text={t("unblock")}
            sx={{ width: "130px" }}
            onClick={() => handleClickBtn?.(row.id)}
          />
        );
      }
    } else if (column.button === "delete_wallet") {
      return (
        <Button
          variant={"error"}
          text={"Удалить"}
          sx={{ width: "130px" }}
          onClick={() => handleDeleteWallet?.(row.id)}
        />
      );
    } else if (column.button && column.button !== "delete_order") {
      return (
        <Button
          variant={variant ?? "outlined"}
          text={t(textBtn ?? "see_more")}
          sx={{ width: "130px" }}
          onClick={() => handleSinglePage?.(row.id)}
        />
      );
    } else if (column.button === "delete_order") {
      return (
        <Button
          variant={"error"}
          text={"Удалить"}
          sx={{ width: "130px" }}
          onClick={() => handleDeleteOrder?.(row.id)}
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
              //@ts-expect-error need to fix types
              return countDownrenderer(props, row.id);
            }}
          />
        </P>
      );
    } else if (
      column.column === "status_by_admin_row" &&
      row.status_by_admin === "pending" &&
      row.type === "FIAT"
    ) {
      return (
        <P
          sx={{
            width: "120px",
          }}
        >
          <Countdown
            date={getTimer(row.created_at as string, "FIAT")}
            renderer={(props) => {
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
            overflow: "auto",
            "& td": {
              padding:
                user?.role === "admin" &&
                location.pathname !== "/wallet-list" &&
                location.pathname !== "/user-list" &&
                location.pathname !== "/bank-card-list"
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
                  {column.column !== "done_arrow" && t(column.column as string)}
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
                      minWidth: "150px",
                      fontSize: "15px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      color: "#7d7d7d",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center" }}>
                      {" "}
                      {column.column !== "done_arrow" &&
                        renderStatusColumn(column, row)}
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
                      {column.column === "id" && row.id && (
                        <CopyButton
                          text={_.getPath(row, column.valueKey)}
                          color={"#7d7d7d"}
                        />
                      )}
                      {column.valueKey === "done_arrow" &&
                        row.processing_amount === "0.00" &&
                        row.status_by_admin !== "failed" &&
                        row.status_by_admin !== "expired" && (
                          <DoneIcon sx={{ color: "green" }} />
                        )}
                    </span>
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
          {confirmText && t(confirmText)}
        </H3>
        <Button
          variant={"outlinedWhite"}
          sx={{ fontSize: "0.7rem", marginTop: "20px" }}
          onClick={() => {
            if (addId) {
              handleConfirmItem(addId);
            }
          }}
          text={t("confirm")}
        />
      </BasicModal>
    </>
  );
}

export default DynamicTable;
