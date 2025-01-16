// import { ReactNode } from "@tanstack/react-router";
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";

// type ISlides = {
//   key: number;
//   content: ReactNode;
// };
// // Optional modules (pagination, navigation, etc.)
// interface ISimpleSlider {
//   slider: ISlides[];
// }
// const SimpleSlider: React.FC<ISimpleSlider> = ({ slider }) => {
//   return (
//     <div style={{ width: "80%", margin: "auto", paddingTop: "50px" }}>
//       <Swiper
//         spaceBetween={30}
//         slidesPerView={1}
//         navigation
//         pagination={{ clickable: true }}
//       >
//         {slider.map((item, index) => (
//           <SwiperSlide
//             key={index}
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: "300px",
//               borderRadius: "10px",
//             }}
//           >
//             {item.content}
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default SimpleSlider;
