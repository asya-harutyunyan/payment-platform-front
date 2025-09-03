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
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

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
        from: undefined,
        to: undefined,
      },
    });

  //filters
  const name = BlockedUserWatch("name");
  const surname = BlockedUserWatch("surname");
  const email = BlockedUserWatch("email");
  const from = BlockedUserWatch("from");
  const to = BlockedUserWatch("to");

  const [debouncedBlockedName] = useDebounce(name, 700);
  const [debouncedBlockedSurname] = useDebounce(surname, 700);
  const [debouncedBlockedEmail] = useDebounce(email, 700);
  const [debouncedFrom] = useDebounce(
    from && dayjs(from).isValid() ? dayjs(from).format("DD.MM.YYYY") : "",
    2000
  );
  const [debouncedTo] = useDebounce(
    to && dayjs(to).isValid() ? dayjs(to).format("DD.MM.YYYY") : "",
    2000
  );

  useEffect(() => {
    if (isDatePickerOpen) return;
    const isValidRange =
      dayjs(debouncedFrom, "DD.MM.YYYY").isValid() ||
      dayjs(debouncedTo, "DD.MM.YYYY").isValid();

    dispatch(
      getBlockedUsersThunk({
        page: pageBlockedUsers,
        per_page: 20,
        name: debouncedBlockedName,
        surname: debouncedBlockedSurname,
        email: debouncedBlockedEmail,
        to: isValidRange ? debouncedTo : "",
        from: isValidRange ? debouncedFrom : "",
        sort: sortBlockedUsers,
      })
    );
  }, [
    debouncedBlockedName,
    debouncedBlockedSurname,
    debouncedBlockedEmail,
    sortBlockedUsers,
    value,
    pageBlockedUsers,
    debouncedFrom,
    debouncedTo,
    dispatch,
    isDatePickerOpen,
  ]);

  const onChangeBlockedUsersPage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPageBlockedUsers?.(page);
    // dispatch(getBlockedUsersThunk({ page: pageBlockedUsers, per_page: 20 }));
  };
  //single page
  const handleSingleUser = (row?: number) => {
    if (route.pathname === "/blocked-user-list") {
      navigate({ to: `/user-list/${row}` });
    }
  };

  const columnsBlockedUsers = useMemo<IColumn<User>[]>(
    () =>
      [
        {
          column: () => (
            <Box>
              <P fontWeight={"bold"}>{t("sort_by_created_at")}</P>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <MonthPicker
                    width="130px"
                    name="from"
                    control={BlockedUserControl}
                    onOpen={() => setIsDatePickerOpen(true)}
                    onClose={() => setIsDatePickerOpen(false)}
                  />
                  <MonthPicker
                    width="130px"
                    name="to"
                    control={BlockedUserControl}
                    onOpen={() => setIsDatePickerOpen(true)}
                    onClose={() => setIsDatePickerOpen(false)}
                  />
                </Box>
                {sortBlockedComponent()}
              </Box>
            </Box>
          ),
          renderComponent: (row: User) => {
            return (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <P
                  sx={{
                    color: "black",
                    fontSize: "15px",
                    fontWeight: 500,
                    paddingRight: "5px",
                  }}
                >
                  {" "}
                  {dayjs(row.created_at).format("DD.MM.YYYY HH:mm")}
                </P>
              </Box>
            );
          },
        },
        {
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
              <Box>
                <P
                  fontWeight={"bold"}
                  sx={{ textWrap: "nowrap", paddingBottom: "8px" }}
                >
                  {t("name")}
                </P>
                <FormTextInput
                  control={BlockedUserControl}
                  name="name"
                  width="130px"
                  style={{ input: { padding: "10px 14px" } }}
                />
              </Box>
            );
          },
        },
        {
          valueKey: "surname",
          filters: () => {
            return (
              <Box>
                <P
                  fontWeight={"bold"}
                  sx={{ textWrap: "nowrap", paddingBottom: "8px" }}
                >
                  {t("surname")}
                </P>
                <FormTextInput
                  control={BlockedUserControl}
                  name="surname"
                  width="130px"
                  style={{ input: { padding: "10px 14px" } }}
                />
              </Box>
            );
          },
        },
        {
          valueKey: "email",
          filters: () => {
            return (
              <Box>
                <P
                  fontWeight={"bold"}
                  sx={{ textWrap: "nowrap", paddingBottom: "8px" }}
                >
                  {t("email")}
                </P>
                <FormTextInput
                  control={BlockedUserControl}
                  name="email"
                  width="130px"
                  style={{ input: { padding: "10px 14px" } }}
                />
              </Box>
            );
          },
        },

        {
          column: "key",
          renderComponent: (row: User) => {
            return (
              <Button
                variant={"outlined"}
                text={t("see_more")}
                sx={{ width: "130px" }}
                onClick={() => {
                  handleSingleUser?.(row.id);
                }}
              />
            );
          },
        },
        user?.permissions.includes("users_unblock")
          ? {
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
          paddingTop: "8px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
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
