import { getStatusColor } from "@/components/utils/status-color";
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
import { t } from "i18next";
import { ReactNode } from "react";
import { Path } from "react-hook-form";

// @ts-expect-error no types for this lib
import _ from "underscore-contrib";

export interface IColumn<T> {
  column?: keyof T | (() => ReactNode);
  label?: string;
  valueKey?: string;
  filters?: (row?: T) => ReactNode;
  currencyManual?: string;
  currency?: string;
  renderComponent?: (row: T) => ReactNode;
}
export interface TColumn<T> {
  column?: keyof T | (() => ReactNode);
  label?: string;
  valueKey?: Path<T>;
  filters?: (row?: T) => ReactNode;
  currencyManual?: string;
  currency?: string;
  renderComponent?: (row: T) => ReactNode;
}

interface TableProps<T extends { id?: number; created_at?: string }> {
  columns: IColumn<T>[];
  data: T[];
  refetchData?: () => void;
  renderSortComponent?: ReactNode;
  renderBottomComponent?: () => JSX.Element;
}

function DynamicTable<
  T extends {
    created_at?: string;
    status_by_admin?: string;
    type?: string;
    final_status?: string;
    name?: string;
    is_blocked?: number;
    status_by_client?: string;
    processing_amount?: string;
    textBtn?: string;
    isNeedBtnConfirmText?: string;
    isNeedBtnConfirm?: boolean;
    done_arrow?: string;
    by_name?: string;
  },
>({
  columns,
  data,
  renderSortComponent,
  renderBottomComponent,
}: TableProps<T>) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{
            overflow: "auto",
          }}
        >
          <TableHead
            sx={{
              width: "100%",
            }}
          >
            <TableRow
              sx={{
                borderBottom: "3px solid #041F44",
              }}
            >
              {columns?.map((column, index) => (
                <>
                  <TableCell
                    sx={{
                      width: "100%",
                      minHeight: "100px",
                      verticalAlign: "top",
                    }}
                    key={index}
                  >
                    <P
                      sx={{
                        fontWeight: "bold",
                        color: "primary.main",
                      }}
                    >
                      {typeof column.column === "string" &&
                        t(column.column as string)}
                    </P>
                    <Box key={index}>
                      {column.filters ? column.filters() : ""}
                      {column.column &&
                        typeof column.column === "function" &&
                        column.column()}
                    </Box>
                  </TableCell>
                </>
              ))}

              {renderSortComponent}
            </TableRow>
            <TableRow
              sx={{
                borderBottom: "3px solid #041F44",
              }}
            >
              {renderBottomComponent?.()}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              td: {
                padding: "0 10px",
              },
            }}
          >
            {data?.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  height: "50px",
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
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        textTransform: "capitalize",
                        color: column.valueKey
                          ? getStatusColor(
                              String(_.getPath?.(row, column.valueKey) || "-")
                            )
                          : "",
                        fontWeight: 400,
                      }}
                    >
                      {column.valueKey && _.getPath(row, column.valueKey)}
                      {column.currency
                        ? ` ${
                            CURRENCY[
                              _.getPath?.(
                                row,
                                column.currency
                              ) as keyof typeof CURRENCY
                            ] ?? ""
                          }`
                        : ""}

                      {column.currencyManual ? column.currencyManual : ""}
                      {column.renderComponent && column.renderComponent(row)}
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
