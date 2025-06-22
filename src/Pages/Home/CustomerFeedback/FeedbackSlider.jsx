import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../../index.css";

const FeedbackSlider = ({ feedbackData }) => {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={"auto"} /* allow partial-visible sides   */
        centeredSlides /* active slide stays centered   */
        spaceBetween={24}
        autoplay={{
          delay: 3000, // 🔁 3 seconds between slides
          disableOnInteraction: false, // 👈 keeps autoplay even after manual swipe
        }} /* gap between cards             */
        loop /* endless loop feel             */
        navigation /* arrows */
        pagination={{ clickable: true }} /* bottom dots                   */
        className="pb-16" /* room for arrows + dots        */
      >
        {feedbackData.map((fb) => (
          <SwiperSlide key={fb.id} className="max-w-xs sm:max-w-sm">
            {/* Card */}
            <div className="card bg-base-200 p-6 shadow-xl h-full">
              {/* Top icon */}
              <div className="text-4xl text-primary mb-4 opacity-35">{fb.icon}</div>

              {/* Feedback text */}
              <p className="mb-6 text-primary">{fb.feedback}</p>

              {/* Dashed divider */}
              <div className="border-b-2 border-dashed border-primary w-full mb-6" />

              {/* Client row */}
              <div className="flex items-center gap-4">
                <img
                  src={fb.avatar}
                  alt={fb.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className="font-bold text-primary">{fb.name}</h4>
                  <p className="text-sm text-gray-500">{fb.role}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Optional: move default arrows to bottom & style with Tailwind */}
        <div
          slot="container-end"
          className="flex justify-center mt-10 gap-6 swiper-nav-wrapper"
        >
          {/* Swiper injects .swiper-button-prev/next; we just reposition them */}
        </div>
      </Swiper>
    </div>
  );
};

export default FeedbackSlider;
