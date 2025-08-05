import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import useHistoryDeposit from "./_services/useHistoryDeposit";

export const HistoryDepositsComponent: FC = () => {
  const { depositHistory, lastPage, loading, page, onChangePage, columns } =
    useHistoryDeposit();

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("history_of_deposits")} />
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
            <DynamicTable columns={columns} data={depositHistory} />
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <PaginationOutlined
                onPageChange={onChangePage}
                count={lastPage}
                page={page}
              />
            </Box>
          </>
        </Box>
      )}
    </Box>
  );
};
