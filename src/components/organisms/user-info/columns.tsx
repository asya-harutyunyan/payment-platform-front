import { User } from "@/common/types";
import { H5, P } from "@/styles/typography";
import { Box, Divider } from "@mui/material";
import { t } from "i18next";

export const fields = [
  {
    column: "name",
    valueKey: "name",
  },
  {
    column: "surname",
    valueKey: "surname",
  },
  {
    column: "email",
    valueKey: "email",
  },
  {
    column: "key",
    renderOptionalComponent: (row: User) => (
      <>
        {row?.bank_details.length ? (
          <H5 color="primary.main">{t("user_cards")}</H5>
        ) : (
          ""
        )}
        {row?.bank_details.length
          ? row?.bank_details?.map(
              ({ id, bank_name, card_holder, card_number, currency }) => (
                <Box
                  key={id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "10px",
                  }}
                >
                  <P>
                    <span style={{ fontWeight: "500" }}>{t("bank_name")}</span>:{" "}
                    {bank_name}
                  </P>
                  <P>
                    <span style={{ fontWeight: "500" }}>
                      {" "}
                      {t("card_holder")}
                    </span>
                    : {card_holder}
                  </P>
                  <P>
                    <span style={{ fontWeight: "500" }}>
                      {t("card_number")}
                    </span>
                    : {card_number}
                  </P>
                  <P>
                    <span style={{ fontWeight: "500" }}>{t("currency")}</span>:{" "}
                    {currency}
                  </P>
                  <Divider sx={{ paddingTop: "10px" }} />
                </Box>
              )
            )
          : ""}
      </>
    ),
  },
];
