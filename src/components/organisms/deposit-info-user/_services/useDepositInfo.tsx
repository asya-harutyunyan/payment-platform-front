import { useAppDispatch, useAppSelector } from "@/store";
import { getSingleDepositThunk } from "@/store/reducers/user-info/depositSlice/thunks";
import { useCanGoBack, useParams, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

const useDepositInfo = () => {
  const { singleDeposit, loading } = useAppSelector((state) => state.deposit);
  const { id } = useParams({ from: "/_auth/_user/deposit-info/$id" });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const canGoBack = useCanGoBack();

  useEffect(() => {
    dispatch(getSingleDepositThunk(id));
  }, [dispatch, id]);
  return {
    singleDeposit,
    loading,
    router,
    canGoBack,
    dispatch,
  };
};

export default useDepositInfo;
