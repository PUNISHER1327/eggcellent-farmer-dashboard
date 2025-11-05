import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import missionHero from '@/assets/mission-hero.jpg';
import healthyBirds from '@/assets/healthy-birds.jpg';
import empoweredFarmers from '@/assets/empowered-farmers.jpg';
import environmentalImpact from '@/assets/environmental-impact.jpg';
import accessibleForAll from '@/assets/accessible-for-all.jpg';
import { Heart, Users, Leaf, Globe, ArrowRight, Sparkles } from 'lucide-react';

const MissionPage: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observers = sectionsRef.current.map((section, index) => {
      if (!section) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in');
              (entry.target as HTMLElement).style.animationDelay = `${index * 0.1}s`;
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(section);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  const missionCards = [
    {
      title: 'Healthier Birds',
      description: 'Real-time monitoring of ammonia, CO₂, temperature, and humidity ensures the coop stays safe and optimal for poultry health.',
      image: healthyBirds,
      icon: Heart,
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: 'Empowered Farmers',
      description: 'From small rural farms to larger coops, our tech simplifies farming, reduces manual labor, and improves decision-making.',
      image: empoweredFarmers,
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Environmental Impact',
      description: 'By reducing gas emissions and improving ventilation, we contribute to cleaner, greener, and more sustainable farming.',
      image: environmentalImpact,
      icon: Leaf,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Accessible for All',
      description: 'Available in English, Hindi, and Kannada, our system is designed for every farmer — no matter their background.',
      image: accessibleForAll,
      icon: Globe,
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <div className="pt-24 pb-16 px-4 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="relative w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden mb-20 shadow-2xl group">
            <img 
              src={missionHero} 
              alt="Modern poultry farm with healthy chickens" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
              <div className="p-8 md:p-12 w-full animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-orange-400 animate-pulse" />
                  <span className="text-orange-400 font-semibold tracking-wide uppercase text-sm">Transforming Agriculture</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white">
                  Our Mission in Poultry Innovation
                </h1>
                <p className="text-lg md:text-2xl text-white/90 max-w-3xl mb-6">
                  Revolutionizing poultry farming through smart, sustainable, and inclusive technology.
                </p>
                <button className="group/btn px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 flex items-center gap-2 hover:gap-4">
                  Explore Our Journey
                  <ArrowRight className="w-5 h-5 transition-all" />
                </button>
              </div>
            </div>
          </div>

          {/* Mission Cards */}
          <section className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Our Four Pillars
              </h2>
              <p className={`text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                Building a sustainable future for poultry farming
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {missionCards.map((card, index) => {
                const IconComponent = card.icon;
                return (
                   <div 
                    key={card.title}
                    ref={(el) => { if (el) sectionsRef.current[index] = el; }}
                    className={`group relative rounded-3xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                      theme === 'light' ? 'bg-white' : 'bg-[#1a1a1a]'
                    }`}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={card.image} 
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${card.gradient} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}></div>
                      <div className="absolute top-6 right-6 p-4 bg-white/20 backdrop-blur-md rounded-2xl group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}>
                        {card.title}
                      </h3>
                      <p className={`text-base leading-relaxed ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                        {card.description}
                      </p>
                    </div>
                    
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-32" ref={(el) => { if (el) sectionsRef.current[4] = el as HTMLDivElement; }}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                Milestones & Vision
              </h2>
              <p className={`text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                Our journey towards transforming agriculture
              </p>
            </div>
            
            <div className="relative">
              <div className={`absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-emerald-500 to-green-600 ${theme === 'light' ? 'opacity-30' : 'opacity-50'}`}></div>
              
              <div className="space-y-12 pl-20">
                {[
                  {
                    year: '2023',
                    title: 'Prototype Launch',
                    description: 'Introduced our first sensor kit in select farms in Karnataka. Farmers reported over 20% improvement in flock health.',
                    color: 'from-orange-500 to-red-500'
                  },
                  {
                    year: '2024',
                    title: 'Dashboard Expansion',
                    description: 'Rolled out multilingual dashboards, automated alert systems, and mobile-friendly interfaces.',
                    color: 'from-blue-500 to-cyan-500'
                  },
                  {
                    year: '2025',
                    title: 'Global Integration',
                    description: 'Set to expand our sensor network globally, integrating with AI models for predictive maintenance and health forecasting.',
                    color: 'from-green-500 to-emerald-500'
                  }
                ].map((milestone, index) => (
                  <div 
                    key={milestone.year}
                    className={`group relative ${theme === 'light' ? 'bg-white' : 'bg-[#1a1a1a]'} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-x-2`}
                  >
                    <div className={`absolute -left-[4.5rem] top-8 w-12 h-12 rounded-full bg-gradient-to-br ${milestone.color} flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-125 transition-transform duration-300`}>
                      {index + 1}
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <span className={`text-3xl font-black bg-gradient-to-r ${milestone.color} bg-clip-text text-transparent`}>
                        {milestone.year}
                      </span>
                      <div className={`h-1 flex-grow bg-gradient-to-r ${milestone.color} opacity-30`}></div>
                    </div>
                    
                    <h3 className={`text-2xl font-bold mb-3 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                      {milestone.title}
                    </h3>
                    <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                      {milestone.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="mb-32" ref={(el) => { if (el) sectionsRef.current[5] = el as HTMLDivElement; }}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                Voices from the Ground
              </h2>
              <p className={`text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                Real stories from farmers transforming their farms
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Ravi K.',
                  location: 'Karnataka',
                  quote: 'Before this tech, I had no idea ammonia was harming my flock. Now, I can see the data and act instantly.',
                  gradient: 'from-orange-500 to-red-500'
                },
                {
                  name: 'Lakshmi N.',
                  location: 'Tamil Nadu',
                  quote: 'The dashboard in Kannada made everything simple. My chickens are healthier and production is up!',
                  gradient: 'from-blue-500 to-cyan-500'
                },
                {
                  name: 'Suresh B.',
                  location: 'Andhra Pradesh',
                  quote: "It's like having a vet and a manager in my pocket. I sleep better at night knowing my farm is safe.",
                  gradient: 'from-green-500 to-emerald-500'
                }
              ].map((testimonial) => (
                <div 
                  key={testimonial.name} 
                  className={`group relative p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
                    theme === 'light' ? 'bg-white' : 'bg-[#1a1a1a]'
                  }`}
                >
                  <div className={`absolute top-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                  
                  <div className="mb-6">
                    <div className={`text-6xl font-serif bg-gradient-to-br ${testimonial.gradient} bg-clip-text text-transparent opacity-50`}>&quot;</div>
                  </div>
                  
                  <p className={`text-lg italic mb-6 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    {testimonial.quote}
                  </p>
                  
                  <div className={`pt-4 border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
                    <h4 className={`font-bold text-lg bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`}>
                      {testimonial.name}
                    </h4>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative overflow-hidden" ref={(el) => { if (el) sectionsRef.current[6] = el as HTMLDivElement; }}>
            <div className={`relative rounded-3xl p-12 md:p-16 text-center shadow-2xl ${
              theme === 'light' 
                ? 'bg-gradient-to-br from-orange-50 via-white to-orange-50' 
                : 'bg-gradient-to-br from-[#1a1a1a] via-[#252525] to-[#1a1a1a]'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-green-500/10"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl shadow-lg animate-pulse">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 bg-clip-text text-transparent">
                  Join Our Mission
                </h2>
                
                <p className={`text-xl md:text-2xl mb-10 max-w-3xl mx-auto ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Whether you're a farmer, developer, or environmentalist — there's a place for you in this movement.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 flex items-center justify-center gap-2 hover:gap-4">
                    Get Involved
                    <ArrowRight className="w-5 h-5 transition-all" />
                  </button>
                  
                  <button className={`px-8 py-4 font-bold rounded-full border-2 transition-all duration-300 ${
                    theme === 'light'
                      ? 'border-orange-500 text-orange-600 hover:bg-orange-50'
                      : 'border-orange-500 text-orange-400 hover:bg-orange-500/10'
                  }`}>
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
    </div>
  );
};

export default MissionPage;
