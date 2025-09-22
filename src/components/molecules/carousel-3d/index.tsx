import LeftArrow from "@/assets/images/cards_left_arrow.svg";
import RightArrow from "@/assets/images/cards_right_arrow.svg";

import { Box } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { config } from "react-spring";
import Carousel from "react-spring-3d-carousel";

interface Card {
  key: number;
  content: JSX.Element;
}

interface CarouselProps {
  cards: Card[];
  offset: number;
  width: string;
  height: string;
  margin: string;
}

const Carroussel: React.FC<CarouselProps> = ({ cards, ...props }) => {
  const [offsetRadius, setOffsetRadius] = useState<number>(2);
  const [goToSlide, setGoToSlide] = useState<number>(0);

  useEffect(() => {
    setOffsetRadius(props.offset);
  }, [props.offset]);

  const processedCards = useMemo(() => {
    const baseCards = cards.length < 3 ? [...cards, ...cards] : cards;
    return baseCards.map((element, index) => ({
      key: index,
      content: element.content,
      onClick: () => setGoToSlide(index),
    }));
  }, [cards]);

  const handlePrev = () => {
    setGoToSlide((prev) => (prev === 0 ? processedCards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setGoToSlide((prev) => (prev === processedCards.length - 1 ? 0 : prev + 1));
  };

  console.log(cards, "==");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: props.margin,
        gap: "40px",
      }}
    >
      <Box
        onClick={handlePrev}
        width={42}
        height={42}
        sx={{ cursor: "pointer" }}
      >
        <img src={LeftArrow} alt="Left arrow " />
      </Box>

      <div
        style={{
          width: props.width,
          height: props.height,
        }}
      >
        <Carousel
          slides={processedCards}
          goToSlide={goToSlide}
          offsetRadius={offsetRadius}
          showNavigation={false}
          animationConfig={config.gentle}
        />
      </div>

      <Box
        onClick={handleNext}
        width={42}
        height={42}
        sx={{ cursor: "pointer" }}
      >
        <img src={RightArrow} alt="Left arrow " />
      </Box>
    </div>
  );
};

export default Carroussel;
