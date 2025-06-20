// src/sections/ClientsSection.jsx
import amazon from "../../../assets/brands/amazon.png";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import start from "../../../assets/brands/start.png";
import start_people1 from "../../../assets/brands/start-people 1.png";
import ClientLogoSlider from "./ClientLogoSlider";
import { ImGift } from "react-icons/im";


export default function ClientsSection() {
    const logos = [amazon, amazon_vector, casio, moonstar, randstad, start, start_people1]
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-primary">
        We've helped thousands of sales teams
      </h2>
      <ClientLogoSlider logos={logos} />
    </section>
  );
}
