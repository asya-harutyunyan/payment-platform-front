import { IColumn } from "@/components/molecules/table";
import { useUserContext } from "@/context/single.user.page/user.context";
import { percent_referral_schema } from "@/schema/referrals";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getReferedUsersListThunk,
  getReferredUsersForAdminThunk,
  updatePercentThunk,
} from "@/store/reducers/allUsersSlice/thunks";
import { ReferedUsersListRequest } from "@/store/reducers/allUsersSlice/types";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import EditIcon from "@mui/icons-material/Edit";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/material";
import { useParams } from "@tanstack/react-router";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof percent_referral_schema>;

const useReferredUsers = () => {
  const { referred_users_list, lastPageRefList, loading } = useAppSelector(
    (state) => state.users
  );
  const dispatch = useAppDispatch();
  const { goToUserPage } = useUserContext();

  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedId, setSelectedId] = useState({
    user_id: "",
    referral_id: "",
  });
  // const [sort, setSort] = useState<"ASC" | "DESC">("ASC");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");
  const { control, handleSubmit, setValue, reset } = useForm<FormData>({
    resolver: zodResolver(percent_referral_schema),
    defaultValues: {
      percentage: "",
      user_id: "",
      referral_id: "",
    },
  });
  //

  const { id } = useParams({ from: "/_auth/_admin/referred-users/$id" });

  useEffect(() => {
    dispatch(getReferedUsersListThunk({ id, page: page, per_page: 20 }));
  }, []);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(getReferedUsersListThunk({ id, page: page, per_page: 20 }));
  };

  useEffect(() => {
    dispatch(
      getReferredUsersForAdminThunk({
        page,
        per_page: 20,
        id,
        sort_order: sortOrder,
      })
    );
  }, [dispatch, page, id, sortOrder]);

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

  //   return (
  //     <Box sx={{ marginTop: "7px" }}>
  //       <FormControl fullWidth>
  //         <Controller
  //           control={filterControl}
  //           name="period"
  //           render={({ field }) => (
  //             <Select
  //               {...field}
  //               labelId="demo-simple-select-label"
  //               id="demo-simple-select"
  //               value={field.value || "all"}
  //               onChange={(e) => {
  //                 const value = e.target.value === "all" ? "" : e.target.value;
  //                 field.onChange(value);
  //               }}
  //               sx={{
  //                 color: "black",
  //                 width: "100px",
  //                 borderRadius: "5px",
  //                 borderColor: "primary.main",
  //                 height: "43px",
  //                 "& .MuiOutlinedInput-notchedOutline": {
  //                   borderColor: "primary.main",
  //                 },
  //                 "&:hover .MuiOutlinedInput-notchedOutline": {
  //                   borderColor: "secondary.main",
  //                 },
  //                 "& .MuiSelect-select": {
  //                   color: "black",
  //                 },
  //                 "& .MuiSvgIcon-root": {
  //                   color: "black",
  //                 },
  //               }}
  //             >
  //               <MenuItem value={"all"}>
  //                 <em>{t("all")}</em>
  //               </MenuItem>
  //               <MenuItem value={"month"}>{t("month")}</MenuItem>
  //             </Select>
  //           )}
  //         />
  //       </FormControl>
  //     </Box>
  //   );
  // };
  const columns = useMemo<IColumn<ReferedUsersListRequest>[]>(
    () => [
      {
        column: "name",
        renderComponent: (row: ReferedUsersListRequest) => {
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
              onClick={() => goToUserPage(row.id)}
            >
              {row.name}
            </P>
          );
        },
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
        column: "referral_percentage",
        renderComponent: (row: ReferedUsersListRequest) => {
          return (
            <EditIcon
              onClick={() => {
                setOpen(true);
                setValue("referral_id", `${row.referral_user.referral_id}`);
                setValue("user_id", `${row.id}`);
                setValue(
                  "percentage",
                  String(row.referral_user.referral_percentage ?? "")
                );
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
        valueKey: "referral_user.referral_percentage",
      },
      {
        column: "amount",
        valueKey: "referral_user.amount",
        renderComponent: (row: ReferedUsersListRequest) => {
          return (
            <EditIcon
              onClick={() => {
                setUpdateModal(true);
                setSelectedId({
                  user_id: row.id,
                  referral_id: row.referral_user.referral_id,
                });
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
      },
      {
        column: "currency",
        valueKey: "referral_user.currency",
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
        dispatch(getReferedUsersListThunk({ id, page: page, per_page: 20 }));
      })
      .catch(() => {
        enqueueSnackbar(t("error"), {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      });
  };

  return {
    referred_users_list,
    lastPageRefList,
    loading,
    onSubmit,
    columns,
    // sortComponent,
    setSelectedId,
    onChangePage,
    dispatch,
    control,
    handleSubmit,
    open,
    setOpen,
    page,
    selectedId,
    updateModal,
    setUpdateModal,
    // sortByMonth,
  };
};

export default useReferredUsers;
