import Button from "@/components/atoms/button";
import { CopyButton } from "@/components/atoms/copy-btn";
import { CircularIndeterminate } from "@/components/atoms/loader";
import { PaginationOutlined } from "@/components/atoms/pagination";
import DynamicTable from "@/components/molecules/table";
import TaskHeader from "@/components/molecules/title";
import { H6 } from "@/styles/typography";
import { Box } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";
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
  } = usePartnerProgram();

  if (loading) {
    return (
      <Box
        sx={{
          backgroundColor: "#EAEAEA",
          p: { xs: "20px 20px", sm: "20px 40px" },
          borderRadius: "16px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularIndeterminate />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#EAEAEA",
          p: { xs: "20px 20px", sm: "20px 40px" },
          borderRadius: "16px",
        }}
      >
        <TaskHeader
          width="95%"
          title={t("partner_program")}
          subTitle={t("ref_percent")}
          renderComponent={
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {!user?.referral?.referral_code && (
                <Box sx={{ display: "flex", gap: 4, mb: 2 }}>
                  <Button
                    variant={"gradient"}
                    text={t("generate")}
                    sx={{ width: "180px" }}
                    onClick={generateReferalCode}
                  />
                </Box>
              )}

              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "#e3e3e3",
                  p: "15px 18px",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.25)",
                  overflow: "auto",
                }}
              >
                {user?.referral?.referral_code && (
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "40px",
                      }}
                    >
                      <H6
                        sx={{
                          pr: "10px",
                          color: "primary.main",
                          fontStyle: "italic",
                          lineHeight: "100%",
                        }}
                      >
                        Ваш код:
                      </H6>
                      <H6 color="#595959">{user.referral.referral_code}</H6>
                      <CopyButton text={user.referral.referral_code} />
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "40px",
                      }}
                    >
                      <H6
                        sx={{
                          pr: "10px",
                          color: "primary.main",
                          fontStyle: "italic",
                          lineHeight: "100%",
                        }}
                      >
                        Ваша ссылка:
                      </H6>
                      <H6 color="#595959">{referralUrl}</H6>
                      <CopyButton text={referralUrl} />
                    </Box>
                  </Box>
                )}

                <Box sx={{ width: "100%" }}>{PartnerProgramSummary()}</Box>
              </Box>
            </Box>
          }
        />

        {referralUser.length > 0 && (
          <Box sx={{ width: "95%", mt: "20px" }}>
            <DynamicTable columns={columns} data={referralUser} />
          </Box>
        )}
      </Box>
      {referralUser.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            mt: "24px",
          }}
        >
          <PaginationOutlined
            onPageChange={onChangePage}
            count={total}
            page={page}
          />
        </Box>
      )}
    </>
  );
};
