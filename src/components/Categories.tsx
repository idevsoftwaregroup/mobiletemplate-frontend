import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

export default function Categories() {
  const slides = [
    {
      title: "آکادمی آموزش",
      text: "آموزش با همه چالش های آن",
      icon: "school",
      width: "150px",
    },
    {
      title: "مشاوره تکنولوژی",
      text: "ورای فناوری را می تواند دید ...",
      icon: "cases",
      width: "150px",
    },
    {
      title: "پروژه های فنی",
      text: "آخرین پروژه ها ...",
      icon: "code",
      width: "150px",
    },
  ];

  const style = {
    rightAlign: 'RTL',
    leftAlign: 'LTR'
  }

  return (
    <Swiper spaceBetween={20} slidesPerView={2} loop={true}>
      {slides.map((item, index) => (
        <SwiperSlide key={index}>
          <article className="row card responsive border borderInput round gray" style={{border: '1px solid #dedede'}} dir={`${style.rightAlign}`}>
            <div className="center-align">
              <i className="large">{item.icon}</i>
            </div>
            <div className="max">
              <text className="large bold right-align transparent">{item.title}</text>
              <div className="">{ item.text }</div>
            </div>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
