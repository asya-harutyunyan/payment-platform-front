import Button from "@/components/atoms/button";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import { IColumn } from "@/components/molecules/table";
import DynamicTable from "@/components/molecules/table-new";
import TaskHeader from "@/components/molecules/title";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import { getWalletsThunk } from "@/store/reducers/admin/walletSlice/thunks";
import { Wallet as WalletType } from "@/store/reducers/user-info/depositSlice/types";
import { Box, Tab, Tabs } from "@mui/material";
import { t } from "i18next";
import { FC, useEffect, useMemo, useState } from "react";
import { EmptyComponent } from "../empty-component";

export const Reports: FC = () => {
  const { wallet, total, loading } = useAppSelector((state) => state.wallet);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { user } = useAuth();

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // function CustomTabPanel(props: TabPanelProps) {
  //   const { children, value, index, ...other } = props;

  //   return (
  //     <div
  //       role="tabpanel"
  //       hidden={value !== index}
  //       id={`simple-tabpanel-${index}`}
  //       aria-labelledby={`simple-tab-${index}`}
  //       {...other}
  //     >
  //       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  //     </div>
  //   );
  // }

  useEffect(() => {
    if (user?.role === "admin") {
      dispatch(getWalletsThunk({ page: page, per_page: 20 }));
    } else {
      dispatch(getWalletsThunk({ page: page, per_page: 5 }));
    }
  }, [dispatch, page, user?.role]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    if (user?.role === "admin") {
      dispatch(getWalletsThunk({ page: page, per_page: 20 }));
    } else {
      dispatch(getWalletsThunk({ page: page, per_page: 5 }));
    }
  };

  const columns = useMemo<IColumn<WalletType>[]>(
    () => [
      {
        column: "network",
        valueKey: "network",
      },
      {
        column: "currency",
        valueKey: "currency",
      },
      {
        column: "address",
        valueKey: "address",
      },
      {
        column: "key",
        renderComponent: () => {
          return (
            <Button
              variant={"error"}
              text={"Удалить"}
              sx={{ width: "130px" }}
            />
          );
        },
      },
    ],
    []
  );
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader title={t("reports_title")} />
      {loading ? (
        <CircularIndeterminate />
      ) : wallet.length > 0 ? (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
            marginTop: "20px",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              color: "black",
              backgroundColor: "#f6f6f6",
              width: "100%",
            }}
          >
            <Tab
              label="Отчёт по обработанным суммам"
              {...a11yProps(0)}
              sx={{ color: "black", fontSize: "0.8rem" }}
            />
            <Tab
              label="Отчёт по пользователям"
              {...a11yProps(1)}
              sx={{ color: "black", fontSize: "0.8rem" }}
            />
            <Tab
              label="Отчет о новых регистрациях"
              {...a11yProps(2)}
              sx={{ color: "black", fontSize: "0.8rem" }}
            />
            <Tab
              label="Взаимодействие с платформой "
              {...a11yProps(2)}
              sx={{ color: "black", fontSize: "0.8rem" }}
            />
          </Tabs>
          <DynamicTable columns={columns} data={wallet} />
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <PaginationOutlined
              onPageChange={onChangePage}
              count={total}
              page={page}
            />
          </Box>
        </Box>
      ) : (
        <EmptyComponent text={"no_data"} />
      )}
    </Box>
  );
};
