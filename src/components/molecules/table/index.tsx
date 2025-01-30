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

interface TableProps {
  columns: string[];
  data: Record<string, string | number | React.ReactNode>[];
  onChangePage?: (event: React.ChangeEvent<unknown>, page: number) => void;
  total?: number;
  isUser?: boolean;
}

const DynamicTable: React.FC<TableProps> = ({ columns, data }) => {
  const navigate = useNavigate();
  const handleUserInformation = (row: Record<string, React.ReactNode>) => {
    navigate({ to: `/user-list/${row.id}` });
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ borderBottom: "3px solid #041F44" }}>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                  {t(column)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                onClick={() => handleUserInformation(row)}
              >
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    sx={{ color: "#7D7D7D", fontSize: "15px" }}
                  >
                    {column === "Action" ? (
                      <Button variant={"text"} text={"Status of tast"} />
                    ) : (
                      String(row[column]) || "-"
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
};

export default DynamicTable;
