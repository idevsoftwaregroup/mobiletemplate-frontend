import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

export default function Categories() {
  const slides = [
    {
      title: "روانشناسی فردی",
      text: "شناخت بهتر برای یک زندگی متعادل",
      icon: "psychology",
      color: "#F8D7DA",
    },
    {
      title: "مشاوره و گفتگو",
      text: "همراهی برای تصمیم‌های زندگی",
      icon: "forum",
      color: "#E8DFF5",
    },
    {
      title: "رشد فردی",
      text: "ساختن نسخه بهتر از خود",
      icon: "trending_up",
      color: "#D8F3DC",
    },
    {
      title: "آرامش ذهن",
      text: "مدیریت استرس و افزایش تمرکز",
      icon: "self_improvement",
      color: "#D9EAF7",
    },
    {
      title: "آکادمی روانشناسی",
      text: "یادگیری مهارت‌های ذهن و زندگی",
      icon: "school",
      color: "#FFE8C8",
    },
  ];

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1.2}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
      loop={true}
      dir="rtl"
    >
      {slides.map((item, index) => (
        <SwiperSlide key={index}>
          <article
            dir="rtl"
            className="
            row
            responsive
            round
            border
            shadow
            padding
            "
            style={{
              background: item.color,
              border: "1px solid rgba(0,0,0,.08)",
            }}
          >
            <div className="center-align">
              <i
                className="
                extra
                "
              >
                {item.icon}
              </i>
            </div>

            <div className="max left-align" dir="rtl">
              <h6 className="bold">{item.title}</h6>

              <p className="small-text">{item.text}</p>
            </div>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
