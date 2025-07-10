import bg from "@/assets/images/modal.png";
import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { BasicModal } from "@/components/atoms/modal";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { H3 } from "@/styles/typography";
import { Box } from "@mui/material";
import { t } from "i18next";
import useManageModerators from "./_service/useManageModerators";

export const ManageModeratorsComponent = () => {
  const {
    loading,
    columns,
    pagination,
    onChangePage,
    updateModal,
    setUpdateModal,
    page,
    ControlUpdateLimit,
    onSubmitLimitUpdate,
    HandleSubmitUpdateLimit,
    manageDepositLimitHistory,
  } = useManageModerators();

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("user_list_title")} />
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
          <DynamicTable columns={columns} data={manageDepositLimitHistory} />
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <PaginationOutlined
              onPageChange={onChangePage}
              count={pagination.last_page}
              page={page}
            />
          </Box>
        </Box>
      )}
      <BasicModal
        handleClose={() => setUpdateModal(false)}
        open={updateModal}
        bg={bg}
        width="50%"
      >
        <Box
          component="form"
          onSubmit={HandleSubmitUpdateLimit(onSubmitLimitUpdate)}
          sx={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "start",
            height: "auto",
          }}
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
              paddingBottom: "50px",
            }}
          >
            {t("change_percent")}
          </H3>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <FormTextInput
              control={ControlUpdateLimit}
              name="limit"
              placeholder={t("limit")}
              whiteVariant
              numeric
            />
            <Button
              type="submit"
              variant={"gradient"}
              text={t("yes")}
              sx={{ marginTop: "30px" }}
            />
          </Box>
        </Box>
      </BasicModal>
    </Box>
  );
};
