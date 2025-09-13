import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, TrendingUp, Award, Flame, Heart, Brain } from 'lucide-react';

interface MoodEntry {
  date: string;
  mood: string;
  journal?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

interface WellnessDashboardProps {
  moodEntries: MoodEntry[];
  currentStreak: number;
  weeklyScore: number;
}

export const WellnessDashboard: React.FC<WellnessDashboardProps> = ({
  moodEntries,
  currentStreak,
  weeklyScore,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Generate mood calendar for the current week
  const generateWeekCalendar = () => {
    const today = new Date();
    const week = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      const entry = moodEntries.find(e => e.date === dateString);
      
      week.push({
        date: dateString,
        day: date.getDate(),
        dayName: date.toLocaleDateString('en', { weekday: 'short' }),
        mood: entry?.mood,
        hasEntry: !!entry,
      });
    }
    
    return week;
  };

  const getMoodEmoji = (mood: string) => {
    const moodMap: Record<string, string> = {
      amazing: '😁', excited: '🤩', happy: '😊', content: '😌', loved: '🥰',
      okay: '😐', meh: '😑', thoughtful: '🤔', tired: '😴',
      sad: '😔', worried: '😟', stressed: '😣', angry: '😡', anxious: '😰', crying: '😭',
      depressed: '😞', heartbroken: '💔', crisis: '🆘',
      // Legacy support
      good: '😊', down: '😔'
    };
    return moodMap[mood] || '😐';
  };

  const getMoodColor = (mood: string) => {
    // Positive emotions
    if (['amazing', 'excited', 'happy', 'content', 'loved', 'good'].includes(mood)) {
      return 'bg-success/20 border-success/30';
    }
    // Neutral emotions
    if (['okay', 'meh', 'thoughtful', 'tired'].includes(mood)) {
      return 'bg-secondary/20 border-secondary/30';
    }
    // Difficult emotions
    if (['sad', 'worried', 'stressed', 'angry', 'anxious', 'crying', 'down'].includes(mood)) {
      return 'bg-crisis/20 border-crisis/30';
    }
    // Crisis emotions
    if (['depressed', 'heartbroken', 'crisis'].includes(mood)) {
      return 'bg-destructive/20 border-destructive/30';
    }
    return 'bg-muted/20 border-muted/30';
  };

  const weekCalendar = generateWeekCalendar();
  const recentMoods = moodEntries.slice(-7);
  const positiveCount = recentMoods.filter(m => 
    ['amazing', 'excited', 'happy', 'content', 'loved', 'good'].includes(m.mood)
  ).length;
  const neutralCount = recentMoods.filter(m => 
    ['okay', 'meh', 'thoughtful', 'tired'].includes(m.mood)
  ).length;
  const difficultCount = recentMoods.filter(m => 
    ['sad', 'worried', 'stressed', 'angry', 'anxious', 'crying', 'down'].includes(m.mood)
  ).length;
  const crisisCount = recentMoods.filter(m => 
    ['depressed', 'heartbroken', 'crisis'].includes(m.mood)
  ).length;
  
  const moodTrend = positiveCount >= 4 ? 'positive' 
    : crisisCount > 0 ? 'crisis'
    : difficultCount >= 4 ? 'difficult' 
    : 'neutral';

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="wellness-card">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-success/20">
              <Flame className="h-6 w-6 text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gradient">{currentStreak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
          </div>
        </Card>

        <Card className="wellness-card">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/20">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gradient-energy">{weeklyScore}%</div>
              <div className="text-sm text-muted-foreground">Wellness Score</div>
            </div>
          </div>
        </Card>

        <Card className="wellness-card">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-accent/20">
              <Award className="h-6 w-6 text-accent" />
            </div>
            <div>
              <Badge className="streak-badge">
                Mood Detective 🕵️
              </Badge>
              <div className="text-sm text-muted-foreground mt-1">Latest Badge</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Mood Calendar */}
      <Card className="wellness-card">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">This Week's Mood Journey</h3>
          </div>
          
            <div className="flex justify-between gap-1 sm:gap-2">
            {weekCalendar.map((day, index) => (
              <button
                key={day.date}
                onClick={() => setSelectedDate(day.date)}
                className={`flex-1 min-w-0 p-2 sm:p-3 rounded-xl border-2 transition-all hover:scale-105 ${
                  selectedDate === day.date
                    ? 'border-primary shadow-lg'
                    : 'border-transparent hover:border-primary/30'
                } ${day.hasEntry ? getMoodColor(day.mood!) : 'bg-muted/20'}`}
              >
                <div className="text-center space-y-1">
                  <div className="text-xs font-medium text-muted-foreground truncate">
                    {day.dayName}
                  </div>
                  <div className="text-sm sm:text-lg font-bold">{day.day}</div>
                  {day.hasEntry && (
                    <div className="text-lg sm:text-2xl animate-bounceIn">
                      {getMoodEmoji(day.mood!)}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Weekly Progress */}
      <Card className="wellness-card">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Weekly Wellness Progress</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Mood Check-ins</span>
              <span className="font-medium">{recentMoods.length}/7 days</span>
            </div>
            <Progress value={(recentMoods.length / 7) * 100} className="h-3" />
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Positive Vibes</span>
              <span className="font-medium">{positiveCount}/{recentMoods.length} entries</span>
            </div>
            <Progress 
              value={recentMoods.length > 0 ? (positiveCount / recentMoods.length) * 100 : 0} 
              className="h-3"
            />
          </div>

          {moodTrend === 'positive' && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-success/10">
              <Heart className="h-5 w-5 text-success" />
              <span className="text-sm font-medium text-success">
                You're on a positive streak! Keep it up! 🌟
              </span>
            </div>
          )}
          
          {moodTrend === 'crisis' && (
            <div className="flex items-center gap-2 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
              <Heart className="h-5 w-5 text-destructive" />
              <div className="text-sm">
                <p className="font-medium text-destructive mb-1">
                  💙 Your wellbeing matters. Support is available:
                </p>
                <p className="text-xs text-muted-foreground">
                  Crisis Text Line: 741741 • Lifeline: 988
                </p>
              </div>
            </div>
          )}
          
          {moodTrend === 'difficult' && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-crisis/10">
              <Brain className="h-5 w-5 text-crisis" />
              <span className="text-sm font-medium text-crisis">
                Tough times don't last, but tough people do. You're stronger than you know. 💪
              </span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};