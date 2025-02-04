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
import { useNavigate } from "@tanstack/react-router";
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
}

function DynamicTable<T extends { id?: number }>({
  columns,
  data,
  // onChangePage,
  // onItemClick,
  // total,
  // isUser,
}: TableProps<T>) {
  const navigate = useNavigate();
  const handleUserInformation = (row: T) => {
    navigate({ to: `/user-list/${row.id}` });
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
                onClick={() => handleUserInformation(row)}
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
                <TableCell>
                  <Button
                    variant={"contained"}
                    text={"confirm"}
                    sx={{ width: "120px" }}
                  />
                </TableCell>
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
