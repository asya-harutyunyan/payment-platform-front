import img from "@/assets/images/Card.png";
import bg from "@/assets/images/modal.png";
import { BankDetail } from "@/common/types/user";
import Button from "@/components/atoms/button";
import { BasicModal } from "@/components/atoms/modal";
import { AddCardModal } from "@/components/organisms/add_card_modal";
import { H3, H5, P } from "@/styles/typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Tooltip, Typography } from "@mui/material";
import { t } from "i18next";
import { Dispatch, FC, SetStateAction, useMemo } from "react";
import { useBankCard } from "./_service/useBankCard";

interface IBankCard {
  cardHolder: string;
  cardNumber: string;
  isBlocked?: number;
  bankName: string;
  bgColor?: string;
  textColor: string;
  currency: string;
  onClick?: (card: BankDetail) => void;
  bankDetailID?: number;
  setChangeTab?: Dispatch<SetStateAction<number>>;
  isBankDetailsLengthBigger?: boolean;
}
const BankCard: FC<IBankCard> = ({
  cardHolder = "",
  cardNumber = "",
  bankName,
  textColor = "#FFFFFF",
  bankDetailID,
  isBlocked,
  currency,
}) => {
  const {
    open,
    setOpen,
    handleOpenChat,
    onItemDelete,
    openDeleteModal,
    setOpenDeleteModal,
    handleOpen,
    banks,
  } = useBankCard();

  const bankNameFormatted = useMemo(() => {
    const name =
      banks.find((bank) => bank.key === bankName)?.["name"] ?? bankName;
    return name.length > 15 ? `${name.slice(0, 15)}...` : name;
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
            <Tooltip title={bankNameFormatted}>
              <H5
                sx={{
                  color: isBlocked ? "#b3b3b3" : "#ffffff",
                  maxWidth: "100%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {bankNameFormatted}
              </H5>
            </Tooltip>
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
