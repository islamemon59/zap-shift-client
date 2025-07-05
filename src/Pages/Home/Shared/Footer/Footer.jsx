import React from "react";
import ProFastLogo from "../ProFastLogo/ProFastLogo";
import SocialIcons from "./SocialIcons/SocialIcons";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-neutral text-neutral-content p-10 mt-40">
      <aside>
        <ProFastLogo></ProFastLogo>
        <p className="font-bold">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to <br /> business shipments — we
          deliver on time, every time.
        </p>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav>
        <SocialIcons />
      </nav>
    </footer>
  );
};

export default Footer;
