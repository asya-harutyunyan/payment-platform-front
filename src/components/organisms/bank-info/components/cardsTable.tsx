import DeleteIcon from "@/assets/images/card_delete.svg";
import EditIcon from "@/assets/images/card_edit.svg";
import { BankDetail } from "@/common/types/user";
import NewButton from "@/components/atoms/btn";
import { BasicModal } from "@/components/atoms/modal";
import { useBankCard } from "@/components/molecules/bankCard/_service/useBankCard";
import { AddCardModal } from "@/components/organisms/add_card_modal";
import { H3, H6 } from "@/styles/typography";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { t } from "i18next";
import { FC, useState } from "react";

const cells = [
  { id: 1, title: "Имя и фамилия (латиницей)" },
  { id: 2, title: "Номер карты" },
  { id: 3, title: "Название банка" },
  { id: 4, title: "Статус" },
  { id: 5, title: "" },
];

interface ICardsMobile {
  cards?: BankDetail[];
}

const CardsTable: FC<ICardsMobile> = ({ cards }) => {
  const { open, setOpen, onItemDelete, openDeleteModal, setOpenDeleteModal } =
    useBankCard();

  const [selectedCard, setSelectedCard] = useState<BankDetail | null>(null);

  const {
    id: bankDetailID = 0,
    card_holder: cardHolder = "",
    bank_name: bankName = "",
    card_number: cardNumber = "",
    currency = "",
  } = selectedCard ?? {};

  const handleEdit = (card: BankDetail) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const handleDeleteAsk = (card: BankDetail) => {
    setSelectedCard(card);
    setOpenDeleteModal(true);
  };

  const canActOn = (card: BankDetail) => !card.is_blocked;

  return (
    <>
      <Box pt={5} pb={10} display="flex" justifyContent="center">
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "transparent",
            maxWidth: "900px",
            width: "100%",
            boxShadow: "none",
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    borderBottom: "1.5px solid #25c9ca",
                  },
                }}
              >
                {cells.map((cell) => (
                  <TableCell key={cell.id}>
                    <H6 color="#c5c5c5" fontSize="12px">
                      {cell.title}
                    </H6>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cards?.map((card) => (
                <TableRow
                  key={card.id}
                  sx={{
                    "& td": {
                      borderBottom: "1px solid #25c9ca",
                    },
                  }}
                >
                  <TableCell>
                    <H6 fontSize="12px">{card.card_holder}</H6>
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    <H6 fontSize="12px">{card.card_number}</H6>
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    <H6 fontSize="12px">{card.bank_name}</H6>
                  </TableCell>
                  <TableCell>
                    <H6 fontSize="12px">
                      {card.is_blocked ? (
                        <span style={{ color: "#ba1636" }}>Заблокирована</span>
                      ) : (
                        <span style={{ color: "#1ca6ab" }}>Активна</span>
                      )}
                    </H6>
                  </TableCell>

                  {card.id ? (
                    <TableCell>
                      <IconButton
                        onClick={() => canActOn(card) && handleEdit(card)}
                        disabled={!canActOn(card)}
                      >
                        <Box width="24px" height="24px">
                          <img src={EditIcon} alt="Edit icon" />
                        </Box>
                      </IconButton>
                      <IconButton
                        onClick={() => canActOn(card) && handleDeleteAsk(card)}
                        disabled={!canActOn(card)}
                      >
                        <Box width="24px" height="24px">
                          <img src={DeleteIcon} alt="Delete icon" />
                        </Box>
                      </IconButton>
                    </TableCell>
                  ) : null}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* EDIT MODAL */}
      <AddCardModal
        open={open}
        setOpen={(v) => {
          if (!v) setSelectedCard(null);
          setOpen(v);
        }}
        cardHolder={cardHolder}
        bankName={bankName}
        cardNumber={cardNumber}
        bankDetailID={bankDetailID}
        currency={currency}
        isEdit
      />

      {/* DELETE CONFIRM MODAL */}
      <BasicModal
        handleClose={() => {
          setOpenDeleteModal(false);
          setSelectedCard(null);
        }}
        open={openDeleteModal}
        width={{ xs: "80%", sm: "40%", md: "30%" }}
      >
        <H3 align="center" color="#000" fontSize="24px">
          {t("delete_card")}
        </H3>

        <Box
          sx={{
            display: "flex",
            gap: "24px",
            width: "100%",
            maxWidth: "390px",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            marginTop: "30px",
          }}
        >
          <NewButton
            sx={{
              width: "90%",
              border: "1px solid #23c6cb",
              background: "transparent",
            }}
            text={t("no")}
            onClick={() => {
              setOpenDeleteModal(false);
              setSelectedCard(null);
            }}
          />
          <NewButton
            sx={{ width: "90%" }}
            variant={"gradient"}
            text={t("yes")}
            onClick={() => {
              if (selectedCard?.id) onItemDelete?.(selectedCard.id);
              setOpenDeleteModal(false);
              setSelectedCard(null);
            }}
          />
        </Box>
      </BasicModal>
    </>
  );
};

export default CardsTable;
