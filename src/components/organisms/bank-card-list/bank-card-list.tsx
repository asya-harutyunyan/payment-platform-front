import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import { EmptyComponent } from "../empty-component";
import useBankCardList from "./_services/useBankCardList";

export const BankCardLists: FC = () => {
  const { bankCards, loading, total, onChangePage, page, columns } =
    useBankCardList();

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("bank_card_list")} />
      {loading ? (
        <CircularIndeterminate />
      ) : bankCards.length > 0 ? (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
            marginTop: "20px",
          }}
        >
          <DynamicTable columns={columns} data={bankCards} />
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <PaginationOutlined
              onPageChange={onChangePage}
              count={total}
              page={page}
            />
          </Box>
        </Box>
      ) : (
        <EmptyComponent text={"no_data"} />
      )}
    </Box>
  );
};
