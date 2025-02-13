import { BankDetail } from "@/common/types/user";
import { formatCardNumber } from "@/common/utils";
import BankCard from "@/components/molecules/bankCard";
import { EmptyComponent } from "@/components/organisms/empty-component";
import { Box } from "@mui/material";
import { FC } from "react";

interface ICardsMobile {
  cards?: BankDetail[];
}

export const MobileCards: FC<ICardsMobile> = ({ cards }) => {
  console.log(cards);

  return (
    <Box>
      {cards?.length ? (
        <Box
          display="flex"
          flexDirection="column"
          width="100%"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {cards?.map((item, index) => (
            <Box key={index} sx={{ marginBottom: "40px" }}>
              <BankCard
                cardHolder={item?.card_holder ?? "Name Surname"}
                cardNumber={formatCardNumber(
                  item?.card_number ?? "1234 5678 1234 5678"
                )}
                bankName={item?.bank_name ?? "Bank"}
                phoneNumber={item?.phone_number ?? "+37400000000"}
                bgColor={item ? "#4CAF50" : "silver"}
                textColor="#FFFFFF"
                bankDetail={item?.id}
                currency={item?.currency}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <EmptyComponent />
      )}
    </Box>
  );
};
