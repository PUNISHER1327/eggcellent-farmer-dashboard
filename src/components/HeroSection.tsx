import { useLanguage } from '@/hooks/useLanguage';

const HeroSection = () => {
  const { t } = useLanguage();
  
  const scrollToLiveData = () => {
    const element = document.getElementById('live-data');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 text-foreground px-6 overflow-hidden"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-pulse"></div>
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_reverse]"></div>
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
        <p className="mt-2 text-sm text-orange-300 font-semibold text-center select-none"></p>
      </div>

      {/* Main Text Content with fade and slide in */}
      <div className="z-10 text-center max-w-4xl animate-[fadeSlideIn_1.2s_ease_forwards] opacity-0 translate-y-6">
        <h1 className="text-6xl md:text-7xl font-black leading-tight mb-8 bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent drop-shadow-2xl">
          {t('farmFriendlyDashboard')}
        </h1>

        <p className="text-xl md:text-2xl font-semibold mb-10 text-foreground/90 max-w-3xl mx-auto leading-relaxed">
          {t('heroTitle')}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button
            onClick={scrollToLiveData}
            className="group px-8 py-4 bg-gradient-to-r from-primary to-orange-500 font-bold text-lg rounded-xl shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 text-white relative overflow-hidden"
          >
            <span className="relative z-10">{t('heroButtonOne')}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button 
            onClick={() => window.location.href = '/auth'}
            className="px-8 py-4 bg-background/80 backdrop-blur-sm border-2 border-primary text-foreground font-bold text-lg rounded-xl shadow-xl hover:bg-background hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            {t('heroButtonTwo')}
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
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
