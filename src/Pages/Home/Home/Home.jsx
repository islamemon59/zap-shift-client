import React from "react";
import Banner from "../../Banner/Banner";
import ServiceSection from "../ServiceSection/ServiceSection";
import ClientsSection from "../ClientSection/ClientSection";
import BenefitsSection from "../Benefits/BenefitsSection";
import BeMerchant from "../BeMerchant/BeMerchant";
import HowItWorks from "../HowItWorks/HowItWorks";
import FeedbackData from "../CustomerFeedback/FeedbackData";
import Container from "../../../Components/Container/Container";

const Home = () => {
  return (
    <div className="space-y-28">
      {/* Banner Section */}
      {/* <section>
        <Container>
          <Banner />
        </Container>
      </section> */}
      {/* How it works section */}
      <section>
        <HowItWorks />
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
      {/* Client Slider Section */}
      <section>
        <FeedbackData />
      </section>
    </div>
  );
};

export default Home;
