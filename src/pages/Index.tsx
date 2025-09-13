import React, { useState } from 'react';
import { MoodSelector } from '@/components/MoodSelector';
import { WellnessDashboard } from '@/components/WellnessDashboard';
import { AIWellnessBuddy } from '@/components/AIWellnessBuddy';
import { WellnessHero } from '@/components/WellnessHero';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MessageCircle, TrendingUp, Settings, Sparkles } from 'lucide-react';

interface MoodEntry {
  date: string;
  mood: string;
  journal?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

const Index = () => {
  const [showApp, setShowApp] = useState(false);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    // Sample data for demo
    { date: '2024-01-10', mood: 'good', journal: 'Had a great day at work!', sentiment: 'positive' },
    { date: '2024-01-09', mood: 'okay', journal: 'Pretty normal day', sentiment: 'neutral' },
    { date: '2024-01-08', mood: 'amazing', journal: 'Celebrated with friends!', sentiment: 'positive' },
  ]);
  
  const [currentStreak, setCurrentStreak] = useState(7);
  const [weeklyScore, setWeeklyScore] = useState(78);
  const [activeTab, setActiveTab] = useState('check-in');

  const handleMoodSubmit = (mood: string, journal: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    // Simple sentiment analysis mock
    const sentiment = ['amazing', 'good'].includes(mood) ? 'positive' 
      : mood === 'okay' ? 'neutral' : 'negative';
    
    const newEntry: MoodEntry = {
      date: today,
      mood,
      journal,
      sentiment,
    };
    
    setMoodEntries(prev => [newEntry, ...prev.filter(entry => entry.date !== today)]);
    setCurrentStreak(prev => prev + 1);
    
    // Update weekly score based on new mood
    const newScore = sentiment === 'positive' ? Math.min(100, weeklyScore + 5) 
      : sentiment === 'negative' ? Math.max(0, weeklyScore - 3) : weeklyScore;
    setWeeklyScore(newScore);
  };

  const recentMood = moodEntries.length > 0 ? moodEntries[0].mood : undefined;

  if (!showApp) {
    return <WellnessHero onGetStarted={() => setShowApp(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-gradient flex items-center gap-2">
                <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                Wellness Hub
              </h1>
              <p className="text-muted-foreground">
                Your personal space for mental wellness and growth 🌱
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-gradient-energy">{currentStreak}</div>
                <div className="text-xs text-muted-foreground">Day Streak</div>
              </div>
              <Button
                variant="outline"
                onClick={() => setShowApp(false)}
                className="rounded-full"
              >
                <Settings className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3 bg-card/50 backdrop-blur-sm rounded-2xl p-1">
            <TabsTrigger value="check-in" className="rounded-xl flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Mood Check-in</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="rounded-xl flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="buddy" className="rounded-xl flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">AI Buddy</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="check-in" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <MoodSelector onMoodSubmit={handleMoodSubmit} />
              
              {/* Quick wellness tips */}
              <Card className="wellness-card mt-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gradient flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Today's Wellness Tip
                  </h3>
                  <div className="p-4 bg-primary/10 rounded-xl">
                    <p className="text-sm leading-relaxed">
                      💡 <strong>Mindful Moment:</strong> Take 3 deep breaths and notice 5 things you can see around you. 
                      This simple grounding technique can help center your thoughts and reduce stress in just 30 seconds!
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <WellnessDashboard 
              moodEntries={moodEntries}
              currentStreak={currentStreak}
              weeklyScore={weeklyScore}
            />
          </TabsContent>

          <TabsContent value="buddy" className="space-y-6">
            <div className="max-w-4xl mx-auto">
              <AIWellnessBuddy 
                buddyName="Luna"
                recentMood={recentMood}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
