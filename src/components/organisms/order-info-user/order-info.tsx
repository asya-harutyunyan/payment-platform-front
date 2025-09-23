import ArrowLeftIcon from "@/assets/images/deposit_left_arrow.svg";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { useAppDispatch, useAppSelector } from "@/store";
import { getSingleOrderThunk } from "@/store/reducers/user-info/orderSlice/thunks";
import { H4 } from "@/styles/typography";
import { Box } from "@mui/material";
import { useCanGoBack, useParams, useRouter } from "@tanstack/react-router";
import { t } from "i18next";
import { FC, useEffect } from "react";
import { Paper } from "../../molecules/paper/paper";
import { fields } from "./columns";

export const OrderInfoUser: FC = () => {
  const { singleOrder, loading } = useAppSelector((state) => state.order);
  const { id } = useParams({ from: "/_auth/_user/orders/$id" });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const canGoBack = useCanGoBack();

  useEffect(() => {
    dispatch(getSingleOrderThunk(id));
  }, [dispatch, id]);

  return (
    <Box
      sx={{
        backgroundColor: "#EAEAEA",
        width: "95%",
        borderRadius: "16px",
        ml: { xs: "0", lg: "20px" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          p: "20px",
          borderBottom: "1px solid #6cadfc",
        }}
      >
        {" "}
        {canGoBack && (
          <Box
            onClick={() => router.history.back()}
            width={42}
            height={42}
            sx={{ cursor: "pointer" }}
          >
            <img src={ArrowLeftIcon} alt="Back" />
          </Box>
        )}
        <H4
          fontWeight={600}
          fontSize={{ xs: "18px", sm: "24px" }}
          p="0"
          color="#000"
        >
          {t("orders_information")}
        </H4>
      </Box>
      {!singleOrder ? (
        <CircularIndeterminate />
      ) : (
        <Box>
          <Paper
            data={singleOrder}
            fields={fields}
            title={"orders_information_single"}
            loading={loading}
          />
        </Box>
      )}
    </Box>
  );
};
