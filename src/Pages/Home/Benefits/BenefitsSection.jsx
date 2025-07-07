import benefit1 from "../../../assets/benefits/benefits 1.png";
import benefit2 from "../../../assets/benefits/benefits 2.png";
import benefit3 from "../../../assets/benefits/benefits 2.png";
import BenefitCard from "./BenefitsCard/BenefitCard";

export default function BenefitsSection() {
  const benefits = [
    {
      id: 1,
      title: "Live Parcel Tracking",
      desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      img: benefit1,
    },
    {
      id: 2,
      title: "100% Safe Delivery",
      desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      img: benefit2,
    },
    {
      id: 3,
      title: "24/7 Call Center Support",
      desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      img: benefit3,
    },
  ];
  return (
    <section className="border-y-2 border-dashed border-gray-300 dark:border-gray-600">
      <div className="mx-auto px-4">
        {benefits.map((item) => (
          <BenefitCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
