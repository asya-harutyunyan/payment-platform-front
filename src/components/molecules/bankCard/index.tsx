import img from "@/assets/images/Card.png";
import bg from "@/assets/images/modal.png";
import { BankDetail } from "@/common/types/user";
import Button from "@/components/atoms/button";
import { BasicModal } from "@/components/atoms/modal";
import { AddCardModal } from "@/components/organisms/add_card_modal";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteBankCardThunk } from "@/store/reducers/user-info/bankDetailsSlice/thunks";
import { H3, H5 } from "@/styles/typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Typography } from "@mui/material";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";

interface IBankCard {
  cardHolder: string;
  cardNumber: string;
  bankName: string;
  phoneNumber: string;
  bgColor: string;
  textColor: string;
  currency: string;
  onClick?: (card: BankDetail) => void;
  bankDetailID?: number;
  setChangeTab?: Dispatch<SetStateAction<number>>;
}
const BankCard: FC<IBankCard> = ({
  cardHolder = "Name Surname",
  cardNumber = "1234 5678 1234 5678",
  bankName,
  textColor = "#FFFFFF",
  bankDetailID,
  currency,
  phoneNumber,
}) => {
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

  const bankNameFormatted = useMemo(() => {
    return banks.find((bank) => bank.key === bankName)?.["name"] ?? "";
  }, [bankName, banks]);

  return (
    <Box component="form">
      <Box
        sx={{
          width: { md: 300, xs: 250, sm: 250 },
          height: { md: 160, xs: 160, sm: 160 },
          borderRadius: 2,
          backgroundImage: bankDetailID ? `url(${img})` : "none",
          backgroundColor: bankDetailID ? "none" : "#989494",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          color: textColor,
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: 4,
          fontFamily: "Arial, sans-serif",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <H5>{bankNameFormatted}</H5>
          {bankDetailID ? (
            <Box sx={{ display: "flex" }}>
              <Box onClick={() => handleOpen()}>
                <EditIcon
                  sx={{
                    color: "#ffffff",
                    marginRight: "5px",
                    fontSize: "27px",
                    ":hover": {
                      color: "#dad8d8",
                    },
                  }}
                />
              </Box>
              <Box onClick={() => setOpenDeleteModal(true)}>
                <DeleteForeverIcon
                  sx={{
                    color: "#dc0e0e",
                    fontSize: "27px",
                    ":hover": {
                      color: "#a01b1b",
                    },
                  }}
                />
              </Box>
            </Box>
          ) : undefined}
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              width: 30,
              height: 18,
              borderRadius: 1,
              backgroundColor: "#D6D6D6",
            }}
          ></Box>
          <Typography fontSize={"10px"} variant="body2">
            Secure Chip
          </Typography>
        </Box>

        <Typography variant="h5" letterSpacing={2} fontSize={"16px"}>
          {cardNumber}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="caption" display="block" fontSize={"11px"}>
              Card Holder
            </Typography>
            <Typography
              variant="body1"
              fontSize={"14px"}
              color="primary.contrastText"
            >
              {cardHolder}
            </Typography>
          </Box>
          {/* <Box>
          <Typography variant="caption" display="block" fontSize={"11px"}>
            Expires
          </Typography>
          <Typography variant="body1" fontSize={"14px"}>
            {expiryDate}
          </Typography>
        </Box> */}
        </Box>
      </Box>
      <AddCardModal
        open={open}
        setOpen={setOpen}
        cardHolder={cardHolder}
        bankName={bankName}
        cardNumber={cardNumber}
        phoneNumber={phoneNumber}
        bankDetailID={bankDetailID}
        currency={currency}
        isEdit
      />
      <BasicModal
        handleClose={() => setOpenDeleteModal(false)}
        open={openDeleteModal}
        bg={bg}
        width="50%"
      >
        <H3 align="center">{t("delete_card")}</H3>
        <Box
          sx={{
            display: "flex",
            width: "30%",
            justifyContent: "space-between",
            marginTop: "30px",
          }}
        >
          <Button variant={"outlinedWhite"} text={t("no")} />
          <Button
            variant={"text"}
            text={t("yes")}
            onClick={() => onItemDelete?.(bankDetailID)}
          />
        </Box>
      </BasicModal>
    </Box>
  );
};

export default BankCard;
