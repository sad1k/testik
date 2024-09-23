import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Card } from "../Card/Card";
import { useEffect, useRef } from "react";
import BackButton from "../BackButton/BackButton";
import { Event } from "../../data/data";
import "./CardsStyles.scss";
import { useSmall } from "../../hooks/useSmall";
import { Pagination } from "swiper/modules";

interface Props {
  items: Event[];
}

export const Cards = ({ items }: Props) => {
  const swiperRef = useRef<{ swiper: ReturnType<typeof useSwiper> }>(null);
  const isSmall = useSmall();

  useEffect(() => {
    if (!isSmall) {
      swiperRef.current?.swiper.pagination.destroy();
    } else {
      swiperRef.current?.swiper.pagination.init();
    }
  }, [isSmall]);

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const pagination = {
    clickable: true,
    renderBullet: function (_: number, className: string) {
      return '<span class="' + className + '">' + "</span>";
    },
  };

  return (
    <div className="cards">
      <div className="cardsButton">
        <BackButton onClick={handlePrev} />
      </div>
      {isSmall ? (
        <Swiper
          ref={swiperRef}
          spaceBetween={10}
          modules={[Pagination]}
          slidesPerView={2}
          pagination={pagination}
        >
          {items.map((item) => (
            <SwiperSlide key={item.year + item.info}>
              <Card year={item.year} info={item.info} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Swiper
          ref={swiperRef}
          spaceBetween={50}
          pagination={pagination}
          slidesPerView={3}
          centeredSlides={true}
          modules={[Pagination]}
        >
          {items.map((item) => (
            <SwiperSlide key={item.year + item.info}>
              <Card year={item.year} info={item.info} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="cardsButton">
        <BackButton reverse onClick={handleNext} />
      </div>
    </div>
  );
};
