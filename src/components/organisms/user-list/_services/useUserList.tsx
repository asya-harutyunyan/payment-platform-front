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
import {
  blockUserThunk,
  deleteUserAdminThunk,
} from "@/store/reducers/authSlice/thunks";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import DeleteIcon from "@mui/icons-material/Delete";
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
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const [sort, setSort] = useState<"ASC" | "DESC">("DESC");
  const [selectedTab, setSelectedTab] = useState(0);
  const [page, setPage] = useState(1);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<number>();

  const { users, blockedUsers, total, loading } = useAppSelector(
    (state) => state.users
  );
  const handleDeleteModal = (id?: number) => {
    setOpenDeleteModal(true);
    setSelectedOrder(id);
  };
  const { control, watch } = useForm<FormData>({
    resolver: zodResolver(filter_schema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      role: "",
      from: undefined,
      to: undefined,
    },
  });

  const name = watch("name");
  const surname = watch("surname");
  const email = watch("email");
  const role = watch("role");
  const from = watch("from");
  const to = watch("to");

  const [debouncedName] = useDebounce(name, 700);
  const [debouncedSurname] = useDebounce(surname, 700);
  const [debouncedEmail] = useDebounce(email, 700);
  const [debouncedRole] = useDebounce(role, 700);
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
      getUsersThunk({
        page,
        per_page: 20,
        name: debouncedName,
        surname: debouncedSurname,
        email: debouncedEmail,
        to: isValidRange ? debouncedTo : "",
        from: isValidRange ? debouncedFrom : "",
        role: debouncedRole,
        sort,
      })
    );
  }, [
    debouncedName,
    debouncedSurname,
    debouncedEmail,
    debouncedRole,
    debouncedFrom,
    debouncedTo,
    sort,
    dispatch,
    page,
  ]);

  const onChangeUsersPage = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
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
  const deleteUser = () => {
    if (selectedOrder) {
      dispatch(deleteUserAdminThunk(selectedOrder))
        .unwrap()
        .then(() => {
          enqueueSnackbar("Пользователь удален.", {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          dispatch(getUsersThunk({ page, per_page: 20 }));
          setSelectedOrder(undefined);
          setOpenDeleteModal(false);
        })
        .catch(() => {
          enqueueSnackbar(t("something_went_wrong"), {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
          setSelectedOrder(undefined);
          setOpenDeleteModal(false);
        });
    }
  };

  const sortComponent = () => (
    <Box sx={{ display: "flex" }}>
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
              <P fontWeight={"bold"} paddingRight={"5px"}>
                {t("created_at")}
              </P>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <MonthPicker
                    name="from"
                    control={control}
                    onOpen={() => setIsDatePickerOpen(true)}
                    onClose={() => setIsDatePickerOpen(false)}
                  />
                  <MonthPicker
                    name="to"
                    control={control}
                    onOpen={() => setIsDatePickerOpen(true)}
                    onClose={() => setIsDatePickerOpen(false)}
                  />
                </Box>
                <Box paddingTop={"8px"}>{sortComponent()}</Box>
              </Box>
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
              {dayjs(row.created_at).format("DD.MM.YYYY HH:mm")}
            </P>
          ),
        },
        {
          column: "name",
          filters: () => (
            <FormTextInput
              control={control}
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
              renderComponent: (row: User) => (
                <Button
                  variant={"error_background"}
                  text={t("block")}
                  sx={{ width: "130px" }}
                  onClick={() => blockUser(row.id)}
                />
              ),
            }
          : null,
        user?.permissions.includes("users_block")
          ? {
              renderComponent: (row: User) => (
                <Box
                  onClick={() => handleDeleteModal(row.id)}
                  sx={{
                    cursor: "pointer",
                    color: "#b72d2d",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.35)",
                    },
                  }}
                >
                  <DeleteIcon />
                </Box>
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
    openDeleteModal,
    setOpenDeleteModal,
    columnsUsers,
    blockUser,
    users,
    blockedUsers,
    total,
    loading,
    selectedTab,
    setSelectedTab,
    deleteUser,
  };
};

export default useUserList;
