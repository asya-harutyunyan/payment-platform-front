import { User } from "@/common/types";
import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import { MonthPicker } from "@/components/atoms/month-picker";
import { IColumn } from "@/components/molecules/table";
import { useAuth } from "@/context/auth.context";
import { useUserContext } from "@/context/single.user.page/user.context";
import { filter_schema } from "@/schema/users_filter";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUsersThunk } from "@/store/reducers/allUsersSlice/thunks";
import { blockUserThunk } from "@/store/reducers/authSlice/thunks";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { z } from "zod";

type FormData = z.infer<typeof filter_schema>;

const useUserList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const route = useLocation();
  const { goToUserPage } = useUserContext();
  const { user } = useAuth();

  const [sort, setSort] = useState<"ASC" | "DESC">("ASC");
  const [selectedTab, setSelectedTab] = useState(0);
  const [page, setPage] = useState(1);

  const { users, blockedUsers, total, loading } = useAppSelector(
    (state) => state.users
  );

  const { control, register, watch } = useForm<FormData>({
    resolver: zodResolver(filter_schema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
    },
  });

  const name = watch("name");
  const surname = watch("surname");
  const email = watch("email");
  const month = watch("month");

  const [debouncedName] = useDebounce(name, 700);
  const [debouncedSurname] = useDebounce(surname, 700);
  const [debouncedEmail] = useDebounce(email, 700);
  const [debouncedMonth] = useDebounce(
    month && dayjs(month).isValid() ? dayjs(month).format("YYYY/MM") : "",
    2000
  );

  useEffect(() => {
    const isValidMonth =
      dayjs(debouncedMonth).isValid() && debouncedMonth !== "";

    if (!isValidMonth) {
      dispatch(
        getUsersThunk({
          page,
          per_page: 20,
          name: debouncedName,
          surname: debouncedSurname,
          email: debouncedEmail,
          month: "",
          sort,
        })
      );
    } else {
      // If a valid month is selected, include it in the request
      dispatch(
        getUsersThunk({
          page,
          per_page: 20,
          name: debouncedName,
          surname: debouncedSurname,
          email: debouncedEmail,
          month: debouncedMonth,
          sort,
        })
      );
    }
  }, [debouncedName, debouncedSurname, debouncedEmail, debouncedMonth, sort]);

  const onChangeUsersPage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
    dispatch(
      getUsersThunk({
        page,
        per_page: 20,
        name: debouncedName,
        surname: debouncedSurname,
        email: debouncedEmail,
        month: debouncedMonth,
        sort,
      })
    );
  };

  const handleSingleUser = (row?: number) => {
    if (route.pathname === "/user-list") {
      navigate({ to: `/user-list/${row}` });
    }
  };

  const blockUser = (id: number) => {
    dispatch(blockUserThunk(id))
      .unwrap()
      .then(() => {
        enqueueSnackbar("Пользователь заблокирован", {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        dispatch(getUsersThunk({ page, per_page: 20 }));
      })
      .catch(() => {
        enqueueSnackbar(t("something_went_wrong"), {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      });
  };

  const sortComponent = () => (
    <Box sx={{ display: "flex" }}>
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
            ":hover": { backgroundColor: "#f9f9f9" },
          }}
          onClick={() => setSort("ASC")}
        />
        <ExpandMoreIcon
          sx={{
            color: "primary.main",
            height: "20px",
            ":hover": { backgroundColor: "#f9f9f9" },
          }}
          onClick={() => setSort("DESC")}
        />
      </Box>
    </Box>
  );

  const columnsUsers = useMemo<IColumn<User>[]>(
    () =>
      [
        {
          column: () => (
            <Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {" "}
                <P fontWeight={"bold"}>{t("created_at")}</P>
                {sortComponent()}
              </Box>
              <MonthPicker name="month" control={control} />
            </Box>
          ),
          renderComponent: (row: User) => (
            <P
              sx={{
                color: "black",
                fontSize: "15px",
                fontWeight: 500,
                ":hover": { textDecoration: "underline" },
              }}
            >
              {dayjs(row.created_at).format("DD MMM YYYY HH:mm")}
            </P>
          ),
        },
        {
          column: "name",
          filters: () => (
            <FormTextInput
              control={control}
              {...register("name")}
              name="name"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          ),
          renderComponent: (row: User) => (
            <P
              sx={{
                color: "black",
                fontSize: "15px",
                fontWeight: 500,
                ":hover": { textDecoration: "underline" },
              }}
              onClick={() => row.id && goToUserPage(row.id)}
            >
              {row.name}
            </P>
          ),
        },
        {
          column: "surname",
          valueKey: "surname",
          filters: () => (
            <FormTextInput
              control={control}
              {...register("surname")}
              name="surname"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          ),
        },
        {
          column: "email",
          valueKey: "email",
          filters: () => (
            <FormTextInput
              control={control}
              {...register("email")}
              width="200px"
              name="email"
              style={{ input: { padding: "10px 14px" } }}
            />
          ),
        },
        {
          renderComponent: (row: User) => (
            <Button
              variant={"outlined"}
              text={t("see_more")}
              sx={{ width: "130px" }}
              onClick={() => handleSingleUser?.(row.id)}
            />
          ),
        },
        user?.permissions.includes("users_block")
          ? {
              // column: () => sortComponent(),
              renderComponent: (row: User) => (
                <Button
                  variant={"error"}
                  text={t("block")}
                  sx={{ width: "130px" }}
                  onClick={() => blockUser(row.id)}
                />
              ),
            }
          : null,
      ].filter(Boolean) as IColumn<User>[],
    [control, user?.permissions]
  );

  return {
    dispatch,
    navigate,
    route,
    user,
    page,
    setPage,
    onChangeUsersPage,
    handleSingleUser,
    columnsUsers,
    blockUser,
    users,
    blockedUsers,
    total,
    loading,
    selectedTab,
    setSelectedTab,
  };
};

export default useUserList;
