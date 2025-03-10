"use client";

import { Swiper as SwiperObject } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./slideshow.css";
import { FreeMode, Navigation, Thumbs ,Autoplay} from "swiper/modules";
import Image from "next/image";

interface Props {
  images: string[];
  tittle: string;
  className?: string;
}

export const ProductSlideshow = ({ images, tittle, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();
  return (
    <div className={className}>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay:2500
        }}
        thumbs={{ swiper: thumbsSwiper, }}
        modules={[FreeMode, Navigation, Thumbs,Autoplay]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              width={2000}
              height={2000}
              
              src={`/products/${image}`}
              alt={tittle}
              className="rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >

{images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              width={300}
              height={300}
              src={`/products/${image}`}
              alt={tittle}
              className="rounded-lg object-fill "
            />
          </SwiperSlide>
        ))}
       
       
      </Swiper>
    </div>
  );
};
