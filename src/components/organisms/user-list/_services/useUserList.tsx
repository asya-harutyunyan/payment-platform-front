import { User } from "@/common/types";
import Button from "@/components/atoms/button";
import { FormTextInput } from "@/components/atoms/input";
import { IColumn } from "@/components/molecules/table";
import { useAuth } from "@/context/auth.context";
import { search_schema, users_filter_schema } from "@/schema/users_filter";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getBlockedUsersThunk,
  getUsersThunk,
} from "@/store/reducers/allUsersSlice/thunks";
import {
  blockUserThunk,
  unblockUserThunk,
} from "@/store/reducers/authSlice/thunks";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { z } from "zod";

type FormData = z.infer<typeof users_filter_schema>;
type BlockedUserFormData = z.infer<typeof search_schema>;

const useUserList = () => {
  const dispatch = useAppDispatch();
  const route = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  //tabs
  const [value, setValue] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  //
  const { users, blockedUsers, total, loading } = useAppSelector(
    (state) => state.users
  );
  //paginations
  const [page, setPage] = useState(1);
  const [pageBlockedUsers, setPageBlockedUsers] = useState(1);
  //users
  const { control, register, watch } = useForm<FormData>({
    resolver: zodResolver(users_filter_schema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
    },
  });
  //blocked_users
  const {
    control: BlockedUserControl,
    register: BlockedUserRegister,
    watch: BlockedUserWatch,
  } = useForm<BlockedUserFormData>({
    resolver: zodResolver(users_filter_schema),
    defaultValues: {
      search: "",
    },
  });
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  //filters
  const name = watch("name");
  const surname = watch("surname");
  const email = watch("email");
  const search = BlockedUserWatch("search");

  const [debouncedName] = useDebounce(name, 700);
  const [debouncedSurname] = useDebounce(surname, 700);
  const [debouncedEmail] = useDebounce(email, 700);
  const [debouncedsearch] = useDebounce(search, 700);

  useEffect(() => {
    if (value === 0) {
      dispatch(
        getUsersThunk({
          page,
          per_page: 20,
          name: debouncedName,
          surname: debouncedSurname,
          email: debouncedEmail,
        })
      );
    } else {
      dispatch(
        getBlockedUsersThunk({
          page: pageBlockedUsers,
          per_page: 20,
          search: debouncedsearch,
        })
      );
    }
  }, [debouncedName, debouncedSurname, debouncedEmail, debouncedsearch]);

  //tab
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    setValue(newValue);
  };
  const fetchDataByTab = (tab: number, page: number) => {
    switch (tab) {
      case 0:
        return dispatch(getUsersThunk({ page: page, per_page: 20 }));
      case 1:
        return dispatch(
          getBlockedUsersThunk({ page: pageBlockedUsers, per_page: 20 })
        );
      default:
        return;
    }
  };
  //pages
  const onChangeUsersPage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage?.(page);
    dispatch(getUsersThunk({ page: page, per_page: 20 }));
  };
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
  //columns
  const columnsUsers = useMemo<IColumn<User>[]>(
    () => [
      {
        column: "name",
        filters: () => {
          return (
            <FormTextInput
              control={control}
              {...register("name")}
              name="name"
              width="200px"
              style={{ input: { padding: "10px 14px" } }}
            />
          );
        },
        valueKey: "name",
      },
      {
        column: "surname",
        valueKey: "surname",
        filters: () => {
          return (
            <FormTextInput
              control={control}
              {...register("surname")}
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
              control={control}
              {...register("email")}
              width="200px"
              name="email"
              style={{ input: { padding: "10px 14px" } }}
            />
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
              onClick={() => handleSingleUser?.(row.id)}
            />
          );
        },
      },
      {
        column: "key",
        renderComponent: (row: User) => {
          return (
            <Button
              variant={"error"}
              text={t("block")}
              sx={{ width: "130px" }}
              onClick={() => blockUser(row.id)}
            />
          );
        },
      },
    ],
    []
  );
  const columnsBlockedUsers = useMemo<IColumn<User>[]>(
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
        column: "email",
        valueKey: "email",
      },
      {
        column: "key",
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
      {
        column: "key",
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
      },
    ],
    []
  );
  //block-unblock
  const blockUser = (id: number) => {
    dispatch(blockUserThunk(id))
      .unwrap()
      .then(() => {
        dispatch(getUsersThunk({ page: page, per_page: 20 }));
        dispatch(
          getBlockedUsersThunk({ page: pageBlockedUsers, per_page: 20 })
        );
      });
  };
  const unblockUser = (id: number) => {
    dispatch(unblockUserThunk(id))
      .unwrap()
      .then(() => {
        dispatch(getUsersThunk({ page: page, per_page: 20 }));
        dispatch(
          getBlockedUsersThunk({ page: pageBlockedUsers, per_page: 20 })
        );
      });
  };

  const { data, onChangePage, currentPage, columns, renderSearch } =
    useMemo(() => {
      if (value === 0) {
        return {
          data: users,
          onChangePage: onChangeUsersPage,
          currentPage: page,
          columns: columnsUsers,
        };
      } else {
        return {
          data: blockedUsers,
          onChangePage: onChangeBlockedUsersPage,
          currentPage: pageBlockedUsers,
          columns: columnsBlockedUsers,
          renderSearch: () => {
            return (
              <Box>
                <P>Фильтр по всем полям</P>
                <FormTextInput
                  width="200px"
                  control={BlockedUserControl}
                  {...BlockedUserRegister("search")}
                  name="search"
                  style={{ input: { padding: "10px 14px" } }}
                />
              </Box>
            );
          },
        };
      }
    }, [
      value,
      users,
      onChangeUsersPage,
      page,
      columnsUsers,
      blockedUsers,
      onChangeBlockedUsersPage,
      pageBlockedUsers,
      columnsBlockedUsers,
      control,
      register,
    ]);

  return {
    dispatch,
    navigate,
    route,
    user,
    page,
    setPage,
    onChangeUsersPage,
    onChangeBlockedUsersPage,
    handleSingleUser,
    columnsUsers,
    columnsBlockedUsers,
    pageBlockedUsers,
    fetchDataByTab,
    blockUser,
    data,
    onChangePage,
    currentPage,
    columns,
    users,
    renderSearch,
    blockedUsers,
    total,
    loading,
    value,
    setValue,
    selectedTab,
    setSelectedTab,
    handleChange,
    a11yProps,
  };
};

export default useUserList;
