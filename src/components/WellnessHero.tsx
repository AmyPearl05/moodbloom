import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Brain, Zap, Flame } from 'lucide-react';
import heroImage from '@/assets/hero-wellness.jpg';

interface WellnessHeroProps {
  onGetStarted: () => void;
}

export const WellnessHero: React.FC<WellnessHeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative overflow-hidden gradient-hero min-h-[80vh] flex items-center justify-center">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-20 h-20 bg-accent/20 rounded-full blur-xl floating-animation" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-success/20 rounded-full blur-xl floating-animation" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium">
                  <Sparkles className="h-4 w-4" />
                  AI-Powered Mental Wellness Platform
                </div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Your Journey to
                  <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    Mental Wellness
                  </span>
                  <span className="block text-white/90">
                    Starts Here 
                    <Heart className="inline-block h-8 w-8 md:h-12 md:w-12 ml-2 text-accent animate-pulse" />
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                  Track your emotions, discover patterns, and build better mental health habits with 
                  your personalized AI wellness buddy. Make self-care fun and rewarding! 🌟
                </p>
              </div>

              {/* Features highlight */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm text-white/80 font-medium">Mood Tracking</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm text-white/80 font-medium">AI Insights</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm text-white/80 font-medium">Gamified</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm text-white/80 font-medium">Personalized</p>
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-4">
                <Button
                  onClick={onGetStarted}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30 hover:border-white/50 px-8 py-6 text-lg rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl min-w-[200px]"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Your Journey
                </Button>
                <p className="text-sm text-white/70">
                  Join thousands improving their mental wellness daily
                </p>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src={heroImage}
                  alt="Mental wellness community - diverse young people supporting each other"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating UI elements */}
              <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-bounceIn">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Mood: Amazing 😁</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg animate-bounceIn" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-gray-700">7-day streak! 🔥</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};