import React from 'react';
import Banner from '../../Banner/Banner';
import ServiceSection from '../ServiceSection/ServiceSection';
import ClientsSection from '../ClientSection/ClientSection';
import BenefitsSection from '../Benefits/BenefitsSection';

const Home = () => {
    return (
        <div>
            {/* Banner Section */}
            <section className='mt-6'>
                <Banner/>
            </section>

            {/* Service Section */}
            <section>
                <ServiceSection/>
            </section>

            <section>
                <ClientsSection></ClientsSection>
            </section>

            <section>
                <BenefitsSection></BenefitsSection>
            </section>
        </div>
    );
};

export default Home;