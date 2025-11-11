import { useLanguage } from '@/hooks/useLanguage';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  const { t } = useLanguage();
  
  const scrollToLiveData = () => {
    const element = document.getElementById('live-data');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 text-foreground px-6 overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Main Content */}
      <div className="z-10 text-center max-w-5xl mx-auto space-y-8">
        
        {/* Small badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary animate-fade-in">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          {t('nextGenPoultryManagement')}
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {t('farmFriendlyDashboard')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
          {t('heroTitle')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <button
            onClick={scrollToLiveData}
            className="group px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
          >
            {t('heroButtonOne')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => window.location.href = '/auth'}
            className="group px-8 py-4 bg-transparent border-2 border-border text-foreground font-semibold rounded-lg hover:border-primary hover:text-primary transition-all duration-300 flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            {t('heroButtonTwo')}
          </button>
        </div>

        {/* Simple stats - minimal and clean */}
        <div className="flex flex-wrap justify-center gap-8 pt-12 text-sm text-foreground/60">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            <span>24/7 {t('continuousMonitoring')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span>99% {t('accuracyRate')}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            <span>3+ {t('languages')}</span>
          </div>
        </div>
      </div>

      {/* Tailwind custom animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
