import bg from "@/assets/images/modal.png";
import Button from "@/components/atoms/button";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { BasicModal } from "@/components/atoms/modal";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { DEPOSIT_STATUSES } from "@/enum/deposit.status.enum";
import { H3 } from "@/styles/typography";
import { Box, Tab, Tabs } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import useAdminOrder from "./_services/useUserOrder";

export const OrderListComponent: FC = () => {
  const {
    orders,
    total,
    loading,
    page,
    openDeleteModal,
    setOpenDeleteModal,
    filter,
    onChangePage,
    columns,
    handleDeleteOrder,
    handleFilterChange,
    OrderSummary,
    user,
  } = useAdminOrder();

  return (
    <Box sx={{ width: "100%" }}>
      {user?.permissions.includes("orders_view.summary") && (
        <TaskHeader
          title={t("order_list")}
          renderComponent={OrderSummary()}
          width="100%"
          color="#fff"
        />
      )}
      <Box
        sx={{
          width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
        }}
      >
        <Tabs
          value={filter}
          onChange={handleFilterChange}
          sx={{
            color: "black",
            backgroundColor: "#f6f6f6",
            width: "100%",
            mb: "20px",
            ".MuiTabs-list": {
              overflowX: "auto",
            },
          }}
        >
          <Tab
            label="Все"
            value={DEPOSIT_STATUSES.ALL}
            sx={{ color: "black" }}
          />
          <Tab
            label="Неподтвержденные"
            value={DEPOSIT_STATUSES.PENDING}
            sx={{ color: "black" }}
          />
          <Tab
            label="Успешные"
            value={DEPOSIT_STATUSES.DONE}
            sx={{ color: "black" }}
          />
          <Tab
            label="Просроченные"
            value={DEPOSIT_STATUSES.EXPRIED}
            sx={{ color: "black" }}
          />
        </Tabs>
        {loading ? (
          <CircularIndeterminate />
        ) : (
          <Box>
            <Box
              sx={{
                width: "100%",
                height: "50vh",
                overflowY: "auto",
                overflowX: "auto",
                borderRadius: 2,
                minWidth: 0,
                scrollbarGutter: "stable",
              }}
            >
              <DynamicTable columns={columns} data={orders} />
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
      <BasicModal
        handleClose={() => setOpenDeleteModal(false)}
        open={openDeleteModal}
        bg={bg}
        width="50%"
      >
        <H3
          align="center"
          sx={{
            fontSize: {
              lg: "1.5rem",
              md: "1.5rem",
              xs: "1.1rem",
              sm: "1.1rem",
            },
          }}
        >
          {t("delete_order_modal")}
        </H3>
        <Box
          sx={{
            display: "flex",
            width: {
              lg: "30%",
              md: "30%",
              xs: "100%",
              sm: "100%",
            },
            justifyContent: "space-between",
            flexDirection: {
              lg: "row",
              md: "row",
              xs: "column",
              sm: "column",
            },
            marginTop: "30px",
          }}
        >
          <Button
            variant={"outlinedWhite"}
            text={t("no")}
            onClick={() => setOpenDeleteModal(false)}
            sx={{
              marginBottom: {
                lg: "0",
                md: "0",
                xs: "10px",
                sm: "10px",
              },
            }}
          />
          <Button
            variant={"text"}
            text={t("yes")}
            onClick={() => handleDeleteOrder()}
          />
        </Box>
      </BasicModal>
    </Box>
  );
};
