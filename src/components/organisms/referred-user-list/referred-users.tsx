import bg from "@/assets/images/modal.png";
import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { BasicModal } from "@/components/atoms/modal";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { price_referral_schema } from "@/schema/referrals";
import {
  getReferedUsersListThunk,
  updatePriceThunk,
} from "@/store/reducers/allUsersSlice/thunks";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

import { H3 } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { useCanGoBack, useParams, useRouter } from "@tanstack/react-router";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import useReferredUsers from "./_service/referredUsers";

type UpdatePriceFormData = z.infer<typeof price_referral_schema>;

export const ReferredUserList = () => {
  const { id } = useParams({ from: "/_auth/_admin/referred-users/$id" });
  const router = useRouter();
  const canGoBack = useCanGoBack();

  const {
    referred_users_list,
    lastPageRefList,
    loading,
    onSubmit,
    columns,
    onChangePage,
    control,
    handleSubmit,
    updateModal,
    setUpdateModal,
    open,
    dispatch,
    setOpen,
    page,
    selectedId,
    setSelectedId,
  } = useReferredUsers();

  const {
    control: ControlUpdatePrice,
    handleSubmit: HandleSubmitUpdatePrice,
    setValue: SetValueUpdatePrice,
    reset: ResetUpdatePrice,
  } = useForm<UpdatePriceFormData>({
    resolver: zodResolver(price_referral_schema),
    defaultValues: {
      amount_to_deduct: "",
      user_id: "",
      referral_id: "",
    },
  });

  useEffect(() => {
    SetValueUpdatePrice("referral_id", `${selectedId.referral_id}`);
    SetValueUpdatePrice("user_id", `${selectedId.user_id}`);
  });
  const onSubmitPriceUpdate: SubmitHandler<UpdatePriceFormData> = async (
    data
  ) => {
    dispatch(updatePriceThunk(data))
      .unwrap()
      .then(() => {
        setSelectedId({
          user_id: "",
          referral_id: "",
        });
        ResetUpdatePrice();
        enqueueSnackbar(t("amount_changed"), {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        setUpdateModal(false);
        dispatch(getReferedUsersListThunk({ id, page: page, per_page: 20 }));
      })
      .catch(() => {
        ResetUpdatePrice();
        setSelectedId({
          user_id: "",
          referral_id: "",
        });
        setUpdateModal(false);
        enqueueSnackbar(t("error"), {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      });
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "70px",
        }}
      >
        {canGoBack && (
          <Button
            onClick={() => router.history.back()}
            variant={"outlined"}
            text={t("back")}
            sx={{ height: "30px", fontSize: "15px", color: "primary.main" }}
            icon={ArrowLeftIcon}
          />
        )}
        <TaskHeader
          title={t("referred_user_list")}
          sx={{ display: "flex", alignItems: "center", marginBottom: "3px" }}
        />
      </Box>
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
          <DynamicTable columns={columns} data={referred_users_list} />
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <PaginationOutlined
              onPageChange={onChangePage}
              count={lastPageRefList}
              page={page}
            />
          </Box>
        </Box>
      )}
      <BasicModal
        handleClose={() => setOpen(false)}
        open={open}
        bg={bg}
        width="50%"
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
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
              control={control}
              name="percentage"
              placeholder={t("change_percent")}
              whiteVariant
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
      <BasicModal
        handleClose={() => setUpdateModal(false)}
        open={updateModal}
        bg={bg}
        width="50%"
      >
        <Box
          component="form"
          onSubmit={HandleSubmitUpdatePrice(onSubmitPriceUpdate)}
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
            {t("change_price")}
          </H3>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <FormTextInput
              control={ControlUpdatePrice}
              name="amount_to_deduct"
              placeholder={t("amount_to_deduct")}
              whiteVariant
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
