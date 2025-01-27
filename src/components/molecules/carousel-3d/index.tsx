import { useEffect, useMemo, useState } from "react";
import { config } from "react-spring";
import Carousel from "react-spring-3d-carousel";

interface Card {
  key: number; // Define the properties of the card
  content: JSX.Element;
}

interface CarouselProps {
  cards: Card[];
  offset: number;
  showArrows: boolean;
  width: string;
  height: string;
  margin: string;
}

const Carroussel: React.FC<CarouselProps> = ({ cards, ...props }) => {
  const table = useMemo(() => {
    return (
      cards.map((element, index) => {
        return {
          key: index,
          content: element.content,
          onClick: () => setGoToSlide(index),
        };
      }) ?? []
    );
  }, [cards]);

  const [offsetRadius, setOffsetRadius] = useState<number>(2);
  const [showArrows, setShowArrows] = useState<boolean>(false);
  const [goToSlide, setGoToSlide] = useState<number>();

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
  }, [props.offset, props.showArrows]);

  return (
    <div
      style={{
        width: props.width,
        height: props.height,
        margin: props.margin,
      }}
    >
      <Carousel
        slides={table}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
      />
    </div>
  );
};

export default Carroussel;
