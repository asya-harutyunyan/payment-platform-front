import img from "@/assets/images/Card.png";
import bg from "@/assets/images/modal.png";
import { BankDetail } from "@/common/types/user";
import Button from "@/components/atoms/button";
import { BasicModal } from "@/components/atoms/modal";
import { AddCardModal } from "@/components/organisms/add_card_modal";
import { useAuth } from "@/context/auth.context";
import { useAppDispatch, useAppSelector } from "@/store";
import { deleteBankCardThunk } from "@/store/reducers/user-info/bankDetailsSlice/thunks";
import { H3, H5, P } from "@/styles/typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Typography } from "@mui/material";
import { t } from "i18next";
import { enqueueSnackbar } from "notistack";
import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";

interface IBankCard {
  cardHolder: string;
  cardNumber: string;
  isBlocked?: number;
  bankName: string;
  // phoneNumber: string;
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
  isBlocked,
  currency,
  // phoneNumber,
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
  const handleOpenChat = () => {
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
  const bankNameFormatted = useMemo(() => {
    return banks.find((bank) => bank.key === bankName)?.["name"] ?? bankName;
  }, [bankName, banks]);

  return (
    <Box component="form">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { md: 300, xs: 250, sm: 250 },
            height: { md: 160, xs: 160, sm: 160 },
            borderRadius: 2,
            backgroundImage:
              bankDetailID && !isBlocked ? `url(${img})` : "none",
            backgroundColor: isBlocked
              ? "#686868"
              : bankDetailID
                ? "none"
                : "#587b52",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            color: isBlocked ? "#b3b3b3" : textColor,
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
            <H5 sx={{ color: isBlocked ? "#b3b3b3" : "#ffffff" }}>
              {bankNameFormatted}
            </H5>
            {bankDetailID ? (
              <Box sx={{ display: "flex" }}>
                <Box onClick={() => !isBlocked && handleOpen()}>
                  <EditIcon
                    sx={{
                      color: isBlocked ? "#b3b3b3" : "#ffffff",
                      marginRight: "5px",
                      fontSize: "27px",
                      ":hover": {
                        color: "#dad8d8",
                      },
                    }}
                  />
                </Box>
                <Box onClick={() => !isBlocked && setOpenDeleteModal(true)}>
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
            <Typography
              fontSize={"10px"}
              variant="body2"
              sx={{ color: isBlocked ? "#b3b3b3" : "#ffffff" }}
            >
              Secure Chip
            </Typography>
          </Box>

          <Typography
            variant="h5"
            letterSpacing={2}
            fontSize={"16px"}
            sx={{ color: isBlocked ? "#b3b3b3" : "#ffffff" }}
          >
            {cardNumber}
          </Typography>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="caption"
                display="block"
                fontSize={"11px"}
                sx={{ color: isBlocked ? "#b3b3b3" : "#ffffff" }}
              >
                Card Holder
              </Typography>
              <Typography
                variant="body1"
                fontSize={"14px"}
                sx={{ color: isBlocked ? "#b3b3b3" : "primary.contrastText" }}
              >
                {cardHolder}
              </Typography>
            </Box>
          </Box>
        </Box>
        {isBlocked ? (
          <P
            onClick={() => handleOpenChat()}
            sx={{
              padding: "0",
              color: "#323232",
              fontSize: "13px",
              fontWeight: "700",
              textAlign: {
                lg: "start",
                md: "start",
                xs: "center",
                sm: "center",
              },
              paddingTop: "5px",
              textDecoration: "underline",
              cursor: "pointer",
              ":hover": {
                color: "#656565",
              },
            }}
          >
            Ваша карта заморожена системой, обратитесь в саппорт.
          </P>
        ) : (
          ""
        )}
      </Box>

      <AddCardModal
        open={open}
        setOpen={setOpen}
        cardHolder={cardHolder}
        bankName={bankName}
        cardNumber={cardNumber}
        // phoneNumber={phoneNumber}
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
        <H3
          align="center"
          sx={{
            fontSize: {
              lg: "1.5rem",
              md: "1.5rem",
              xs: "1.1rem",
              sm: "1.1rem",
            },
          }}
        >
          {t("delete_card")}
        </H3>
        <Box
          sx={{
            display: "flex",
            width: { lg: "30%", md: "30%", xs: "100%", sm: "100%" },
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
