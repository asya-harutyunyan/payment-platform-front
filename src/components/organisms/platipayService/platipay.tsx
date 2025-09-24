import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import usePlatipayService from "./_services/usePlatipayService";

export const PlatiPay: FC = () => {
  const {
    PartnerProgramSummary,
    platipay,
    total,
    loading,
    page,
    onChangePage,
    columns,
  } = usePlatipayService();

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader
        title={t("platipay")}
        color="#fff"
        width="100%"
        renderComponent={PartnerProgramSummary()}
      />
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <Box>
          <Box
            sx={{
              width: "100%",
              height: "60vh",
              overflowY: "auto",
              overflowX: "auto",
              borderRadius: 2,
              minWidth: 0,
              scrollbarGutter: "stable",
            }}
          >
            <DynamicTable columns={columns} data={platipay} />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              mt: "24px",
            }}
          >
            <PaginationOutlined
              onPageChange={onChangePage}
              count={total}
              page={page}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
