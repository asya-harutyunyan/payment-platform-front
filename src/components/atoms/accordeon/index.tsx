import { H5 } from "@/styles/typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { t } from "i18next";
import { FC, ReactNode } from "react";

interface IAccordionUsage {
  title: string;
  children: ReactNode;
}
export const AccordionUsage: FC<IAccordionUsage> = ({ title, children }) => {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <H5 color="primary.main">{t(title)}</H5>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
};
