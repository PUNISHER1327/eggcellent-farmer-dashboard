import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import NavBar from './NavBar';
import Footer from './Footer';

const MissionPage: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const orange = '#fb923c';
  const green = '#22c55e';

  return (
    <div className={theme === 'light' ? 'light-mode min-h-screen bg-white text-gray-800' : 'dark-mode min-h-screen bg-[#0f0f0f] text-gray-200'}>
      <NavBar />

      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-5xl font-extrabold mb-10 text-center" style={{ color: orange }}>
            Our Mission in Poultry Innovation
          </h1>

          <section className="mb-16 text-center">
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              We're on a mission to revolutionize poultry farming through smart, sustainable, and inclusive technology. Our systems empower farmers to raise healthier birds, increase productivity, and reduce environmental impact.
            </p>
          </section>

          <section className="mb-24">
            <div className="grid md:grid-cols-2 gap-10">
              <div className={`p-8 rounded-2xl shadow-lg ${theme === 'light' ? 'bg-orange-50 text-gray-800' : 'bg-[#1a1a1a] text-gray-200'}`}>
                <h3 className="text-2xl font-bold mb-3" style={{ color: orange }}>Healthier Birds</h3>
                <p>
                  With real-time monitoring of ammonia, CO₂, temperature, and humidity, we ensure the coop stays safe and optimal for poultry health.
                </p>
              </div>

              <div className={`p-8 rounded-2xl shadow-lg ${theme === 'light' ? 'bg-orange-50 text-gray-800' : 'bg-[#1a1a1a] text-gray-200'}`}>
                <h3 className="text-2xl font-bold mb-3" style={{ color: orange }}>Empowered Farmers</h3>
                <p>
                  From small rural farms to larger coops, our tech simplifies farming, reduces manual labor, and improves decision-making.
                </p>
              </div>

              <div className={`p-8 rounded-2xl shadow-lg ${theme === 'light' ? 'bg-orange-50 text-gray-800' : 'bg-[#1a1a1a] text-gray-200'}`}>
                <h3 className="text-2xl font-bold mb-3" style={{ color: orange }}>Environmental Impact</h3>
                <p>
                  By reducing gas emissions and improving ventilation, we contribute to cleaner, greener, and more sustainable farming.
                </p>
              </div>

              <div className={`p-8 rounded-2xl shadow-lg ${theme === 'light' ? 'bg-orange-50 text-gray-800' : 'bg-[#1a1a1a] text-gray-200'}`}>
                <h3 className="text-2xl font-bold mb-3" style={{ color: orange }}>Accessible for All</h3>
                <p>
                  Available in English, Hindi, and Kannada, our system is designed for every farmer — no matter their background.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: green }}>Milestones & Vision</h2>
            <div className="relative border-l-4 pl-6 space-y-10" style={{ borderColor: green }}>
              <div>
                <h3 className="text-xl font-semibold" style={{ color: orange }}>2023 – Prototype Launch</h3>
                <p>
                  Introduced our first sensor kit in select farms in Karnataka. Farmers reported over 20% improvement in flock health.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold" style={{ color: orange }}>2024 – Dashboard Expansion</h3>
                <p>
                  Rolled out multilingual dashboards, automated alert systems, and mobile-friendly interfaces.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold" style={{ color: orange }}>2025 – Global Integration</h3>
                <p>
                  Set to expand our sensor network globally, integrating with AI models for predictive maintenance and health forecasting.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-24">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: green }}>Voices from the Ground</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[{
                name: 'Ravi K.', quote: 'Before this tech, I had no idea ammonia was harming my flock. Now, I can see the data and act instantly.'
              }, {
                name: 'Lakshmi N.', quote: 'The dashboard in Kannada made everything simple. My chickens are healthier and production is up!'
              }, {
                name: 'Suresh B.', quote: 'It’s like having a vet and a manager in my pocket. I sleep better at night knowing my farm is safe.'
              }].map(({ name, quote }) => (
                <div key={name} className={`p-6 rounded-xl shadow-md ${theme === 'light' ? 'bg-orange-50 text-gray-800' : 'bg-[#1a1a1a] text-gray-200'}`}>
                  <p className="italic mb-4">"{quote}"</p>
                  <h4 className="font-semibold text-sm" style={{ color: orange }}>{name}</h4>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-4xl font-extrabold mb-6" style={{ color: orange }}>Join Our Mission</h2>
            <p className="text-lg mb-8">
              Whether you're a farmer, developer, or environmentalist — there's a place for you in this movement.
            </p>
            <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition">
              Get Involved
            </button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MissionPage;
