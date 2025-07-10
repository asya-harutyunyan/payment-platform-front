import { IColumn } from "@/components/molecules/table";
import { useUserContext } from "@/context/single.user.page/user.context";
import EditIcon from "@mui/icons-material/Edit";

import { FormTextInput } from "@/components/atoms/input";
import { SelectFieldWith } from "@/components/atoms/select";
import { RoleOptions } from "@/components/utils/status-color";
import { deposit_limit_schema, deposit_schema } from "@/schema/limit.schema";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  manageDepositLimitThunk,
  updateLimitDepositsThunk,
} from "@/store/reducers/user-info/depositSlice/thunks";
import { ManageLimitRequest } from "@/store/reducers/user-info/depositSlice/types";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { z } from "zod";

type FormData = z.infer<typeof deposit_schema>;
type UpdateLimit = z.infer<typeof deposit_limit_schema>;

const useManageModerators = () => {
  const { manageDepositLimitHistory, pagination, loading } = useAppSelector(
    (state) => state.deposit
  );

  const dispatch = useAppDispatch();
  const { goToUserPage } = useUserContext();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState<"ASC" | "DESC">("DESC");
  const [updateModal, setUpdateModal] = useState(false);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
  };
  const { control: filterControl, watch: filterWatch } = useForm<FormData>({
    resolver: zodResolver(deposit_schema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      role: "",
      limit: "",
    },
  });

  const {
    control: ControlUpdateLimit,
    handleSubmit: HandleSubmitUpdateLimit,
    setValue: SetValueUpdateLimit,
    reset: ResetUpdateLimit,
  } = useForm<UpdateLimit>({
    resolver: zodResolver(deposit_limit_schema),
    defaultValues: {
      limit: "",
      user_id: "",
    },
  });

  const onSubmitLimitUpdate: SubmitHandler<UpdateLimit> = async (data) => {
    dispatch(updateLimitDepositsThunk(data))
      .unwrap()
      .then(() => {
        ResetUpdateLimit();
        enqueueSnackbar(t("limit_changed"), {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        setUpdateModal(false);
        dispatch(
          manageDepositLimitThunk({
            page,
            per_page: 20,
            name: debouncedName,
            surname: debouncedSurname,
            email: debouncedEmail,
            sort: sort,
            role: debouncedRole,
            limit: debouncedLimit,
          })
        );
      })
      .catch(() => {
        ResetUpdateLimit();
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
  const role = filterWatch("role");
  const limit = filterWatch("limit");

  const [debouncedName] = useDebounce(name, 700);
  const [debouncedSurname] = useDebounce(surname, 700);
  const [debouncedEmail] = useDebounce(email, 700);
  const [debouncedRole] = useDebounce(role, 700);
  const [debouncedLimit] = useDebounce(limit, 700);

  useEffect(() => {
    dispatch(
      manageDepositLimitThunk({
        page,
        per_page: 20,
        name: debouncedName,
        surname: debouncedSurname,
        email: debouncedEmail,
        sort: sort,
        role: debouncedRole,
        limit: debouncedLimit,
      })
    );
  }, [
    debouncedEmail,
    debouncedName,
    debouncedSurname,
    debouncedRole,
    debouncedLimit,
    page,
    sort,
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

  const columns = useMemo<IColumn<ManageLimitRequest>[]>(
    () => [
      {
        column: "name",
        renderComponent: (row: ManageLimitRequest) => {
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
              onClick={() => row.user_id && goToUserPage(row.user_id)}
            >
              {row?.user?.name}
            </P>
          );
        },
        filters: () => {
          return (
            <FormTextInput
              control={filterControl}
              name="name"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },
      {
        column: "surname",
        valueKey: "user.surname",
        filters: () => {
          return (
            <FormTextInput
              control={filterControl}
              name="surname"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },

      {
        column: "email",
        valueKey: "user.email",
        filters: () => {
          return (
            <FormTextInput
              control={filterControl}
              name="email"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
      },
      {
        valueKey: "role",
        filters: () => {
          return (
            <Box>
              <P
                fontWeight={"bold"}
                sx={{ textWrap: "nowrap", paddingBottom: "8px" }}
              >
                {t("role")}
              </P>
              <SelectFieldWith
                placeholder={""}
                name="role"
                control={filterControl}
                options={RoleOptions}
                height="43px"
              />
            </Box>
          );
        },
      },

      {
        column: "limit",
        renderComponent: (row: ManageLimitRequest) => {
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
                {row.limit ?? "-"}
              </P>
              <EditIcon
                onClick={() => {
                  if (row.user_id) {
                    setUpdateModal(true);
                    SetValueUpdateLimit("user_id", `${row.user_id}`);
                  }
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
    ],
    []
  );

  return {
    pagination,
    loading,
    columns,
    sortComponent,
    onChangePage,
    manageDepositLimitHistory,
    open,
    setOpen,
    page,
    ControlUpdateLimit,
    updateModal,
    setUpdateModal,
    HandleSubmitUpdateLimit,
    onSubmitLimitUpdate,
  };
};

export default useManageModerators;
