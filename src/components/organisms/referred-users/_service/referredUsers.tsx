import { FormTextInput } from "@/components/atoms/input";
import { MonthPicker } from "@/components/atoms/month-picker";
import { IColumn } from "@/components/molecules/table";
import { useUserContext } from "@/context/single.user.page/user.context";
import EditIcon from "@mui/icons-material/Edit";

import {
  percent_referral_schema,
  price_referral_schema,
} from "@/schema/referrals";
import { filter_schema } from "@/schema/users_filter";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getReferredUsersForAdminThunk,
  updatePercentThunk,
  updatePriceThunk,
} from "@/store/reducers/allUsersSlice/thunks";
import { RefferedUsersList } from "@/store/reducers/user-info/depositSlice/types";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LaunchIcon from "@mui/icons-material/Launch";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import { useLocation, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { z } from "zod";

type FormData = z.infer<typeof percent_referral_schema>;
type FilterFormData = z.infer<typeof filter_schema>;
type UpdatePriceFormData = z.infer<typeof price_referral_schema>;

const useReferredUsers = () => {
  const { referralUsersForAdmin, referralUsersForAdminPagination, loading } =
    useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const { goToUserPage } = useUserContext();
  const navigate = useNavigate();
  const route = useLocation();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState<"ASC" | "DESC">("DESC");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("DESC");
  const [updateModal, setUpdateModal] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(percent_referral_schema),
    defaultValues: {
      percentage: "",
      user_id: "",
    },
  });

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
  };
  const { control: filterControl, watch: filterWatch } =
    useForm<FilterFormData>({
      resolver: zodResolver(filter_schema),
      defaultValues: {
        name: "",
        surname: "",
        email: "",
        period: "",
        referral_code: "",
        from: undefined,
        to: undefined,
      },
    });

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
    },
  });
  const onSubmitPriceUpdate: SubmitHandler<UpdatePriceFormData> = async (
    data
  ) => {
    dispatch(updatePriceThunk(data))
      .unwrap()
      .then(() => {
        ResetUpdatePrice();
        enqueueSnackbar(t("amount_changed"), {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        setUpdateModal(false);
        dispatch(getReferredUsersForAdminThunk({ page: page, per_page: 20 }));
      })
      .catch(() => {
        ResetUpdatePrice();

        setUpdateModal(false);
        enqueueSnackbar(t("error"), {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      });
  };
  const name = filterWatch("name");
  const surname = filterWatch("surname");
  const email = filterWatch("email");
  const period = filterWatch("period");
  const from = filterWatch("from");
  const to = filterWatch("to");
  const referralCode = filterWatch("referral_code");

  const [debouncedName] = useDebounce(name, 700);
  const [debouncedSurname] = useDebounce(surname, 700);
  const [debouncedEmail] = useDebounce(email, 700);
  const [debouncedReferralCode] = useDebounce(referralCode, 700);
  const [debouncedFrom] = useDebounce(
    from && dayjs(from).isValid() ? dayjs(from).format("DD.MM.YYYY") : "",
    2000
  );
  const [debouncedTo] = useDebounce(
    to && dayjs(to).isValid() ? dayjs(to).format("DD.MM.YYYY") : "",
    2000
  );
  const handleSingleUser = (row?: string) => {
    if (route.pathname === "/referred-users") {
      navigate({ to: `/referred-users/${row}` });
    }
  };
  useEffect(() => {
    if (isDatePickerOpen) return;
    const isValidRange =
      dayjs(debouncedFrom, "DD.MM.YYYY").isValid() ||
      dayjs(debouncedTo, "DD.MM.YYYY").isValid();

    if (!isValidRange) {
      dispatch(
        getReferredUsersForAdminThunk({
          page,
          per_page: 20,
          name: debouncedName,
          surname: debouncedSurname,
          email: debouncedEmail,
          sort: sort,
          referral_code: debouncedReferralCode,
          from: "",
          to: "",
          period: period === "all" ? "" : period,
        })
      );
    } else {
      dispatch(
        getReferredUsersForAdminThunk({
          page,
          per_page: 20,
          name: debouncedName,
          surname: debouncedSurname,
          email: debouncedEmail,
          from: debouncedFrom,
          to: debouncedTo,
          sort: sort,
          referral_code: debouncedReferralCode,
          period: period === "all" ? "" : period,
        })
      );
    }
  }, [
    debouncedEmail,
    debouncedName,
    debouncedSurname,
    debouncedTo,
    debouncedFrom,
    debouncedReferralCode,
    dispatch,
    page,
    sort,
    sortOrder,
    period,
  ]);
  const sortComponent = () => {
    return (
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "8px",
            cursor: "pointer",
          }}
        >
          <ExpandLessIcon
            sx={{
              color: "primary.main",
              height: "20px",
              ":hover": {
                backgroundColor: "#f9f9f9",
              },
            }}
            onClick={() => setSort("ASC")}
          />
          <ExpandMoreIcon
            sx={{
              color: "primary.main",
              height: "20px",
              ":hover": {
                backgroundColor: "#f9f9f9",
              },
            }}
            onClick={() => setSort("DESC")}
          />
        </Box>
      </Box>
    );
  };
  const sortOrderComponent = () => {
    return (
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "40px",
            cursor: "pointer",
          }}
        >
          <ExpandLessIcon
            sx={{
              color: "primary.main",
              height: "20px",
              ":hover": {
                backgroundColor: "#f9f9f9",
              },
            }}
            onClick={() => setSortOrder("ASC")}
          />
          <ExpandMoreIcon
            sx={{
              color: "primary.main",
              height: "20px",
              ":hover": {
                backgroundColor: "#f9f9f9",
              },
            }}
            onClick={() => setSortOrder("DESC")}
          />
        </Box>
      </Box>
    );
  };

  const sortByMonth = () => {
    return (
      <Box sx={{ marginTop: "7px" }}>
        <FormControl fullWidth>
          <Controller
            control={filterControl}
            name="period"
            render={({ field }) => (
              <Select
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={field.value || "all"}
                onChange={(e) => {
                  const value = e.target.value === "all" ? "" : e.target.value;
                  field.onChange(value);
                }}
                sx={{
                  color: "black",
                  width: "100px",
                  borderRadius: "5px",
                  borderColor: "primary.main",
                  height: "43px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "primary.main",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "secondary.main",
                  },
                  "& .MuiSelect-select": {
                    color: "black",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "black",
                  },
                }}
              >
                <MenuItem value={"all"}>
                  <em>{t("all")}</em>
                </MenuItem>
                <MenuItem value={"month"}>{t("month")}</MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Box>
    );
  };
  const columns = useMemo<IColumn<RefferedUsersList>[]>(
    () => [
      {
        renderComponent: (row: RefferedUsersList) => {
          return (
            <span
              style={{
                color: "black",
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              {dayjs(row.created_at).format("DD.MM.YYYY HH:mm")}
            </span>
          );
        },
        column: () => (
          <Box>
            {" "}
            <P fontWeight={"bold"} sx={{ textWrap: "nowrap" }}>
              {t("sort_by_created_at")}
            </P>{" "}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <MonthPicker
                  width="130px"
                  name="from"
                  control={filterControl}
                  onOpen={() => setIsDatePickerOpen(true)}
                  onClose={() => setIsDatePickerOpen(false)}
                />
                <MonthPicker
                  width="130px"
                  name="to"
                  control={filterControl}
                  onOpen={() => setIsDatePickerOpen(true)}
                  onClose={() => setIsDatePickerOpen(false)}
                />
              </Box>
              {sortComponent()}{" "}
            </Box>
          </Box>
        ),
      },
      {
        column: "name",
        renderComponent: (row: RefferedUsersList) => {
          return (
            <P
              sx={{
                color: "black",
                fontSize: "15px",
                fontWeight: 500,
                ":hover": {
                  textDecoration: "underline",
                },
              }}
              onClick={() => goToUserPage(row.user_id)}
            >
              {row.name}
            </P>
          );
        },

        filters: () => {
          return (
            <FormTextInput
              control={filterControl}
              name="name"
              width="130px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },
      {
        column: "surname",
        valueKey: "surname",
        filters: () => {
          return (
            <FormTextInput
              control={filterControl}
              name="surname"
              width="130px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },

      {
        column: "email",
        valueKey: "email",
        filters: () => {
          return (
            <FormTextInput
              control={filterControl}
              width="130px"
              name="email"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },
      {
        renderComponent: (row: RefferedUsersList) => {
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <P
                sx={{
                  color: "black",
                  fontSize: "15px",
                  fontWeight: 500,
                  paddingLeft: "30px",
                }}
              >
                {row.total_amount ?? "-"}
              </P>
            </Box>
          );
        },
        column: () => {
          return (
            <Box sx={{ display: "flex" }}>
              <P fontWeight={"bold"}>{t("total_amount")}</P>
              {sortOrderComponent()}
            </Box>
          );
        },
      },
      {
        column: "amount_to_pay",
        valueKey: "amount_to_pay",
      },
      {
        column: "amount_payment",
        renderComponent: (row: RefferedUsersList) => {
          return (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <P
                sx={{
                  color: "black",
                  fontSize: "15px",
                  fontWeight: 500,
                  paddingLeft: "30px",
                }}
              >
                {row.amount_payment ?? "-"}
              </P>
              <EditIcon
                onClick={() => {
                  setUpdateModal(true);
                  SetValueUpdatePrice("user_id", `${row.user_id}`);
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
            </Box>
          );
        },
      },
      {
        column: "percentage",
        renderComponent: (row: RefferedUsersList) => {
          return (
            <Box
              display={"flex"}
              sx={{
                ":hover": {
                  textDecoration: "underline",
                },
              }}
            >
              <LaunchIcon
                onClick={() => {
                  handleSingleUser(row.user_id);
                }}
                sx={{
                  color: "primary.main",
                  marginLeft: "5px",
                  fontSize: "25px",
                  ":hover": {
                    color: "u#525257",
                  },
                }}
              />
            </Box>
          );
        },
      },
      {
        column: "ref_count",
        valueKey: "ref_count",
      },
      {
        valueKey: "referral_code",
        filters: () => {
          return (
            <Box>
              <P
                fontWeight={"bold"}
                sx={{ textWrap: "nowrap", paddingBottom: "8px" }}
              >
                {t("referral_code")}
              </P>
              <FormTextInput
                control={filterControl}
                width="130px"
                name="referral_code"
                style={{ input: { padding: "10px 14px" } }}
              />
            </Box>
          );
        },
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

  return {
    referralUsersForAdmin,
    referralUsersForAdminPagination,
    loading,
    onSubmit,
    columns,
    sortComponent,
    onChangePage,
    control,
    handleSubmit,
    open,
    setOpen,
    page,
    sortByMonth,
    ControlUpdatePrice,
    updateModal,
    setUpdateModal,
    HandleSubmitUpdatePrice,
    onSubmitPriceUpdate,
  };
};

export default useReferredUsers;
