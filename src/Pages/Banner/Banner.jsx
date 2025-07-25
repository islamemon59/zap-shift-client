import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import bannerImage1 from "../../assets/banner/banner1.png";
import bannerImage2 from "../../assets/banner/banner2.png";
import bannerImage3 from "../../assets/banner/banner3.png";

const Banner = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        interval={3000}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
        emulateTouch={true}
        preventMovementUntilSwipeScrollTolerance={true}
        swipeScrollTolerance={50}
      >
        <div style={{ maxHeight: "700px", objectFit: "cover" }}>
          <img
            style={{ maxHeight: "700px", objectFit: "cover" }}
            src={bannerImage1}
          />
        </div>
        <div style={{ maxHeight: "700px", objectFit: "cover" }}>
          <img
            style={{ maxHeight: "700px", objectFit: "cover" }}
            src={bannerImage2}
          />
        </div>
        <div style={{ maxHeight: "700px", objectFit: "cover" }}>
          <img
            style={{ maxHeight: "700px", objectFit: "cover" }}
            src={bannerImage3}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
