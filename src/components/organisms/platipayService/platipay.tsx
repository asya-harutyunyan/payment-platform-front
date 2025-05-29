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
        width="100%"
        renderComponent={PartnerProgramSummary()}
      />
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
            marginTop: "20px",
          }}
        >
          <>
            <DynamicTable columns={columns} data={platipay} />
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <PaginationOutlined
                onPageChange={onChangePage}
                count={total}
                page={page}
              />
            </Box>
          </>
        </Box>
      )}
    </Box>
  );
};
