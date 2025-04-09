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
import { t } from "i18next";
import React from "react";

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
    type?: string;
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
  },
>({ columns, data }: TableProps<T>) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{
            overflow: "auto",
            "& td": {
              padding: "16px",
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
                    backgroundColor: "#e0e0e0",
                  },
                  cursor: "pointer",
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
                      {_.getPath(row, column.valueKey)}
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
    </>
  );
}

export default DynamicTable;
