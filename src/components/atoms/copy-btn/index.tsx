import { P } from "@/styles/typography";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box } from "@mui/material";
import { FC, useEffect, useState } from "react";

interface ICopyButton {
  text: string;
}
export const CopyButton: FC<ICopyButton> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <Box
      onClick={handleCopy}
      sx={{ padding: "0 10px", height: "40px", marginTop: "10px" }}
    >
      <ContentCopyIcon sx={{ color: "tertiary.main" }} />
      {copied ? (
        <P sx={{ color: "tertiary.main", fontSize: "12px" }}>Copied!</P>
      ) : (
        <></>
      )}
    </Box>
  );
};
