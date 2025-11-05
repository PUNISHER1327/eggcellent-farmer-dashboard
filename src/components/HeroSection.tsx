import { useLanguage } from '@/hooks/useLanguage';
import { TrendingUp, Shield, Zap, CheckCircle2 } from 'lucide-react';

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

      {/* Feature badges floating */}
      <div className="absolute top-1/4 left-8 z-10 hidden lg:block animate-[float_6s_ease-in-out_infinite]">
        <div className="bg-background/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-primary/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Real-time Data</p>
              <p className="text-xs text-muted-foreground">Live Monitoring</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-1/3 right-8 z-10 hidden lg:block animate-[float_6s_ease-in-out_infinite_1s]">
        <div className="bg-background/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-accent/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Shield className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">AI Powered</p>
              <p className="text-xs text-muted-foreground">Smart Predictions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1/4 left-16 z-10 hidden lg:block animate-[float_6s_ease-in-out_infinite_2s]">
        <div className="bg-background/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-primary/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Automated</p>
              <p className="text-xs text-muted-foreground">24/7 Alerts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Text Content with fade and slide in */}
      <div className="z-10 text-center max-w-5xl animate-[fadeSlideIn_1.2s_ease_forwards] opacity-0 translate-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full mb-6 border border-primary/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-sm font-semibold text-foreground">Next-Gen Poultry Farm Management</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6 bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent drop-shadow-2xl">
          {t('farmFriendlyDashboard')}
        </h1>

        <p className="text-lg md:text-2xl font-medium mb-8 text-foreground/80 max-w-3xl mx-auto leading-relaxed">
          {t('heroTitle')}
        </p>

        {/* Key features */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {[
            'Real-time Monitoring',
            'AI Predictions',
            'Multi-language Support'
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur-sm rounded-full border border-primary/10">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={scrollToLiveData}
            className="group relative px-8 py-4 bg-gradient-to-r from-primary to-orange-500 font-bold text-lg rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 text-white overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {t('heroButtonOne')}
              <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button 
            onClick={() => window.location.href = '/auth'}
            className="px-8 py-4 bg-background/80 backdrop-blur-sm border-2 border-primary text-foreground font-bold text-lg rounded-full shadow-xl hover:bg-primary/10 hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            {t('heroButtonTwo')}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-primary/10">
          <div>
            <p className="text-3xl md:text-4xl font-black text-primary mb-1">24/7</p>
            <p className="text-sm text-muted-foreground">Live Monitoring</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-black text-primary mb-1">99%</p>
            <p className="text-sm text-muted-foreground">Accuracy Rate</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-black text-primary mb-1">3+</p>
            <p className="text-sm text-muted-foreground">Languages</p>
          </div>
        </div>
      </div>

      {/* Tailwind custom animations in style tag */}
      <style>{`
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
