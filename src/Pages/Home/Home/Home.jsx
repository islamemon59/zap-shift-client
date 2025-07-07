import Banner from "../../Banner/Banner";
import ServiceSection from "../ServiceSection/ServiceSection";
import ClientsSection from "../ClientSection/ClientSection";
import BenefitsSection from "../Benefits/BenefitsSection";
import BeMerchant from "../BeMerchant/BeMerchant";
import HowItWorks from "../HowItWorks/HowItWorks";
import FeedbackData from "../CustomerFeedback/FeedbackData";

const Home = () => {
  return (
    <div className="space-y-20">
      <section>
        <Banner />
      </section>
      {/* How it works section */}
      <div className="max-w-7xl mx-auto space-y-28">
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
    </div>
  );
};

export default Home;
