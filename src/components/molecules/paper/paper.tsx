import { CircularIndeterminate } from "@/components/atoms/loader";
import { getStatusColor } from "@/components/utils/status-color";
import { CURRENCY } from "@/enum/currencies.enum";
import { P } from "@/styles/typography";
import { Box, Typography } from "@mui/material";
import { t } from "i18next";
import { ReactNode } from "react";
// @ts-expect-error no types for this lib
import _ from "underscore-contrib";

interface PaperProps<T> {
  data: T;
  fields: {
    currency?: string;
    column?: string;
    label?: string;
    valueKey?: string;
    field?: string;
    renderComponent?: (row: T) => ReactNode;
    renderOptionalComponent?: (row: T) => ReactNode;
  }[];
  title?: string;
  loading?: boolean;
  firstSectionWidth?: string;
  secondSectionWidth?: string;
}

export const Paper = <T,>({ data, fields, title, loading }: PaperProps<T>) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: { xs: "16px", lg: "24px 0 24px 86px" },
      }}
    >
      <P
        sx={{
          fontWeight: 600,
          color: "#000",
          textAlign: "start",
        }}
      >
        {title && t(title)}
      </P>

      {loading ? (
        <CircularIndeterminate />
      ) : (
        fields.map((field, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {field.label && (
              <P
                sx={{
                  fontWeight: 600,
                  color: "#000",
                  textAlign: "start",
                  mb: "16px",
                }}
              >
                {t(field.label)}
              </P>
            )}
            <Box
              sx={{
                width: { xs: "90%", lg: "60%" },
                backgroundColor: "#e3e3e3",
                borderBottom: "1px solid #C4C4C4",
                borderRadius: "35px",
                p: "10px 18px",
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: 500, fontStyle: "italic" }}>
                  {t(field?.column ?? "")}
                </Typography>
                <Typography sx={{ fontWeight: 500 }}>
                  {" "}
                  {field.renderOptionalComponent &&
                    field.renderOptionalComponent(data)}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: "primary.main",
                    display: "flex",
                  }}
                >
                  <span
                    style={{
                      color: field.valueKey
                        ? getStatusColor(
                            String(_.getPath?.(data, field.valueKey))
                          )
                        : "primary.main",
                      fontWeight: 400,
                      display: "flex",
                    }}
                  >
                    {field.valueKey &&
                      t(_.getPath?.(data, field.valueKey) ?? "-")}
                  </span>
                  {field.renderComponent && field.renderComponent(data)}

                  {field.currency
                    ? ` ${
                        CURRENCY[
                          _.getPath?.(
                            data,
                            field.currency
                          ) as keyof typeof CURRENCY
                        ] ?? "-"
                      }`
                    : ""}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};
