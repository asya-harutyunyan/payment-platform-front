import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import useBlockedCard from "./_services/useBlockedCard";

export const BlockedCardList: FC = () => {
  const { page, columns, onChangePage, blockedCards, loading, total } =
    useBlockedCard();
  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("blocked-bank_card_list")} color="#fff" />
      {loading ? (
        <CircularIndeterminate />
      ) : (
        <Box>
          <Box
            sx={{
              width: "100%",
              height: "70vh",
              overflowY: "auto",
              overflowX: "auto",
              borderRadius: 2,
              minWidth: 0,
              scrollbarGutter: "stable",
            }}
          >
            <DynamicTable columns={columns} data={blockedCards} />
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
      )}{" "}
    </Box>
  );
};
