import bg from "@/assets/images/modal.png";
import telegram from "@/assets/images/telegram-icon-6896828_1280.webp";
import Button from "@/components/atoms/button";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { BasicModal } from "@/components/atoms/modal";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { DEPOSIT_STATUSES } from "@/enum/deposit.status.enum";
import { H3, P } from "@/styles/typography";
import { Box, Tab, Tabs } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import { EmptyComponent } from "../empty-component";
import useUserOrder from "./_services/useUserOrder";

export const UserOrdersComponent: FC = () => {
  const {
    filter,
    open,
    ordersUser,
    loading,
    setOpen,
    columns,
    page,
    total,
    onChangePage,
    addId,
    handleFilterChange,
    handleConfirm,
  } = useUserOrder();

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("orders")} />
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
        ) : ordersUser.length > 0 ? (
          <Box
            sx={{
              width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
              height: "100vh",
            }}
          >
            <DynamicTable columns={columns} data={ordersUser} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              {" "}
              <PaginationOutlined
                page={page}
                onPageChange={onChangePage}
                count={total}
              />
            </Box>
          </Box>
        ) : (
          <EmptyComponent
            text={"empty_order"}
            isTextNeeded={"order_empty_text"}
          />
        )}
      </Box>
      <BasicModal
        handleClose={() => setOpen(false)}
        open={open}
        bg={bg}
        width="50%"
        minHeight="200px"
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
          {t("left_amount_done")}
        </H3>
        <Box
          sx={{
            width: { lg: "80%", md: "80%", sx: "100%", sm: "100%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <P align="center" sx={{ paddingRight: "7px" }} color="#e8e8e8">
            {t("telegram")}
          </P>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "3px",
              ":hover": {
                borderRadius: "3px",
                backgroundColor: "#e8e8e8",
                padding: "3px",
                transition: "1s",
              },
            }}
          >
            <a href="https://t.me/payhubofficial">
              <img
                src={telegram}
                alt="telegram"
                style={{ width: "30px", cursor: "pointer" }}
              />
            </a>
          </Box>
        </Box>
      </BasicModal>
      <BasicModal
        handleClose={() => setOpen(false)}
        open={open}
        bg={bg}
        width="50%"
        minHeight="200px"
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
          {t("deposit_confirm_text")}
        </H3>
        <Button
          variant={"outlinedWhite"}
          sx={{ fontSize: "0.7rem", marginTop: "20px" }}
          onClick={() => {
            if (addId) {
              handleConfirm(addId);
            }
          }}
          text={t("confirm")}
        />
      </BasicModal>
    </Box>
  );
};
