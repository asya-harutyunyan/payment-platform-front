import Button from "@/components/atoms/button";
import { CopyButton } from "@/components/atoms/copy-btn";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";

import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";

import { P } from "@/styles/typography";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
import { EmptyComponent } from "../empty-component";
import usePartnerProgram from "./_serivces/usePartnerProgram";

export const PartnerProgramComponent: FC = () => {
  const {
    referralUser,
    total,
    loading,
    user,
    onChangePage,
    columns,
    generateReferalCode,
    PartnerProgramSummary,
    page,
    referralUrl,
    onCheckoutButtonClick,
  } = usePartnerProgram();

  return (
    <Box sx={{ width: "100%" }}>
      <TaskHeader
        title={t("partner_program")}
        subTitle={t("ref_percent")}
        renderComponent={
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", gap: 4, marginBottom: 2 }}>
              {!user?.referral?.referral_code && (
                <Button
                  variant={"gradient"}
                  text={t("generate")}
                  sx={{ width: "180px" }}
                  onClick={generateReferalCode}
                />
              )}

              <Button
                variant={"gradient"}
                text={t("checkout_money")}
                sx={{ width: "180px" }}
                onClick={onCheckoutButtonClick}
              />
            </Box>

            {user?.referral?.referral_code && (
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "40px",
                    padding: "10px 0",
                  }}
                >
                  <CopyButton text={user.referral.referral_code} />
                  <P color="primary.main">{user.referral.referral_code}</P>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "40px",
                    padding: "10px 0",
                  }}
                >
                  <CopyButton text={referralUrl} />
                  <P color="primary.main">{referralUrl}</P>
                </Box>
              </Box>
            )}
            <Box
              sx={{
                width: "100%",
              }}
            >
              {PartnerProgramSummary()}
            </Box>
          </Box>
        }
      />

      {loading ? (
        <CircularIndeterminate />
      ) : referralUser.length > 0 ? (
        <Box
          sx={{
            width: { lg: "100%", md: "100%", xs: "350px", sm: "350px" },
            height: "100vh",
            marginTop: "20px",
          }}
        >
          <DynamicTable columns={columns} data={referralUser} />
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <PaginationOutlined
              onPageChange={onChangePage}
              count={total}
              page={page}
            />
          </Box>
        </Box>
      ) : (
        <EmptyComponent text={"no_data"} />
      )}
    </Box>
  );
};
