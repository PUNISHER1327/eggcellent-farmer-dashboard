const HeroSection = () => {
  const scrollToLiveData = () => {
    const element = document.getElementById('live-data');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center text-white px-6 overflow-hidden"
      
    >
      {/* Overlay with slow shimmer animation */}
      
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-orange-400 opacity-30"
            style={{
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatUp ${10 + Math.random() * 10}s linear infinite`,
              animationDelay: `${-Math.random() * 20}s`,
            }}
          />
        ))}
      </div>

      {/* Chick Illustration with bounce + blinking eye */}
      <div className="absolute bottom-6 left-10 z-10 hidden md:block">
        <div className="w-24 h-24 bg-yellow-300 rounded-full relative shadow-lg animate-[bounce_2.5s_infinite]">
          {/* Eye */}
          <div className="w-3 h-3 bg-black rounded-full absolute top-6 left-7 animate-[blink_4s_infinite]"></div>
          {/* Beak */}
          <div className="w-4 h-4 bg-orange-500 rotate-45 absolute top-12 left-16"></div>
          {/* Wing */}
          <div className="w-5 h-2 bg-white absolute top-18 left-5 rounded-full"></div>
        </div>
        <p className="mt-2 text-sm text-orange-300 font-semibold text-center select-none">ChickBot™</p>
      </div>

      {/* Main Text Content with fade and slide in */}
      <div className="z-10 text-center max-w-2xl animate-[fadeSlideIn_1.2s_ease_forwards] opacity-0 translate-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg text-shadow-glow">
          Powering the Smartest<br />
          <span className="text-orange-400 relative underline-animated">Poultry Farms</span> of Tomorrow
        </h1>

        <p className="text-lg md:text-xl text-white/80 font-medium mb-8">
          Automate insights. Track your flock. Boost productivity with intelligent tools built for poultry excellence.
        </p>

        <div className="flex justify-center gap-6">
          <button
            onClick={scrollToLiveData}
            className="px-6 py-3 bg-orange-500 font-bold rounded-lg shadow-xl hover:bg-orange-600 transition hover:scale-105 animate-pulse-onhover"
          >
            Explore Live Data
          </button>
          <button className="px-6 py-3 bg-white/80 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-white transition hover:scale-105">
            Visit Dashboard
          </button>
        </div>
      </div>

      {/* Tailwind custom animations in style tag */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes blink {
          0%, 20%, 40%, 60%, 80%, 100% { opacity: 1; }
          10%, 30%, 50%, 70%, 90% { opacity: 0; }
        }
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes fadeSlideIn {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { opacity: 1; }
          100% { transform: translateY(-20px) translateX(15px); opacity: 0; }
        }

        .text-shadow-glow {
          text-shadow:
            0 0 6px rgba(251, 191, 36, 0.9),
            0 0 12px rgba(251, 191, 36, 0.7);
        }
        .underline-animated {
          position: relative;
          cursor: pointer;
        }
        .underline-animated::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -5px;
          width: 100%;
          height: 3px;
          background: #fb923c;
          transform-origin: left center;
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        .underline-animated:hover::after {
          transform: scaleX(1);
        }

        .animate-pulse-onhover:hover {
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 10px 2px rgba(251, 191, 36, 0.8);
          }
          50% {
            box-shadow: 0 0 15px 5px rgba(251, 191, 36, 1);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
