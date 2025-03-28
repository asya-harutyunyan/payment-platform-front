import { H5 } from "@/styles/typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { t } from "i18next";
import { FC, ReactNode, useState } from "react";

interface IAccordionUsage {
  title: string;
  children: (onClose: () => void) => ReactNode;
}
export const AccordionUsage: FC<IAccordionUsage> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false); // Closed by default

  const handleChange = (_: unknown, expanded: boolean) => {
    setIsOpen(expanded); // Set the open/close state when toggled
  };
  return (
    <div>
      <Accordion
        expanded={isOpen}
        // onChange={() => setIsOpen(!isOpen)}
        onChange={handleChange}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <H5 color="primary.main">{t(title)}</H5>
        </AccordionSummary>
        <AccordionDetails>{children(() => setIsOpen(false))}</AccordionDetails>
      </Accordion>
    </div>
  );
};
