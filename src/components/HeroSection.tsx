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
    <section className="relative min-h-screen flex items-center justify-center text-foreground px-6 overflow-hidden">
      {/* Elegant gradient background with geometric patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute -bottom-40 left-1/3 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" 
          style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        
        {/* Premium badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/20 rounded-full text-sm font-medium text-primary shadow-lg animate-fade-in">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold">
            {t('nextGenPoultryManagement')}
          </span>
        </div>

        {/* Main Heading with improved typography */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight mb-8">
          <span className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
            {t('farmFriendlyDashboard')}
          </span>
        </h1>

        {/* Subtitle with better spacing */}
        <p className="text-lg md:text-xl lg:text-2xl text-foreground/60 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
          {t('heroTitle')}
        </p>

        {/* CTA Buttons with premium styling */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mb-16">
          <button
            onClick={scrollToLiveData}
            className="group relative px-10 py-5 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 flex items-center gap-3 overflow-hidden"
          >
            <span className="relative z-10">{t('heroButtonOne')}</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </button>
          
          <button 
            onClick={() => window.location.href = '/auth'}
            className="group px-10 py-5 bg-background/50 backdrop-blur-sm border-2 border-border/50 text-foreground font-semibold rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 flex items-center gap-3"
          >
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span>{t('heroButtonTwo')}</span>
          </button>
        </div>

        {/* Stats grid with cards */}
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          <div className="group flex items-center gap-3 px-6 py-4 bg-background/40 backdrop-blur-sm border border-border/50 rounded-xl hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground/80">
              24/7 {t('continuousMonitoring')}
            </span>
          </div>
          <div className="group flex items-center gap-3 px-6 py-4 bg-background/40 backdrop-blur-sm border border-border/50 rounded-xl hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground/80">
              99% {t('accuracyRate')}
            </span>
          </div>
          <div className="group flex items-center gap-3 px-6 py-4 bg-background/40 backdrop-blur-sm border border-border/50 rounded-xl hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground/80">
              3+ {t('languages')}
            </span>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
