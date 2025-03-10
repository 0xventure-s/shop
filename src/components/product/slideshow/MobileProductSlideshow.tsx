"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "./slideshow.css";
import { FreeMode,Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

interface Props {
  images: string[];
  tittle: string;
  className?: string;
}

export const MobileProductSlideshow = ({
  images,
  tittle,
  className,
}: Props) => {
  return (
    <div className={`${className} w-full px-0`}>
      <Swiper
      style={{
        width: "100%",
        height: "600px"
      }}
        pagination
        navigation={true}
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              width={600}
              height={500}
              src={`/products/${image}`}
              alt={tittle}
            
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
