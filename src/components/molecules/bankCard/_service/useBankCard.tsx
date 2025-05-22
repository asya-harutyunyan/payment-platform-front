import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteBankCardThunk } from "@/store/reducers/user-info/bankDetailsSlice/thunks";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";

export const useBankCard = () => {
  const { fetchAuthUser } = useAuth();
  const { banks } = useAppSelector((state) => state.users);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const dispatch = useAppDispatch();
  const onItemDelete = (card?: number) => {
    if (card) {
      dispatch(deleteBankCardThunk(card))
        .unwrap()
        .then(() => {
          fetchAuthUser?.();
          setOpenDeleteModal(false);
        })
        .catch(() => {
          setOpenDeleteModal(false);
          enqueueSnackbar(t("delete_error_card"), {
            variant: "error",
            anchorOrigin: { vertical: "top", horizontal: "right" },
          });
        });
    }
  };
  const handleOpenChat = () => {
    // window.JivoSiteApi?.open();
    if (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      typeof window.LC_API !== "undefined" &&
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      typeof window.LC_API.open_chat_window === "function"
    ) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      window.LC_API.open_chat_window();
    } else {
      console.error("LiveChat script not loaded yet.");
    }
  };

  return {
    open,
    setOpen,
    handleOpenChat,
    setOpenDeleteModal,
    onItemDelete,
    openDeleteModal,
    handleOpen,
    banks,
  };
};
