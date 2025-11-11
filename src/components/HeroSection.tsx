import { useLanguage } from '@/hooks/useLanguage';
import { TrendingUp, Shield, Zap, BarChart3, Clock, Globe } from 'lucide-react';

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

      {/* Main Content Container */}
      <div className="z-10 text-center max-w-6xl w-full animate-[fadeSlideIn_1.2s_ease_forwards] opacity-0 translate-y-6">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-primary/10 border border-primary/20 rounded-full backdrop-blur-sm">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-primary">{t('nextGenPoultryManagement')}</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6 bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent drop-shadow-2xl">
          {t('farmFriendlyDashboard')}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl font-medium mb-12 text-foreground/80 max-w-3xl mx-auto leading-relaxed">
          {t('heroTitle')}
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm border border-border rounded-full">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{t('realtimeMonitoring')}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm border border-border rounded-full">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">{t('aiPredictions')}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-background/80 backdrop-blur-sm border border-border rounded-full">
            <Globe className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">{t('multiLanguageSupport')}</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <button
            onClick={scrollToLiveData}
            className="group px-8 py-4 bg-gradient-to-r from-primary to-orange-500 font-bold text-lg rounded-xl shadow-2xl hover:shadow-primary/50 transition-all duration-300 hover:scale-105 text-white relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2 justify-center">
              <BarChart3 className="w-5 h-5" />
              {t('heroButtonOne')}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button 
            onClick={() => window.location.href = '/auth'}
            className="px-8 py-4 bg-background/80 backdrop-blur-sm border-2 border-primary text-foreground font-bold text-lg rounded-xl shadow-xl hover:bg-background hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center"
          >
            <Shield className="w-5 h-5" />
            {t('heroButtonTwo')}
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="p-6 bg-background/60 backdrop-blur-sm border border-border rounded-2xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-primary" />
              <div className="text-3xl font-bold text-primary">24/7</div>
            </div>
            <div className="text-sm text-foreground/70 font-medium">{t('continuousMonitoring')}</div>
          </div>
          <div className="p-6 bg-background/60 backdrop-blur-sm border border-border rounded-2xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <div className="text-3xl font-bold text-green-500">99%</div>
            </div>
            <div className="text-sm text-foreground/70 font-medium">{t('accuracyRate')}</div>
          </div>
          <div className="p-6 bg-background/60 backdrop-blur-sm border border-border rounded-2xl hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-blue-500" />
              <div className="text-3xl font-bold text-blue-500">3+</div>
            </div>
            <div className="text-sm text-foreground/70 font-medium">{t('languages')}</div>
          </div>
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
