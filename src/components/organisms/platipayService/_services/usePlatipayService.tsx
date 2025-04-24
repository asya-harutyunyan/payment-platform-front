import { FormTextInput } from "@/components/atoms/input";
import { IColumn } from "@/components/molecules/table";
import { getStatusColor } from "@/components/utils/status-color";
import { useAuth } from "@/context/auth.context";
import { search_schema } from "@/schema/users_filter";
import { useAppDispatch, useAppSelector } from "@/store";
import { Platipay } from "@/store/reducers/user-info/depositSlice/types";
import { platipayThunk } from "@/store/reducers/user-info/reportSlice/thunks";
import { P } from "@/styles/typography";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import { t } from "i18next";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { z } from "zod";

type FormData = z.infer<typeof search_schema>;

const usePlatipayService = () => {
  const { platipay, total, loading } = useAppSelector((state) => state.reports);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { user } = useAuth();
  const { control, register, watch } = useForm<FormData>({
    resolver: zodResolver(search_schema),
    defaultValues: {
      search: "",
    },
  });
  const search = watch("search");

  const [debouncedSearch] = useDebounce(search, 700);

  useEffect(() => {
    dispatch(
      platipayThunk({
        page,
        per_page: 20,
        search: debouncedSearch,
      })
    );
  }, [debouncedSearch, dispatch, page]);

  const onChangePage = (_event: React.ChangeEvent<unknown>, page: number) => {
    setPage?.(page);
    dispatch(platipayThunk({ page: page, per_page: 20 }));
  };

  const columns = useMemo<IColumn<Platipay>[]>(
    () => [
      {
        column: "amount",
        currencyManual: " ₽",
        valueKey: "amount",
      },
      {
        column: "status_order",
        renderComponent: (row: Platipay) => {
          return (
            <span
              style={{
                display: "flex",
                alignItems: "center",
                color: getStatusColor(row.status_by_client ?? "-"),
                fontWeight: 400,
                textTransform: "capitalize",
              }}
            >
              {row.status_by_client && t(row.status_by_client)}
            </span>
          );
        },
      },
      {
        column: "transaction_id",
        valueKey: "transaction_id",
      },
      {
        column: "created_at",
        valueKey: "created_at",
      },
    ],
    []
  );
  // const handleSearch = () => {
  //   <Box>
  //     <P>Фильтр по всем полям</P>
  //     <FormTextInput
  //       control={control}
  //       {...register("search")}
  //       name="search"
  //       style={{ input: { padding: "10px 14px" } }}
  //     />
  //   </Box>;
  // };

  const { handleSearch } = useMemo(() => {
    return {
      handleSearch: () => {
        return (
          <Box>
            <P>Фильтр по всем полям</P>
            <FormTextInput
              width="200px"
              control={control}
              {...register("search")}
              name="search"
              style={{ input: { padding: "10px 14px" } }}
            />
          </Box>
        );
      },
    };
  }, [control, register]);

  return {
    dispatch,
    platipay,
    total,
    loading,
    page,
    setPage,
    user,
    onChangePage,
    columns,
    handleSearch,
  };
};
export default usePlatipayService;
