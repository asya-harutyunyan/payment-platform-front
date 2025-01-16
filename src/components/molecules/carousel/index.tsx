import { useEffect, useState } from "react";
import { config } from "react-spring";
import Carousel from "react-spring-3d-carousel";

interface Card {
  key: number; // Define the properties of the card
  title: string;
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

const Carroussel: React.FC<CarouselProps> = (props) => {
  const table = props.cards.map((element, index) => {
    return {
      key: index,
      content: element.content,
      title: element.title, // Include the title
      onClick: () => setGoToSlide(index),
    };
  });

  const [offsetRadius, setOffsetRadius] = useState<number>(2);
  const [showArrows, setShowArrows] = useState<boolean>(false);
  const [goToSlide, setGoToSlide] = useState<number>();
  const [cards] = useState(table);

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
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
      />
    </div>
  );
};

export default Carroussel;
