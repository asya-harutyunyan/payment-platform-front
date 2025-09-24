import CopiedIcon from "@/assets/images/copied.svg";
import CopyIcon from "@/assets/images/copy_icon.svg";

import { P } from "@/styles/typography";
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
    <Box onClick={handleCopy} sx={{ padding: "0 10px", cursor: "pointer" }}>
      {copied ? (
        <Box display="flex" alignItems="center" gap="5px">
          <P sx={{ color: color ?? "#3b6394", fontSize: "14px" }}>
            Скопировано{" "}
          </P>
          <span>
            <img
              src={CopiedIcon}
              alt="Copied icon"
              style={{ width: 16, height: 16 }}
            />
          </span>
        </Box>
      ) : (
        <img
          src={CopyIcon}
          alt="Copy icon"
          style={{ width: 16, height: 16, paddingLeft: 5 }}
        />
      )}
    </Box>
  );
};
