import { P } from "@/styles/typography";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box } from "@mui/material";
import { FC, useState } from "react";

interface ICopyButton {
  text: string;
  color?: string;
}
export const CopyButton: FC<ICopyButton> = ({ text, color }) => {
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
      sx={{ padding: "0 10px", marginTop: "10px", cursor: "pointer" }}
    >
      <ContentCopyIcon sx={{ color: color ?? "tertiary.main" }} />
      {copied ? (
        <P sx={{ color: color ?? "tertiary.main", fontSize: "12px" }}>
          Скопирован!
        </P>
      ) : (
        <></>
      )}
    </Box>
  );
};
