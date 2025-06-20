import React from "react";
import Banner from "../../Banner/Banner";
import ServiceSection from "../ServiceSection/ServiceSection";
import ClientsSection from "../ClientSection/ClientSection";
import BenefitsSection from "../Benefits/BenefitsSection";
import BeMerchant from "../BeMerchant/BeMerchant";

const Home = () => {
  return (
    <div className="space-y-28">
      {/* Banner Section */}
      <section>
        <Banner />
      </section>
      {/* Service Section */}
      <section>
        <ServiceSection />
      </section>
      {/* Client Logo Section */}
      <section>
        <ClientsSection />
      </section>
      {/* Service Benefits Section */}
      <section>
        <BenefitsSection />
      </section>
      {/* Be Merchant Section */}
      <section>
        <BeMerchant />
      </section>
    </div>
  );
};

export default Home;
