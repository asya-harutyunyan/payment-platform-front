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
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          px: 2,
          pb: 2,
          backgroundColor: "#fff",
        }}
      >
        <Table
          sx={{
            borderCollapse: "separate",
            borderSpacing: "0 8px",
            width: "97%",
          }}
        >
          <TableHead>
            <TableRow>
              {columns?.map((column, index) => (
                <TableCell
                  key={index}
                  padding="none"
                  sx={{
                    px: 1.5,
                    py: 1,
                    verticalAlign: "top",
                    borderBottom: data?.length ? "1px solid #062247" : "none",
                  }}
                >
                  <P
                    sx={{
                      fontWeight: "600",
                      fontSize: "13.14px",
                      color: "primary.main",
                    }}
                  >
                    {typeof column.column === "string" &&
                      t(column.column as string)}
                  </P>
                  <Box>
                    {column.filters ? column.filters() : ""}
                    {column.column &&
                      typeof column.column === "function" &&
                      column.column()}
                  </Box>
                </TableCell>
              ))}
              {renderSortComponent}
            </TableRow>
            <TableRow>{renderBottomComponent?.()}</TableRow>
          </TableHead>

          <TableBody>
            {data?.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                sx={{
                  backgroundColor: "#EAEAEA",
                  "& td": {
                    border: 0,
                  },
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              >
                {columns?.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    padding="none"
                    sx={{
                      px: 1.5,
                      py: 1,
                      minWidth: 110,
                      fontSize: "13px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      color: "#7d7d7d",

                      ...(colIndex === 0 && {
                        borderTopLeftRadius: "10px",
                        borderBottomLeftRadius: "10px",
                      }),
                      ...(colIndex === columns.length - 1 && {
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                      }),
                      backgroundColor: "#EAEAEA",
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default DynamicTable;
