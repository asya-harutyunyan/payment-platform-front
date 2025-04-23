import bg from "@/assets/images/modal.png";
import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { BasicModal } from "@/components/atoms/modal";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable, { IColumn } from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { useAuth } from "@/context/auth.context";
import { percent_referral_schema } from "@/schema/referrals";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getReferredUsersForAdminThunk,
  updatePercentThunk,
} from "@/store/reducers/allUsersSlice/thunks";
import { RefferedUsersList } from "@/store/reducers/user-info/depositSlice/types";
import { H3 } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { FC, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { EmptyComponent } from "../empty-component";

type FormData = z.infer<typeof percent_referral_schema>;

export const ReferredUsers: FC = () => {
  const { referralUsersForAdmin, referralUsersForAdminPagination, loading } =
    useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const { control, handleSubmit, setValue, reset } = useForm<FormData>({
    resolver: zodResolver(percent_referral_schema),
    defaultValues: {
      percentage: "",
      referral_id: "",
    },
  });

  useEffect(() => {
    dispatch(getReferredUsersForAdminThunk({ page: page, per_page: 20 }));
  }, [dispatch, page, user?.role]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(getReferredUsersForAdminThunk({ page: page, per_page: 20 }));
  };

  const columns = useMemo<IColumn<RefferedUsersList>[]>(
    () => [
      {
        column: "name",
        valueKey: "name",
      },
      {
        column: "surname",
        valueKey: "surname",
      },
      {
        column: "total_amount",
        valueKey: "total_amount",
      },
      {
        column: "percentage",
        renderComponent: (row: RefferedUsersList) => {
          return (
            <EditIcon
              onClick={() => {
                setOpen(true);
                setValue("referral_id", `${row.user_id}`);
                setValue("percentage", String(row.percentage ?? ""));
              }}
              sx={{
                color: "primary.main",
                marginLeft: "5px",
                fontSize: "23px",
                ":hover": {
                  color: "#2c269a",
                },
              }}
            />
          );
        },
        valueKey: "percentage",
      },
      {
        column: "ref_count",
        currencyManual: " ₽",
        valueKey: "ref_count",
      },
      {
        column: "referral_code",
        valueKey: "referral_code",
      },
      {
        column: "email",
        valueKey: "email",
      },
    ],
    []
  );

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    dispatch(updatePercentThunk(data))
      .unwrap()
      .then(() => {
        reset();
        enqueueSnackbar(t("percent_changed"), {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        setOpen(false);
        dispatch(getReferredUsersForAdminThunk({ page: page, per_page: 20 }));
      })
      .catch(() => {
        enqueueSnackbar(t("error"), {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      });
  };

  // const submitForm = (e) => {
  //   e.preventDefault();
  //   handleSubmit(onSubmit)();
  // };

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("referred_users")} />
      {loading ? (
        <CircularIndeterminate />
      ) : referralUsersForAdmin.length > 0 ? (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
            marginTop: "20px",
          }}
        >
          <DynamicTable columns={columns} data={referralUsersForAdmin} />
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <PaginationOutlined
              onPageChange={onChangePage}
              count={referralUsersForAdminPagination.last_page}
              page={page}
            />
          </Box>
        </Box>
      ) : (
        <EmptyComponent text={"no_data"} />
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
              // numeric
              // type="number"
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
