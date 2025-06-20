// src/components/ClientLogoSlider.jsx
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ClientLogoSlider({ logos }) {
  const settings = {
    infinite: true,
    speed: 6000, // speed of slide transition
    slidesToShow: 6, // number visible on desktop
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0, // continuous scrolling effect
    cssEase: "linear", // smooth continuous scroll
    pauseOnHover: true,
    rtl: false, // left to right scroll
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {logos.map((logo, idx) => (
        <div key={idx} className="px-4">
          <img
            src={logo}
            alt={`Client logo ${idx + 1}`}
            className="h-20 object-contain mx-96"
            loading="lazy"
          />
        </div>
      ))}
    </Slider>
  );
}
