import Button from "@/components/atoms/button";
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
import { t } from "i18next";
import React from "react";
// @ts-expect-error no types for this lib
import _ from "underscore-contrib";

export interface IColumn {
  column: string;
  valueKey: string;
}

interface TableProps<T extends { id?: number }> {
  columns: IColumn[];
  data: T[];
  onChangePage?: (event: React.ChangeEvent<unknown>, page: number) => void;
  onItemClick?: (row: T) => void;
  total?: number;
  isUser?: boolean;
  isNeedBtn?: boolean;
}

function DynamicTable<T extends { id?: number }>({
  columns,
  data,
  isNeedBtn,
}: TableProps<T>) {
  const navigate = useNavigate();
  const route = useLocation();
  const handleUserInformation = (row: T) => {
    if (route.pathname === "/user-list") {
      navigate({ to: `/user-list/${row.id}` });
    } else if (route.pathname === "/deposit-list") {
      navigate({ to: `/deposit-list/${row.id}` });
    } else if (route.pathname === "/order-list") {
      navigate({ to: `/order-list/${row.id}` });
    } else if (route.pathname === "/deposit-info") {
      navigate({ to: `/deposit-info/${row.id}` });
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ borderBottom: "3px solid #041F44" }}>
              {columns?.map((column, index) => (
                <TableCell
                  key={index}
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                  {t(column.column)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                onClick={() =>
                  route.pathname === "/user-list" ||
                  route.pathname === "/order-list" ||
                  route.pathname === "/deposit-info" ||
                  route.pathname === "/deposit-list"
                    ? handleUserInformation(row)
                    : {}
                }
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
                      color: "#7D7D7D",
                      fontSize: "15px",
                      maxWidth: "200px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {column.column === "Action" ? (
                      <Button variant={"text"} text={"Status of tast"} />
                    ) : (
                      String(_.getPath(row, column.valueKey)) || "-"
                    )}
                  </TableCell>
                ))}
                {isNeedBtn && (
                  <TableCell>
                    <Button
                      variant={"contained"}
                      text={"confirm"}
                      sx={{ width: "120px" }}
                    />
                  </TableCell>
                )}
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
