import { CircularIndeterminate } from "@/components/atoms/loader";
import { getStatusColor } from "@/components/utils/status-color";
import { CURRENCY } from "@/enum/currencies.enum";
import { H4 } from "@/styles/typography";
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
  }[];
  title?: string;
  loading?: boolean;
}

export const Paper = <T,>({ data, fields, title, loading }: PaperProps<T>) => {
  return (
    <Box
      sx={{
        padding: 3,
        width: { lg: "100%", md: "100%", xs: "88%", sm: "88%" },
        maxWidth: 800,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <H4
        sx={{
          fontWeight: 600,
          color: "primary.main",
          textAlign: "start",
          marginBottom: 3,
        }}
      >
        {title && t(title)}
      </H4>

      {loading ? (
        <CircularIndeterminate />
      ) : (
        fields.map((field, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            {field.label && (
              <H4
                sx={{
                  fontWeight: 600,
                  color: "primary.main",
                  textAlign: "start",
                  marginBottom: 3,
                }}
              >
                {t(field.label)}
              </H4>
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "50%" }}>
                <Typography sx={{ fontWeight: 500 }}>
                  {t(field?.column ?? "")}
                </Typography>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Typography
                  sx={{
                    color: "primary.main",
                    display: "flex",
                  }}
                >
                  <span
                    style={{
                      color: getStatusColor(
                        String(_.getPath?.(data, field.valueKey))
                      ),
                      fontWeight: 400,
                      display: "flex",
                    }}
                  >
                    {t(_.getPath?.(data, field.valueKey) ?? "-")}
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
