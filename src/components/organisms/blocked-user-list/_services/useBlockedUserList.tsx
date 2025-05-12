import { User } from "@/common/types";
import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import { MonthPicker } from "@/components/atoms/month-picker";
import { IColumn } from "@/components/molecules/table";
import { useAuth } from "@/context/auth.context";
import { useUserContext } from "@/context/single.user.page/user.context";
import { new_users_schema } from "@/schema/users_filter";
import { useAppDispatch, useAppSelector } from "@/store";
import { getBlockedUsersThunk } from "@/store/reducers/allUsersSlice/thunks";
import { unblockUserThunk } from "@/store/reducers/authSlice/thunks";
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

type FormData = z.infer<typeof new_users_schema>;

const useBlockedUserList = () => {
  const { goToUserPage } = useUserContext();
  const [value, setValue] = useState(0);

  const dispatch = useAppDispatch();
  const route = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sortBlockedUsers, setSortBlockedUsers] = useState<"ASC" | "DESC">(
    "ASC"
  );
  const { users, blockedUsers, total, loading } = useAppSelector(
    (state) => state.users
  );

  const [pageBlockedUsers, setPageBlockedUsers] = useState(1);

  const { control: BlockedUserControl, watch: BlockedUserWatch } =
    useForm<FormData>({
      resolver: zodResolver(new_users_schema),
      defaultValues: {
        name: "",
        surname: "",
        email: "",
      },
    });

  //filters
  const name = BlockedUserWatch("name");
  const surname = BlockedUserWatch("surname");
  const email = BlockedUserWatch("email");
  const month = BlockedUserWatch("month");

  const [debouncedBlockedName] = useDebounce(name, 700);
  const [debouncedBlockedSurname] = useDebounce(surname, 700);
  const [debouncedBlockedEmail] = useDebounce(email, 700);
  const [debouncedMonth] = useDebounce(
    month && dayjs(month).isValid() ? dayjs(month).format("YYYY/MM") : "",
    2000
  );

  useEffect(() => {
    const isValidMonth =
      dayjs(debouncedMonth).isValid() && debouncedMonth !== "";

    if (!isValidMonth) {
      dispatch(
        getBlockedUsersThunk({
          page: pageBlockedUsers,
          per_page: 20,
          name: debouncedBlockedName,
          surname: debouncedBlockedSurname,
          email: debouncedBlockedEmail,
          month: "",
          sort: sortBlockedUsers,
        })
      );
    } else {
      dispatch(
        getBlockedUsersThunk({
          page: pageBlockedUsers,
          per_page: 20,
          name: debouncedBlockedName,
          surname: debouncedBlockedSurname,
          email: debouncedBlockedEmail,
          month: debouncedMonth,
          sort: sortBlockedUsers,
        })
      );
    }
  }, [
    debouncedBlockedName,
    debouncedBlockedSurname,
    debouncedBlockedEmail,
    sortBlockedUsers,
    value,
    pageBlockedUsers,
    debouncedMonth,
    dispatch,
  ]);

  const onChangeBlockedUsersPage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPageBlockedUsers?.(page);
    dispatch(getBlockedUsersThunk({ page: pageBlockedUsers, per_page: 20 }));
  };
  //single page
  const handleSingleUser = (row?: number) => {
    if (route.pathname === "/user-list") {
      navigate({ to: `/user-list/${row}` });
    }
  };

  const columnsBlockedUsers = useMemo<IColumn<User>[]>(
    () =>
      [
        {
          column: "name",
          renderComponent: (row: User) => {
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
                onClick={() => row.id && goToUserPage(row.id)}
              >
                {row.name}
              </P>
            );
          },
          filters: () => {
            return (
              <FormTextInput
                control={BlockedUserControl}
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
                control={BlockedUserControl}
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
                control={BlockedUserControl}
                name="email"
                width="200px"
                style={{ input: { padding: "10px 14px" } }}
              />
            );
          },
        },
        {
          column: () => (
            <Box>
              <P fontWeight={"bold"}>{t("sort_by_created_at")}</P>
              <MonthPicker name="month" control={BlockedUserControl} />
            </Box>
          ),
          renderComponent: (row: User) => {
            return (
              <Button
                variant={"outlined"}
                text={t("see_more")}
                sx={{ width: "130px" }}
                onClick={() => handleSingleUser?.(row.id)}
              />
            );
          },
        },
        user?.permissions.includes("users_unblock")
          ? {
              column: () => sortBlockedComponent(),
              renderComponent: (row: User) => {
                return (
                  <Button
                    variant={"contained"}
                    text={t("unblock")}
                    sx={{ width: "130px" }}
                    onClick={() => unblockUser(row.id)}
                  />
                );
              },
            }
          : null,
      ].filter(Boolean) as IColumn<User>[],
    [user?.permissions]
  );

  const sortBlockedComponent = () => {
    return (
      <Box
        sx={{
          display: "flex",
        }}
      >
        <P sx={{ fontWeight: "bold", color: "primary.main" }}>
          {t("sort_by_created_at")}
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
            onClick={() => setSortBlockedUsers("ASC")}
          />
          <ExpandMoreIcon
            sx={{
              color: "primary.main",
              height: "20px",
              ":hover": {
                backgroundColor: "#f9f9f9",
              },
            }}
            onClick={() => setSortBlockedUsers("DESC")}
          />
        </Box>
      </Box>
    );
  };

  const unblockUser = (id: number) => {
    dispatch(unblockUserThunk(id))
      .unwrap()
      .then(() => {
        enqueueSnackbar("Пользователь разлокирован", {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        dispatch(
          getBlockedUsersThunk({ page: pageBlockedUsers, per_page: 20 })
        );
      })
      .catch(() => {
        enqueueSnackbar(t("something_went_wrong"), {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      });
  };

  return {
    dispatch,
    navigate,
    route,
    user,
    onChangeBlockedUsersPage,
    handleSingleUser,
    columnsBlockedUsers,
    pageBlockedUsers,

    users,
    blockedUsers,
    total,
    loading,
    value,
    setValue,
  };
};

export default useBlockedUserList;
