import { FormTextInput } from "@/components/atoms/input";
import { IColumn } from "@/components/molecules/table";
import { useAuth } from "@/context/auth.context";
import { percent_referral_schema } from "@/schema/referrals";
import { filter_schema } from "@/schema/users_filter";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getReferredUsersForAdminThunk,
  updatePercentThunk,
} from "@/store/reducers/allUsersSlice/thunks";
import { RefferedUsersList } from "@/store/reducers/user-info/depositSlice/types";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import EditIcon from "@mui/icons-material/Edit";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { z } from "zod";

type FormData = z.infer<typeof percent_referral_schema>;
type FilterFormData = z.infer<typeof filter_schema>;

const useReferredUsers = () => {
  const { referralUsersForAdmin, referralUsersForAdminPagination, loading } =
    useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");

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
  const {
    control: filterControl,
    register: filterRegister,
    watch: filterWatch,
  } = useForm<FilterFormData>({
    resolver: zodResolver(filter_schema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      period: "",
    },
  });
  const name = filterWatch("name");
  const surname = filterWatch("surname");
  const email = filterWatch("email");
  const period = filterWatch("period");

  const [debouncedName] = useDebounce(name, 700);
  const [debouncedSurname] = useDebounce(surname, 700);
  const [debouncedEmail] = useDebounce(email, 700);
  useEffect(() => {
    dispatch(
      getReferredUsersForAdminThunk({
        page,
        per_page: 20,
        name: debouncedName,
        surname: debouncedSurname,
        email: debouncedEmail,
        sort_by: sort,
        sort_order: sortOrder,
        period: period === "all" ? "" : period,
      })
    );
  }, [
    debouncedEmail,
    debouncedName,
    debouncedSurname,
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
        <P sx={{ fontWeight: "bold", color: "primary.main" }}>
          Сортировка по созданию
        </P>
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
        <P sx={{ fontWeight: "bold", color: "primary.main" }}>Сортировка </P>
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
        column: "name",
        valueKey: "name",
        filters: () => {
          return (
            <FormTextInput
              control={filterControl}
              {...filterRegister("name")}
              name="name"
              width="200px"
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
              {...filterRegister("surname")}
              name="surname"
              width="200px"
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
              {...filterRegister("email")}
              width="200px"
              name="email"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },
      {
        column: "sort_by",
        filters: () => sortByMonth(),
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
        column: () => sortComponent(),
      },
      {
        column: () => sortOrderComponent(),
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
  };
};

export default useReferredUsers;
